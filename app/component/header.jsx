"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  return (
    
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <span>🐾 Pet Forum</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:block space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
          <Link href="/users" className="text-gray-600 hover:text-gray-900 font-medium">Users</Link>
          <Link href="/pets" className="text-gray-600 hover:text-gray-900 font-medium">Pets</Link>
          <Link href="/posts" className="text-gray-600 hover:text-gray-900 font-medium">Posts</Link>
          <Link href="/comments" className="text-gray-600 hover:text-gray-900 font-medium">Comments</Link>

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
            <Link href="/users" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Users</Link>
            <Link href="/pets" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Pets</Link>
            <Link href="/posts" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Posts</Link>
            <Link href="/comments" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>Comments</Link>

            {user ? (
        <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium hidden">Log In</Link>
      ) : (
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 font-medium w-max">Log In</Link>
      )}
          </nav>
        </div>
      )}
    </header>
  );
}
