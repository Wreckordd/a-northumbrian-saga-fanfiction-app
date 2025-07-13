"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  lastActivity: string;
  replies: number;
  views: number;
  category: string;
  isPinned: boolean;
}

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { id: "all", name: "All Topics", color: "amber" },
    { id: "crown-thorns", name: "Crown Of Thorns", color: "red" },
    { id: "blood-tides", name: "The Blood Tides", color: "blue" },
    { id: "kingmaker", name: "Kingmaker", color: "purple" },
    { id: "general", name: "General Discussion", color: "green" },
    { id: "theories", name: "Theories & Speculation", color: "orange" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const storedAuthor = localStorage.getItem('author');
    setIsLoggedIn(!!(storedUser || storedAuthor));

    // Load forum topics (mock data)
    const mockTopics: ForumTopic[] = [
      {
        id: "1",
        title: "What did you think of the ending of Crown Of Thorns?",
        description: "I just finished reading and I'm curious about everyone's thoughts on how it concluded...",
        author: "BookLover123",
        authorAvatar: "",
        createdAt: "2024-01-15T10:30:00Z",
        lastActivity: "2024-01-16T14:22:00Z",
        replies: 12,
        views: 89,
        category: "crown-thorns",
        isPinned: false
      },
      {
        id: "2",
        title: "Character Analysis: The Protagonist's Journey",
        description: "Let's discuss the character development throughout the series...",
        author: "MedievalFan",
        authorAvatar: "",
        createdAt: "2024-01-14T16:45:00Z",
        lastActivity: "2024-01-16T12:15:00Z",
        replies: 8,
        views: 156,
        category: "general",
        isPinned: true
      },
      {
        id: "3",
        title: "Theories about The Blood Tides sequel",
        description: "What do you think will happen next? Share your predictions!",
        author: "TheoryMaster",
        authorAvatar: "",
        createdAt: "2024-01-13T09:20:00Z",
        lastActivity: "2024-01-15T18:30:00Z",
        replies: 25,
        views: 203,
        category: "theories",
        isPinned: false
      },
      {
        id: "4",
        title: "Welcome to the Northumbrian Saga Forum!",
        description: "Introduce yourself and let us know what brought you to this amazing series.",
        author: "Admin",
        authorAvatar: "",
        createdAt: "2024-01-10T12:00:00Z",
        lastActivity: "2024-01-16T11:45:00Z",
        replies: 34,
        views: 412,
        category: "general",
        isPinned: true
      }
    ];

    setTopics(mockTopics);
  }, []);

  const filteredTopics = selectedCategory === "all" 
    ? topics 
    : topics.filter(topic => topic.category === selectedCategory);

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || "gray";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-unifraktur-cook text-amber-300">Community Forum</h1>
        {isLoggedIn && (
          <Link href="/forum/new-topic" className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition">
            + New Topic
          </Link>
        )}
      </div>

      {!isLoggedIn && (
        <div className="bg-amber-900/20 border border-amber-600/30 p-4 rounded-lg mb-6 text-center">
          <p className="text-amber-300">
            <Link href="/auth/signin" className="underline hover:text-amber-200">Sign in</Link> or{" "}
            <Link href="/auth/signup" className="underline hover:text-amber-200">join</Link> to participate in discussions!
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded font-medieval-sharp transition ${
                selectedCategory === category.id
                  ? `bg-${category.color}-800 text-white`
                  : `bg-gray-800 hover:bg-${category.color}-900/50 text-gray-300`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Forum Topics */}
      <div className="space-y-4">
        {sortedTopics.map(topic => (
          <div key={topic.id} className="bg-gradient-to-r from-amber-900/20 to-gray-900/50 border border-amber-600/30 rounded-lg p-6 hover:border-amber-500/50 transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {topic.isPinned && (
                    <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded font-semibold">PINNED</span>
                  )}
                  <span className={`bg-${getCategoryColor(topic.category)}-700 text-white text-xs px-2 py-1 rounded`}>
                    {categories.find(c => c.id === topic.category)?.name}
                  </span>
                </div>
                
                <Link href={`/forum/topic/${topic.id}`} className="block">
                  <h3 className="text-xl font-semibold text-amber-200 hover:text-amber-100 transition mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {topic.description}
                  </p>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>By {topic.author}</span>
                  <span>•</span>
                  <span>{formatDate(topic.createdAt)}</span>
                  <span>•</span>
                  <span>Last activity: {formatDate(topic.lastActivity)}</span>
                </div>
              </div>

              <div className="text-right text-sm text-gray-400 ml-6">
                <div className="mb-1">
                  <span className="text-amber-300 font-semibold">{topic.replies}</span> replies
                </div>
                <div>
                  <span className="text-amber-300 font-semibold">{topic.views}</span> views
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No topics found in this category.</p>
          {isLoggedIn && (
            <Link href="/forum/new-topic" className="inline-block mt-4 bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition">
              Start the first discussion!
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
