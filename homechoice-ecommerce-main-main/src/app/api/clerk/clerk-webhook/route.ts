import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import axiosInstanceSignup from "@/api/backend/axiosInstanceSignup"; // Signup without tokens
import axiosInstance, { obtainToken, attachCsrfToken, clearTokens } from "@/api/backend/axiosInstance"; // Token-based API

const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!WEBHOOK_SECRET) {
  throw new Error("❌ ERROR: WEBHOOK_SECRET is missing. Set it in Vercel environment variables.");
}

if (!CLERK_SECRET_KEY) {
  throw new Error("❌ ERROR: CLERK_SECRET_KEY is missing. Set it in Vercel environment variables.");
}

const wh = new Webhook(WEBHOOK_SECRET);

export async function POST(req: NextRequest) {
  try {
    console.log("✅ Received Clerk Webhook");

    const bodyText = await req.text();
    const headerPayload = headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("❌ ERROR: Missing Svix headers.");
      return NextResponse.json({ error: "Unauthorized: Missing Svix headers" }, { status: 400 });
    }

    let verifiedEvent;
    try {
      verifiedEvent = wh.verify(bodyText, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err) {
      console.error("❌ ERROR: Svix webhook verification failed:", err);
      return NextResponse.json({ error: "Unauthorized: Invalid webhook signature" }, { status: 401 });
    }

    console.log("✅ Clerk Webhook Verified");

    const body = JSON.parse(bodyText);
    console.log("📨 Received Event:", body.type);

    const eventType = body.type;
    const eventData = body.data;

    switch (eventType) {
      case "user.created":
        await handleUserCreated(eventData); // No token required
        break;
      case "user.updated":
        await handleUserUpdated(eventData); // Requires token
        break;
      case "user.deleted":
        await handleUserDeleted(eventData); // Requires token
        break;
      case "session.created":
        await handleUserLoggedIn(eventData); // Requires token
        break;
      case "session.ended":
      case "session.removed":
        await handleUserLoggedOut(eventData); // Requires token
        break;
      default:
        console.warn("⚠️ Unhandled Clerk event:", eventType);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("❌ ERROR: Exception in webhook processing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🔍 Extract user email, fetch from Clerk API if missing
const extractUserEmail = async (userData: any): Promise<string | null> => {
  if (userData.email_addresses?.length > 0) {
    return userData.email_addresses[0].email_address;
  }

  if (userData.id) {
    console.log("🔍 Fetching user email from Clerk API for user_id:", userData.id);

    try {
      const response = await axiosInstance.get(
        `https://api.clerk.com/v1/users/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          },
        }
      );

      console.log("✅ Clerk API Response:", response.data);

      const user = response.data;
      return user?.email_addresses?.[0]?.email_address || null;
    } catch (error: any) {
      console.error("❌ ERROR fetching user from Clerk API:", error.response?.data || error.message);
      return null;
    }
  }

  console.error("❌ ERROR: No email or user_id found.");
  return null;
};

// ✅ Handle user creation (No CSRF, No Token) - DO NOT CHANGE
const handleUserCreated = async (userData: any) => {
  try {
    console.log("🔍 Extracting user data from Clerk webhook...");

    const newUser = {
      email: userData.email_addresses?.[0]?.email_address || "",
      username: userData.first_name || "Unknown",
      password: userData.password || null, // Will be `null` for OAuth users
      clerkId: userData.id || null,
    };

    console.log("🆕 Creating user in backend:", newUser);

    // Send user data to Django backend for signup
    const response = await axiosInstanceSignup.post("userapi/api/signup", newUser);

    console.log("✅ Signup successful:", response.data);
  } catch (error: any) {
    console.error("❌ ERROR sending new user data to backend:", error.response?.data || error.message);
  }
};

const handleUserUpdated = async (userData: any) => {
  try {
    const updatedUser = {
      email: userData.email_addresses[0]?.email_address || "",
      username: userData.first_name || "Unknown",
    };

    console.log("✏️ Updating user in backend:", updatedUser);

    await axiosInstance.post("userapi/api/update-user", updatedUser);
  } catch (error: any) {
    console.error("❌ ERROR updating user in backend:", error.response?.data || error.message);
  }
};

// ✅ Handle user deletion (Token Required)
const handleUserDeleted = async (userData: any) => {
  try {
    console.log("📨 Received user.deleted event:", JSON.stringify(userData, null, 2)); // Debugging log

    // Ensure userData is structured correctly
    if (!userData || typeof userData !== "object") {
      console.error("❌ ERROR: Invalid userData received.");
      return;
    }

    // Extract Clerk ID (directly from the payload)
    const clerkId = userData?.id;
    if (!clerkId) {
      console.error("❌ ERROR: Missing Clerk ID in user.deleted event. Full event:", JSON.stringify(userData, null, 2));
      return;
    }

    console.log("🔍 Clerk ID received:", clerkId);

    // ✅ Attach CSRF token before making the request
    try {
      await attachCsrfToken(clerkId);
      console.log("✅ CSRF Token attached.");
    } catch (error: any) {
      console.error("❌ ERROR fetching CSRF Token:", error.response?.data || error.message);
      return;
    }

    // ✅ Perform the delete request with Clerk ID
    console.log("❌ Deleting user in backend with Clerk ID:", clerkId);
    await axiosInstance.delete("userapi/api/delete_user", { params: { clerk_id: clerkId } });

    console.log("✅ User successfully deleted.");
  } catch (error: any) {
    console.error("❌ ERROR deleting user:", error.response?.data || error.message);
  }
};

// ✅ Handle user login (Token Required) - FIXED
const handleUserLoggedIn = async (sessionData: any) => {
  try {
    console.log("✅ Processing session.created event...");

    const clerkId = sessionData.user_id; // ✅ Extract the correct Clerk ID
    if (!clerkId) {
      console.error("❌ ERROR: Missing Clerk ID in session event.");
      return;
    }

    console.log("🔍 Fetching user email from Clerk API for Clerk ID:", clerkId);

    let email = await extractUserEmail({ id: clerkId }); // ✅ Fetch email using correct user ID

    if (!email) {
      console.error("❌ ERROR: No valid email found for Clerk ID:", clerkId);
      return;
    }

    console.log(`🔑 Logging in user ${email} (Clerk ID as password: ${clerkId})...`);

    // ✅ Obtain fresh JWT token (sets Authorization header in axiosInstance)
    try {
      await obtainToken(email, clerkId);
      console.log("✅ JWT Token obtained and Authorization header set.");
    } catch (error: any) {
      console.error("❌ ERROR obtaining JWT Token:", error.response?.data || error.message);
      return;
    }

    // ✅ Attach CSRF token (sets X-CSRFToken header in axiosInstance)
    try {
      await attachCsrfToken(email);
      console.log("✅ CSRF Token attached.");
    } catch (error: any) {
      console.error("❌ ERROR fetching CSRF Token:", error.response?.data || error.message);
      return;
    }

    // ✅ Call the Login API with correct headers automatically set by axiosInstance
    try {
      const loginResponse = await axiosInstance.post("/userapi/api/login/homechoice-user", {
        email,
        password: clerkId, // Clerk ID is used as the password
      });

      console.log("✅ Login API Response:", loginResponse.data);
    } catch (error: any) {
      console.error("❌ ERROR calling Login API:", error.response?.data || error.message);
      return;
    }

    console.log("✅ User successfully logged in with JWT and CSRF tokens.");
  } catch (error: any) {
    console.error("❌ ERROR logging in user:", error.response?.data || error.message);
  }
};

// ✅ Handle user logout (Token Required)
const handleUserLoggedOut = async (sessionData: any) => {
  try {
    console.log("🚪 Processing session.removed/session.ended event...");

    const clerkId = sessionData.user_id;
    if (!clerkId) {
      console.error("❌ ERROR: Missing Clerk ID in session event.");
      return;
    }

    console.log("🔍 Fetching user email from Clerk API for Clerk ID:", clerkId);

    let email = await extractUserEmail({ id: clerkId });

    if (!email) {
      console.error("❌ ERROR: No valid email found for Clerk ID:", clerkId);
      return;
    }

    console.log(`🚪 Logging out user ${email} (Clerk ID: ${clerkId})...`);

    // Obtain fresh JWT token before logout request and log response
    try {
      const tokenResponse = await obtainToken(email, clerkId);
      console.log("✅ JWT Token Response:", tokenResponse);
    } catch (error: any) {
      console.error("❌ ERROR obtaining JWT Token:", error.response?.data || error.message);
      return;
    }

    // Perform logout API call and log response
    try {
      const logoutResponse = await axiosInstance.post("userapi/api/logout", { email });
      console.log("✅ Logout API Response:", logoutResponse.data);
    } catch (error: any) {
      console.error("❌ ERROR during logout:", error.response?.data || error.message);
      return;
    }

    // ✅ Clear stored tokens after logout
    clearTokens();
    console.log("✅ User successfully logged out.");
  } catch (error: any) {
    console.error("❌ ERROR logging out user:", error.response?.data || error.message);
  }
};
