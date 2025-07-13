"use client";

import { useState } from "react";

export default function ChapterPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Placeholder chapter content
  const chapterContent = "This is the full text of chapter " + id + ". It tells the story of the saga in immersive medieval style.";

  // Placeholder comments data
  const [comments, setComments] = useState([
    { id: 1, user: "Reader1", text: "Great chapter! Loved the descriptions.", rating: 5 },
    { id: 2, user: "Reader2", text: "Interesting plot, but pacing was slow.", rating: 3 },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment && newRating > 0) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: "Anonymous", text: newComment, rating: newRating },
      ]);
      setNewComment("");
      setNewRating(0);
    } else {
      alert("Please enter a comment and select a rating.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold font-unifraktur-cook text-amber-300 mb-2">Chapter {id}</h2>
        <p className="text-amber-400 font-medieval-sharp">A Tale of Northumbria</p>
      </div>
      
      <article className="mb-12 p-8 bg-gradient-to-br from-amber-900/10 to-gray-900/30 rounded-lg border-2 border-amber-600/30 shadow-lg">
        <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed font-serif">
          {chapterContent}
        </div>
      </article>

      <section className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-8 rounded-lg border border-amber-600/30">
        <h3 className="text-3xl font-medieval-sharp text-amber-300 mb-6 text-center">Reader Comments & Ratings</h3>
        
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
              <div className="flex justify-between items-start mb-3">
                <p className="font-semibold text-amber-200 font-medieval-sharp">{comment.user}</p>
                <div className="text-yellow-400 text-lg">
                  {"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900/50 to-amber-900/20 p-6 rounded-lg border border-amber-600/30">
          <h4 className="text-xl font-medieval-sharp text-amber-300 mb-4">Share Your Thoughts</h4>
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              placeholder="Leave your comment, criticism, or praise for this chapter..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white resize-vertical focus:border-amber-500 focus:outline-none transition"
              rows={4}
            />
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-amber-300 font-medieval-sharp">Your Rating:</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`text-3xl focus:outline-none transition-all duration-200 ${
                      newRating >= star ? "text-yellow-400 scale-110" : "text-gray-600 hover:text-yellow-300"
                    }`}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg font-medieval-sharp transition-all duration-200 hover:shadow-lg"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </section>
      
      {/* Navigation */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.history.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded font-medieval-sharp transition"
        >
          ← Back to Chapters
        </button>
      </div>
    </div>
  );
}
