"use client";

import { useState } from "react";

export default function AdminPage() {
  // Mock pending signups
  const [pendingSignups, setPendingSignups] = useState([
    { id: 1, email: "reader1@example.com", newsletter: true, date: "2024-01-15" },
    { id: 2, email: "reader2@example.com", newsletter: false, date: "2024-01-16" },
    { id: 3, email: "bookfan@example.com", newsletter: true, date: "2024-01-17" },
  ]);

  // Mock comments awaiting moderation
  const [pendingComments, setPendingComments] = useState([
    { id: 1, user: "Reader1", chapter: "Book 1 - Chapter 1", text: "Amazing chapter! Love the character development.", rating: 5 },
    { id: 2, user: "CriticalReader", chapter: "Book 1 - Chapter 2", text: "The pacing seems a bit slow here. Maybe consider tightening the dialogue?", rating: 3 },
  ]);

  const approveSignup = (id: number) => {
    setPendingSignups(prev => prev.filter(signup => signup.id !== id));
    alert("User approved and notified!");
  };

  const rejectSignup = (id: number) => {
    setPendingSignups(prev => prev.filter(signup => signup.id !== id));
    alert("User signup rejected.");
  };

  const approveComment = (id: number) => {
    setPendingComments(prev => prev.filter(comment => comment.id !== id));
    alert("Comment approved and published!");
  };

  const rejectComment = (id: number) => {
    setPendingComments(prev => prev.filter(comment => comment.id !== id));
    alert("Comment rejected.");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">Author Admin Panel</h1>
      
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <a 
          href="/admin/edit-books"
          className="bg-gradient-to-br from-blue-900/20 to-gray-900/50 p-6 rounded-lg border border-blue-600/30 hover:border-blue-500/50 transition text-center"
        >
          <h3 className="text-xl font-medieval-sharp text-blue-300 mb-2">Edit Books</h3>
          <p className="text-gray-400 text-sm">Manage book content and chapters</p>
        </a>
        
        <a 
          href="/admin/metrics"
          className="bg-gradient-to-br from-green-900/20 to-gray-900/50 p-6 rounded-lg border border-green-600/30 hover:border-green-500/50 transition text-center"
        >
          <h3 className="text-xl font-medieval-sharp text-green-300 mb-2">Reader Metrics</h3>
          <p className="text-gray-400 text-sm">View reading analytics and engagement</p>
        </a>
        
        <a 
          href="/chapters/new"
          className="bg-gradient-to-br from-purple-900/20 to-gray-900/50 p-6 rounded-lg border border-purple-600/30 hover:border-purple-500/50 transition text-center"
        >
          <h3 className="text-xl font-medieval-sharp text-purple-300 mb-2">Add Chapter</h3>
          <p className="text-gray-400 text-sm">Create new chapter content</p>
        </a>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pending Signups */}
        <section className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4">Pending Reader Signups</h2>
          {pendingSignups.length === 0 ? (
            <p className="text-gray-400">No pending signups</p>
          ) : (
            <div className="space-y-4">
              {pendingSignups.map((signup) => (
                <div key={signup.id} className="bg-gray-800/50 p-4 rounded border border-gray-700">
                  <p className="font-semibold text-white">{signup.email}</p>
                  <p className="text-sm text-gray-400">Applied: {signup.date}</p>
                  <p className="text-sm text-gray-400">Newsletter: {signup.newsletter ? "Yes" : "No"}</p>
                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => approveSignup(signup.id)}
                      className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectSignup(signup.id)}
                      className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pending Comments */}
        <section className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4">Comments Awaiting Moderation</h2>
          {pendingComments.length === 0 ? (
            <p className="text-gray-400">No pending comments</p>
          ) : (
            <div className="space-y-4">
              {pendingComments.map((comment) => (
                <div key={comment.id} className="bg-gray-800/50 p-4 rounded border border-gray-700">
                  <p className="font-semibold text-white">{comment.user}</p>
                  <p className="text-sm text-amber-300">{comment.chapter}</p>
                  <p className="text-sm text-gray-300 mt-2">{comment.text}</p>
                  <p className="text-yellow-400 mt-1">{"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}</p>
                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => approveComment(comment.id)}
                      className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectComment(comment.id)}
                      className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quick Stats */}
      <section className="mt-8 bg-gradient-to-r from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
        <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-800/50 p-4 rounded">
            <p className="text-2xl font-bold text-amber-300">8</p>
            <p className="text-sm text-gray-400">Books</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded">
            <p className="text-2xl font-bold text-amber-300">47</p>
            <p className="text-sm text-gray-400">Chapters</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded">
            <p className="text-2xl font-bold text-amber-300">156</p>
            <p className="text-sm text-gray-400">Readers</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded">
            <p className="text-2xl font-bold text-amber-300">342</p>
            <p className="text-sm text-gray-400">Comments</p>
          </div>
        </div>
      </section>
    </div>
  );
}
