"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  return (
    
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}

        <Logo />


        {/* Navigation Links */}
        <nav className="hidden md:block space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
          <Link href="/friends" className="text-gray-600 hover:text-gray-900 font-medium">Friends</Link>
          <Link href="/feed" className="text-gray-600 hover:text-gray-900 font-medium">Feed</Link>

          {user ? (
        <Link href="/signup" className="text-gray-600 hover:text-gray-900 font-medium hidden">Sign Up</Link>
      ) : (
        <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 font-medium mr-4">Sign Up</Link>
      )}

          {user ? (
        <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium hidden">Log In</Link>
      ) : (
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 font-medium">Log In</Link>
      )}

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md py-2">
          <nav className="flex flex-col space-y-4 px-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/friends" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Freinds</Link>
            <Link href="/feed" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Feed</Link>

            {user ? (
        <Link href="/signup" className="text-gray-600 hover:text-gray-900 font-medium hidden">Sign Up</Link>
      ) : (
        <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 font-medium mr-4 w-30 text-center">Sign Up</Link>
      )}

            {user ? (
        <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium hidden">Log In</Link>
      ) : (
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 font-medium w-30 text-center">Log In</Link>
      )}
          </nav>
        </div>
      )}
    </header>
  );
}
