import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY as string;

  if (!secret) {
    return NextResponse.json({ error: "Missing PAYSTACK_SECRET_KEY" }, { status: 500 });
  }

  const body = await req.text(); // Read raw body
  const signature = req.headers.get("x-paystack-signature"); // Signature from Paystack

  // Verify Signature
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Parse and process event
  const event = JSON.parse(body);

  switch (event.event) {
    case "charge.success":
      console.log("Payment received:", event.data);
      // Handle successful payment (update DB, send email, etc.)
      break;

    case "transfer.success":
      console.log("Transfer successful:", event.data);
      // Handle successful transfer
      break;

    default:
      console.log("Unhandled event:", event);
      break;
  }

  return NextResponse.json({ status: "success" });
}
