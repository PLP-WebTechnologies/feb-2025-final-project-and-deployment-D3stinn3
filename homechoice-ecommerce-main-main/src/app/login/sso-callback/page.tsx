"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function SsoCallback() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        router.push("/"); // Redirect authenticated users
      } else {
        router.push("/login"); // If something went wrong
      }
    }
  }, [isLoaded, userId, router]);

  return <div>Processing sign-in...</div>;
}
