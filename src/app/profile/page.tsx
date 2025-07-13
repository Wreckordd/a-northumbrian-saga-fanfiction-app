"use client";

import { useState, useEffect } from "react";

interface UserProfile {
  email: string;
  displayName: string;
  avatar: string;
  age: string;
  location: string;
  bio: string;
  joinedAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    displayName: "",
    avatar: "",
    age: "",
    location: "",
    bio: "",
    joinedAt: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    // Load user profile from localStorage or API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const storedProfile = localStorage.getItem(`profile_${user.email}`);
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        // Initialize with basic user data
        setProfile(prev => ({
          ...prev,
          email: user.email,
          displayName: user.email.split('@')[0],
          joinedAt: user.approvedAt || new Date().toISOString()
        }));
      }
    }
  }, []);

  const handleSaveProfile = () => {
    try {
      localStorage.setItem(`profile_${profile.email}`, JSON.stringify(profile));
      setMessage("✅ Profile updated successfully!");
      setMessageType("success");
      setIsEditing(false);
    } catch (error) {
      setMessage("❌ Failed to update profile. Please try again.");
      setMessageType("error");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">User Profile</h1>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center ${
          messageType === "success" 
            ? "bg-green-900/50 border border-green-600 text-green-200" 
            : "bg-red-900/50 border border-red-600 text-red-200"
        }`}>
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <div className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-4 text-center">Avatar</h2>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-4xl text-gray-400">👤</div>
              )}
            </div>
            
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-white text-sm"
              />
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="md:col-span-2 bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medieval-sharp text-amber-300">Profile Information</h2>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded font-medieval-sharp transition"
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-400"
              />
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                disabled={!isEditing}
                className={`w-full p-3 rounded border border-gray-600 ${
                  isEditing ? "bg-gray-800 text-white focus:border-amber-500" : "bg-gray-700 text-gray-400"
                } focus:outline-none`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-300 font-semibold mb-2">Age (Optional)</label>
                <input
                  type="text"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="e.g., 25"
                  className={`w-full p-3 rounded border border-gray-600 ${
                    isEditing ? "bg-gray-800 text-white focus:border-amber-500" : "bg-gray-700 text-gray-400"
                  } focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-amber-300 font-semibold mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="e.g., London, UK"
                  className={`w-full p-3 rounded border border-gray-600 ${
                    isEditing ? "bg-gray-800 text-white focus:border-amber-500" : "bg-gray-700 text-gray-400"
                  } focus:outline-none`}
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                rows={4}
                className={`w-full p-3 rounded border border-gray-600 resize-vertical ${
                  isEditing ? "bg-gray-800 text-white focus:border-amber-500" : "bg-gray-700 text-gray-400"
                } focus:outline-none`}
              />
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">Member Since</label>
              <input
                type="text"
                value={new Date(profile.joinedAt).toLocaleDateString()}
                disabled
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition"
        >
          ← Back to Books
        </a>
      </div>
    </div>
  );
}
