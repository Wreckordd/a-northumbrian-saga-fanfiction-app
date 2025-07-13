"use client";

import { useState, useEffect } from "react";

interface ForumPost {
  id: string;
  topicId: string;
  topicTitle: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
  isReported: boolean;
  reportReason?: string;
}

export default function ForumModerationPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showReportedOnly, setShowReportedOnly] = useState(false);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "crown-thorns", name: "Crown Of Thorns" },
    { id: "blood-tides", name: "The Blood Tides" },
    { id: "kingmaker", name: "Kingmaker" },
    { id: "general", name: "General Discussion" },
    { id: "theories", name: "Theories & Speculation" },
  ];

  useEffect(() => {
    // Mock forum posts data
    const mockPosts: ForumPost[] = [
      {
        id: "1",
        topicId: "topic1",
        topicTitle: "What did you think of the ending of Crown Of Thorns?",
        content: "I completely agree! The ending was bittersweet but felt very authentic to the medieval setting.",
        author: "MedievalFan",
        createdAt: "2024-01-15T14:22:00Z",
        category: "crown-thorns",
        isReported: false
      },
      {
        id: "2",
        topicId: "topic1",
        topicTitle: "What did you think of the ending of Crown Of Thorns?",
        content: "This book was terrible and the author doesn't know what they're doing!",
        author: "TrollUser",
        createdAt: "2024-01-15T16:45:00Z",
        category: "crown-thorns",
        isReported: true,
        reportReason: "Inappropriate content/harassment"
      },
      {
        id: "3",
        topicId: "topic2",
        topicTitle: "Character Analysis: The Protagonist's Journey",
        content: "The character development throughout the series has been incredible. I love how each book builds on the previous one.",
        author: "BookAnalyst",
        createdAt: "2024-01-14T10:30:00Z",
        category: "general",
        isReported: false
      },
      {
        id: "4",
        topicId: "topic3",
        topicTitle: "Theories about The Blood Tides sequel",
        content: "I think the next book will focus on the northern kingdoms. There were so many hints in the last chapter!",
        author: "TheoryMaster",
        createdAt: "2024-01-13T18:15:00Z",
        category: "theories",
        isReported: false
      }
    ];

    setPosts(mockPosts);
  }, []);

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      alert("Post deleted successfully.");
    }
  };

  const handleApprovePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isReported: false, reportReason: undefined }
        : post
    ));
    alert("Post approved and report dismissed.");
  };

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const reportMatch = !showReportedOnly || post.isReported;
    return categoryMatch && reportMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + " at " + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">Forum Moderation</h1>
      
      {/* Filters */}
      <div className="mb-6 bg-gradient-to-r from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-amber-300 font-semibold mb-2">Category Filter</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-amber-300 font-semibold">
              <input
                type="checkbox"
                checked={showReportedOnly}
                onChange={(e) => setShowReportedOnly(e.target.checked)}
                className="w-4 h-4"
              />
              Show reported posts only
            </label>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className={`p-6 rounded-lg border transition ${
            post.isReported 
              ? "bg-gradient-to-r from-red-900/30 to-gray-900/50 border-red-600/50" 
              : "bg-gradient-to-r from-amber-900/20 to-gray-900/50 border-amber-600/30"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {post.isReported && (
                    <span className="bg-red-700 text-white text-xs px-2 py-1 rounded font-semibold">REPORTED</span>
                  )}
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-amber-200 mb-2">
                  Topic: {post.topicTitle}
                </h3>
                
                <div className="text-gray-300 mb-3 p-3 bg-gray-800/50 rounded">
                  {post.content}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
