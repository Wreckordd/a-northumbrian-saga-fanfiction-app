"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewTopicPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  const categories = [
    { id: "crown-thorns", name: "Crown Of Thorns" },
    { id: "blood-tides", name: "The Blood Tides" },
    { id: "kingmaker", name: "Kingmaker" },
    { id: "general", name: "General Discussion" },
    { id: "theories", name: "Theories & Speculation" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const storedAuthor = localStorage.getItem('author');
    
    if (!storedUser && !storedAuthor) {
      router.push('/auth/signin');
      return;
    }

    // Load user profile
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const profile = localStorage.getItem(`profile_${user.email}`);
      if (profile) {
        setUserProfile(JSON.parse(profile));
      } else {
        setUserProfile({ email: user.email, displayName: user.email.split('@')[0] });
      }
    } else if (storedAuthor) {
      setUserProfile({ email: 'author@northumbriasaga.com', displayName: 'Author' });
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    if (!title.trim() || !description.trim()) {
      setMessage("❌ Please fill in all required fields.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create new topic (in a real app, this would be an API call)
      const newTopic = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        author: userProfile?.displayName || "Anonymous",
        authorAvatar: userProfile?.avatar || "",
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        replies: 0,
        views: 0,
        category,
        isPinned: false
      };

      // Store in localStorage (in a real app, this would be saved to database)
      const existingTopics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
      existingTopics.unshift(newTopic);
      localStorage.setItem('forumTopics', JSON.stringify(existingTopics));

      setMessage("✅ Topic created successfully! Redirecting...");
      setMessageType("success");

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/forum');
      }, 1500);

    } catch (error) {
      console.error('Error creating topic:', error);
      setMessage("❌ Failed to create topic. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">Create New Topic</h1>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center ${
          messageType === "success" 
            ? "bg-green-900/50 border border-green-600 text-green-200" 
            : "bg-red-900/50 border border-red-600 text-red-200"
        }`}>
          {message}
        </div>
      )}

      <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-8 rounded-lg border border-amber-600/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-amber-300 font-semibold mb-2 font-medieval-sharp">
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-amber-300 font-semibold mb-2 font-medieval-sharp">
              Topic Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your topic..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
              maxLength={200}
            />
            <p className="text-gray-400 text-sm mt-1">{title.length}/200 characters</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-amber-300 font-semibold mb-2 font-medieval-sharp">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your topic in detail. What would you like to discuss?"
              rows={8}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none resize-vertical"
              maxLength={2000}
            />
            <p className="text-gray-400 text-sm mt-1">{description.length}/2000 characters</p>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-amber-300 font-semibold mb-2">Preview</h3>
            <div className="text-gray-300">
              <p className="font-semibold mb-1">Posted by: {userProfile.displayName}</p>
              <p className="text-lg font-semibold text-amber-200 mb-2">{title || "Your topic title will appear here"}</p>
              <p className="text-sm">{description || "Your topic description will appear here"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="flex-1 bg-amber-800 hover:bg-amber-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg font-medieval-sharp transition"
            >
              {isSubmitting ? "Creating Topic..." : "Create Topic"}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/forum')}
              className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg font-medieval-sharp transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
