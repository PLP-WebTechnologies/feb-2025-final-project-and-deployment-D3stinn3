"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/backend/login"; // Import login function

export default function LoginPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress ?? "";

      const syncUserToBackend = async () => {
        try {
          await loginUser({
            email,
            password: "default_password123", // Use a default password or token
          });
          console.log("User logged in and sent to backend:", user);
        } catch (error) {
          console.error("Error logging in user in backend:", error);
        }
      };

      syncUserToBackend();
    }
  }, [isSignedIn, user]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[999999]">
      <div className="flex w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
}
