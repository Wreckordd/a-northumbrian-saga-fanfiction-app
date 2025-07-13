"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  // First 3 books with new titles
  const [books] = useState([
    { id: "book1", title: "Crown Of Thorns" },
    { id: "book2", title: "The Blood Tides" },
    { id: "book3", title: "Kingmaker" },
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold font-unifraktur-cook mb-8 text-center text-amber-300">Books in the Saga</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-gradient-to-br from-amber-900/20 to-gray-900/50 border-2 border-amber-600/30 p-6 rounded-lg hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20">
            <Link href={`/books/${book.id}`} className="block">
              <h3 className="text-xl font-semibold font-medieval-sharp text-amber-200 hover:text-amber-100 transition mb-2">
                {book.title}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to explore the chapters of this tale...
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-amber-400 text-sm font-medieval-sharp">Available Now</span>
                <span className="text-amber-600">→</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Welcome message for new visitors */}
      <div className="mt-12 bg-gradient-to-r from-amber-900/30 to-gray-900/30 border border-amber-600/30 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-unifraktur-cook text-amber-300 mb-4">Welcome to the Saga</h3>
        <p className="text-gray-300 mb-4">
          Journey through the medieval lands of Northumbria in this epic fanfiction series. 
          Each book contains multiple chapters filled with adventure, intrigue, and rich storytelling.
        </p>
        <p className="text-amber-400 text-sm font-medieval-sharp">
          Join our community of readers to leave comments and ratings on each chapter!
        </p>
      </div>
    </div>
  );
}
