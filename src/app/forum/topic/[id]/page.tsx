"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ForumPost {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  isOriginalPost: boolean;
}

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  category: string;
  posts: ForumPost[];
}

export default function TopicPage({ params }: { params: { id: string } }) {
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const categories = {
    "crown-thorns": "Crown Of Thorns",
    "blood-tides": "The Blood Tides",
    "kingmaker": "Kingmaker",
    "general": "General Discussion",
    "theories": "Theories & Speculation",
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const storedAuthor = localStorage.getItem('author');
    setIsLoggedIn(!!(storedUser || storedAuthor));

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

    // Load topic data (mock data for now)
    const mockTopic: ForumTopic = {
      id: params.id,
      title: "What did you think of the ending of Crown Of Thorns?",
      description: "I just finished reading and I'm curious about everyone's thoughts on how it concluded. The character development was incredible, but I felt like some plot threads were left hanging. What are your thoughts?",
      author: "BookLover123",
      authorAvatar: "",
      createdAt: "2024-01-15T10:30:00Z",
      category: "crown-thorns",
      posts: [
        {
          id: "1",
          content: "I completely agree! The ending was bittersweet but felt very authentic to the medieval setting. The way the author handled the political intrigue was masterful.",
          author: "MedievalFan",
          authorAvatar: "",
          createdAt: "2024-01-15T14:22:00Z",
          isOriginalPost: false
        },
        {
          id: "2",
          content: "I have mixed feelings about it. While I loved the character arcs, I wish we had gotten more closure on the northern kingdoms subplot. Maybe it will be addressed in the next book?",
          author: "TheoryMaster",
          authorAvatar: "",
          createdAt: "2024-01-15T16:45:00Z",
          isOriginalPost: false
        },
        {
          id: "3",
          content: "The ending gave me chills! That final scene with the crown ceremony was beautifully written. I can't wait to see how it connects to The Blood Tides.",
          author: "SagaReader",
          authorAvatar: "",
          createdAt: "2024-01-16T09:12:00Z",
          isOriginalPost: false
        }
      ]
    };

    setTopic(mockTopic);
  }, [params.id]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !userProfile) return;

    setIsSubmitting(true);

    try {
      const newPost: ForumPost = {
        id: Date.now().toString(),
        content: newReply.trim(),
        author: userProfile.displayName || "Anonymous",
        authorAvatar: userProfile.avatar || "",
        createdAt: new Date().toISOString(),
        isOriginalPost: false
      };

      setTopic(prev => prev ? {
        ...prev,
        posts: [...prev.posts, newPost]
      } : null);

      setNewReply("");
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-400">Loading topic...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Topic Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <a href="/forum" className="text-amber-400 hover:text-amber-300 transition">← Back to Forum</a>
          <span className="text-gray-500">•</span>
          <span className="bg-red-700 text-white text-xs px-2 py-1 rounded">
            {categories[topic.category as keyof typeof categories]}
          </span>
        </div>
        
        <h1 className="text-3xl font-unifraktur-cook text-amber-300 mb-4">{topic.title}</h1>
      </div>

      {/* Original Post */}
      <div className="bg-gradient-to-r from-amber-900/30 to-gray-900/50 border-2 border-amber-600/30 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            {topic.authorAvatar ? (
              <img src={topic.authorAvatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-gray-400">👤</span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold text-amber-200 font-medieval-sharp">{topic.author}</span>
              <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded">ORIGINAL POST</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{formatDate(topic.createdAt)}</p>
            <div className="text-gray-200 leading-relaxed">
              {topic.description}
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-8">
        {topic.posts.map((post, index) => (
          <div key={post.id} className="bg-gradient-to-r from-gray-900/50 to-amber-900/20 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                {post.authorAvatar ? (
                  <img src={post.authorAvatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm">👤</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-amber-200 font-medieval-sharp">{post.author}</span>
                  <span className="text-gray-500">#{index + 1}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{formatDate(post.createdAt)}</p>
                <div className="text-gray-200 leading-relaxed">
                  {post.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      {isLoggedIn ? (
        <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 border border-amber-600/30 rounded-lg p-6">
          <h3 className="text-xl font-medieval-sharp text-amber-300 mb-4">Post a Reply</h3>
          
          <form onSubmit={handleSubmitReply} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                {userProfile?.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm">👤</span>
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-semibold text-amber-200 font-medieval-sharp mb-2">
                  {userProfile?.displayName || "Anonymous"}
                </p>
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none resize-vertical"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !newReply.trim()}
                className="bg-amber-800 hover:bg-amber-700 disabled:bg-gray-600 text-white px-6 py-2 rounded font-medieval-sharp transition"
              >
                {isSubmitting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-6 text-center">
          <p className="text-amber-300 mb-4">You must be signed in to reply to this topic.</p>
          <div className="space-x-4">
            <a href="/auth/signin" className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-2 rounded font-medieval-sharp transition">
              Sign In
            </a>
            <a href="/auth/signup" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medieval-sharp transition">
              Join Community
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
