"use client";

import { useState } from "react";

export default function NewChapterPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Chapter submitted: " + title + (image ? " with image " + image.name : ""));
    // TODO: Implement real chapter upload logic
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-md border border-gray-700">
      <h2 className="text-2xl font-unifraktur-cook mb-6 text-center">Add New Chapter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Chapter Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="text" className="block mb-1 font-semibold">
            Chapter Text
          </label>
          <textarea
            id="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white resize-vertical"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 font-semibold">
            Upload Image (optional)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded transition"
        >
          Submit Chapter
        </button>
      </form>
    </div>
  );
}
