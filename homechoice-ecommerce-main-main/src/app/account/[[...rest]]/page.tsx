"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/login");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // Prevents flickering before redirect
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[999999]">
      <div className="flex w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* User Profile component inside the same styled container */}
        <UserProfile path="/account" />
      </div>
    </div>
  );
}
