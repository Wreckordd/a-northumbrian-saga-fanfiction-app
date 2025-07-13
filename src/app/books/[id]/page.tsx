"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Placeholder chapters data for the book
  const [chapters] = useState([
    { id: "ch1", title: "Chapter 1: The Beginning", excerpt: "In the cold mists of Northumbria..." },
    { id: "ch2", title: "Chapter 2: The Gathering Storm", excerpt: "Dark clouds gather over the moors..." },
  ]);

  const bookTitles: { [key: string]: string } = {
    book1: "Crown Of Thorns",
    book2: "The Blood Tides",
    book3: "Kingmaker",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold font-unifraktur-cook text-amber-300 mb-2">
          {bookTitles[id] || `Book ${id}`}
        </h2>
        <p className="text-amber-400 font-medieval-sharp">Chapters Available</p>
      </div>
      
      <div className="grid gap-6">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-gradient-to-r from-amber-900/20 to-gray-900/50 border-2 border-amber-600/30 p-6 rounded-lg hover:border-amber-500/50 transition-all duration-300 shadow-lg">
            <a href={`/chapters/${chapter.id}`} className="block">
              <h3 className="text-2xl font-semibold font-medieval-sharp text-amber-200 hover:text-amber-100 transition mb-3">
                {chapter.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{chapter.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-amber-400 text-sm font-medieval-sharp">Click to read & comment</span>
                <span className="text-amber-600">→</span>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* Back to books navigation */}
      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition"
        >
          ← Back to All Books
        </a>
      </div>
    </div>
  );
}
