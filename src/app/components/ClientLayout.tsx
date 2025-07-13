"use client";

import { ReactNode } from "react";
import Navigation from "./Navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border-b-2 border-amber-600 p-6 text-center shadow-lg">
        <h1 className="text-5xl font-unifraktur-cook text-amber-200 drop-shadow-lg">A Northumbrian Saga</h1>
        <p className="text-amber-300 mt-2 font-medieval-sharp text-lg">An immersive medieval fanfiction experience</p>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 bg-gradient-to-b from-transparent to-gray-900/50">{children}</main>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-2 border-amber-600 p-4 text-center text-amber-400 text-sm">
        &copy; 2024 A Northumbrian Saga. All rights reserved.
      </footer>
    </>
  );
}
