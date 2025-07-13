"use client";

import { useState } from "react";

interface Book {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  excerpt: string;
}

export default function EditBooksPage() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: "book1",
      title: "Crown Of Thorns",
      description: "The first tale in the Northumbrian Saga",
      chapters: [
        { id: "ch1", title: "Chapter 1: The Beginning", content: "In the cold mists of Northumbria, a tale begins...", excerpt: "In the cold mists of Northumbria..." },
        { id: "ch2", title: "Chapter 2: The Gathering Storm", content: "Dark clouds gather over the moors as conflict approaches...", excerpt: "Dark clouds gather over the moors..." },
      ]
    },
    {
      id: "book2",
      title: "The Blood Tides",
      description: "The second tale in the Northumbrian Saga",
      chapters: [
        { id: "ch1", title: "Chapter 1: Rising Waters", content: "The tides of war begin to turn...", excerpt: "The tides of war begin to turn..." },
      ]
    },
    {
      id: "book3",
      title: "Kingmaker",
      description: "The third tale in the Northumbrian Saga",
      chapters: [
        { id: "ch1", title: "Chapter 1: The Crown's Weight", content: "Power comes with a heavy price...", excerpt: "Power comes with a heavy price..." },
      ]
    }
  ]);

  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setSelectedChapter("");
    setIsEditing(false);
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapter(chapterId);
    const book = books.find(b => b.id === selectedBook);
    const chapter = book?.chapters.find(c => c.id === chapterId);
    if (chapter) {
      setEditingTitle(chapter.title);
      setEditingContent(chapter.content);
      setIsEditing(true);
    }
  };

  const handleSaveChapter = () => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === selectedBook 
          ? {
              ...book,
              chapters: book.chapters.map(chapter =>
                chapter.id === selectedChapter
                  ? {
                      ...chapter,
                      title: editingTitle,
                      content: editingContent,
                      excerpt: editingContent.substring(0, 100) + "..."
                    }
                  : chapter
              )
            }
          : book
      )
    );
    alert("Chapter saved successfully!");
  };

  const handleAddChapter = () => {
    if (!selectedBook) return;
    
    const newChapterId = `ch${Date.now()}`;
    const newChapter: Chapter = {
      id: newChapterId,
      title: "New Chapter",
      content: "Enter your chapter content here...",
      excerpt: "Enter your chapter content here..."
    };

    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === selectedBook
          ? { ...book, chapters: [...book.chapters, newChapter] }
          : book
      )
    );

    setSelectedChapter(newChapterId);
    setEditingTitle(newChapter.title);
    setEditingContent(newChapter.content);
    setIsEditing(true);
  };

  const selectedBookData = books.find(b => b.id === selectedBook);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">Edit Book Content</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Selection */}
        <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4">Select Book</h2>
          <div className="space-y-3">
            {books.map(book => (
              <button
                key={book.id}
                onClick={() => handleBookSelect(book.id)}
                className={`w-full text-left p-3 rounded transition ${
                  selectedBook === book.id
                    ? "bg-amber-800 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <div className="font-semibold">{book.title}</div>
                <div className="text-sm opacity-75">{book.chapters.length} chapters</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Selection */}
        <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medieval-sharp text-amber-300">Chapters</h2>
            {selectedBook && (
              <button
                onClick={handleAddChapter}
                className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
              >
                + Add Chapter
              </button>
            )}
          </div>
          
          {selectedBookData ? (
            <div className="space-y-3">
              {selectedBookData.chapters.map(chapter => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter.id)}
                  className={`w-full text-left p-3 rounded transition ${
                    selectedChapter === chapter.id
                      ? "bg-amber-800 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <div className="font-semibold text-sm">{chapter.title}</div>
                  <div className="text-xs opacity-75 mt-1">{chapter.excerpt}</div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Select a book to view chapters</p>
          )}
        </div>

        {/* Chapter Editor */}
        <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4">Chapter Editor</h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-amber-300 font-semibold mb-2">Chapter Title</label>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-amber-300 font-semibold mb-2">Chapter Content</label>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={12}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none resize-vertical"
                />
              </div>
              
              <button
                onClick={handleSaveChapter}
                className="w-full bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 rounded transition"
              >
                Save Chapter
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Select a chapter to edit</p>
          )}
        </div>
      </div>

      {/* Back to Admin */}
      <div className="mt-8 text-center">
        <a 
          href="/admin" 
          className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition"
        >
          ← Back to Admin Panel
        </a>
      </div>
    </div>
  );
}
