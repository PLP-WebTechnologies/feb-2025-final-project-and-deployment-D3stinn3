"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const ProfileBtn = () => {
  const { user, isSignedIn } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-[14px] p-1" ref={dropdownRef}>
      {isSignedIn ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
          aria-label="Open profile menu"
          title="Open profile menu"
        >
          <Image
            priority
            src={user?.imageUrl || "/icons/email.svg"} // Default image
            height={100}
            width={100}
            alt="User profile"
            className="max-w-[22px] max-h-[22px] rounded-full object-cover"
          />
        </button>
      ) : (
        <Link href="/signup">
          <Image
            priority
            src="/icons/user.svg"
            height={100}
            width={100}
            alt="Signup"
            className="max-w-[22px] max-h-[22px]"
          />
        </Link>
      )}

      {isSignedIn && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2 z-50">
          {/* User Email */}
          <p className="text-sm text-gray-700 px-2">
            {user.emailAddresses?.[0]?.emailAddress || "No email available"}
          </p>

          {/* Account Button */}
          <Link href="/account">
            <button
              type="button"
              className="w-full text-left px-2 py-1 text-sm text-blue-500 hover:bg-gray-100"
              title="Account"
            >
              Account
            </button>
          </Link>

          {/* Logout Button */}
          <SignOutButton>
            <button
              type="button"
              className="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100"
              title="Logout"
            >
              Logout
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
