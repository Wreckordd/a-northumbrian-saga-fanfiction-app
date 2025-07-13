"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for stored author session on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuthor = localStorage.getItem('author');
      const storedUser = localStorage.getItem('user');
      
      if (storedAuthor) {
        setIsAuthor(true);
        setIsLoggedIn(true);
      } else if (storedUser) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    setIsAuthor(false);
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('author');
      localStorage.removeItem('user');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-amber-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-unifraktur-cook text-amber-400 hover:text-amber-300 transition">
          A Northumbrian Saga
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-amber-300 transition font-medieval-sharp">
            Books
          </Link>
          <Link href="/forum" className="text-white hover:text-amber-300 transition font-medieval-sharp">
            Forum
          </Link>
          
          {!isLoggedIn ? (
            <>
              <Link href="/auth/signin" className="text-white hover:text-amber-300 transition font-medieval-sharp">
                Reader Sign In
              </Link>
              <Link href="/auth/signup" className="text-white hover:text-amber-300 transition font-medieval-sharp">
                Join Readers
              </Link>
              <Link href="/auth/author-login" className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded font-medieval-sharp transition">
                Author Login
              </Link>
            </>
          ) : (
            <>
              {isAuthor && (
                <>
                  <Link href="/admin" className="text-amber-300 hover:text-amber-200 transition font-medieval-sharp">
                    Admin Panel
                  </Link>
                  <Link href="/chapters/new" className="text-amber-300 hover:text-amber-200 transition font-medieval-sharp">
                    Add Chapter
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded font-medieval-sharp transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
