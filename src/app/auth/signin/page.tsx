"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`✅ ${result.message} Welcome back, reader!`);
        setMessageType("success");
        
        // Reset form
        setEmail("");
        setPassword("");
        
        // In a real app, you'd store the user session/token
        localStorage.setItem('user', JSON.stringify(result.user));
      } else {
        setMessage(`❌ ${result.message}`);
        setMessageType("error");
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setMessage("❌ Sign in failed. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-amber-900/20 to-gray-900/50 rounded-lg border-2 border-amber-600/30">
      <h2 className="text-3xl font-unifraktur-cook mb-6 text-center text-amber-300">Reader Sign In</h2>
      <p className="text-gray-300 text-sm mb-6 text-center">
        Sign in to read chapters and leave comments
      </p>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center ${
          messageType === "success" 
            ? "bg-green-900/50 border border-green-600 text-green-200" 
            : "bg-red-900/50 border border-red-600 text-red-200"
        }`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-amber-300 font-medieval-sharp">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none transition"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold text-amber-300 font-medieval-sharp">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none transition"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-800 hover:bg-amber-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg font-medieval-sharp transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Need an account? <a href="/auth/signup" className="text-amber-400 hover:text-amber-300 transition">Request to join</a>
        </p>
      </div>
    </div>
  );
}
