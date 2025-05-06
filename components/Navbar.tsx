"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold">
        MyApp
      </Link>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={session.user?.image || "/user.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>{session.user?.name}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/app/(auth)/sign-in"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
