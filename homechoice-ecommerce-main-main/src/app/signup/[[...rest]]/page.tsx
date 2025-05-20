"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { signupUser } from "@/api/backend/signup";

export default function SignupPage() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress ?? "";
      const username = user.username ?? email.split("@")[0];
      const password = "default_password123"; // Default password

      const syncUserToBackend = async () => {
        try {
          await signupUser({ email, username, password });
          console.log("User added to backend database:", user);
        } catch (error) {
          console.error("Error pushing user to backend:", error);
        }
      };

      syncUserToBackend();
    }
  }, [isSignedIn, user]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[999999]">
      <div className="flex w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </div>
  );
}
