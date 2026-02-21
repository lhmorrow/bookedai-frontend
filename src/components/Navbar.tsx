'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="container-max flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-bold text-lg hidden sm:inline text-slate-900">BookedAI</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/pricing" className="btn-ghost text-sm hidden md:block">
            Pricing
          </Link>
          
          {mounted && (isLoggedIn ? (
            <>
              <Link href="/dashboard" className="btn-ghost text-sm">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('business_id');
                  localStorage.removeItem('demo_user');
                  setIsLoggedIn(false);
                  window.location.href = '/';
                }}
                className="btn-ghost text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-sm">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Get Started
              </Link>
            </>
          ))}
        </div>
      </div>
    </nav>
  );
}
