"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      console.log('Sending signup request...');
      const response = await fetch('/api/signup-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          newsletter,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        setMessage(`✅ Success! Signup request sent to wreckordd@gmail.com for approval. You will receive an email once your account is reviewed.`);
        setMessageType("success");
        
        // Reset form
        setEmail("");
        setPassword("");
        setNewsletter(false);
      } else {
        setMessage(`❌ Error: ${result.message || 'Failed to send signup request. Please try again.'}`);
        setMessageType("error");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage(`❌ Error: Failed to send signup request. Please check your connection and try again.`);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-amber-900/20 to-gray-900/50 rounded-lg border-2 border-amber-600/30">
      <h2 className="text-3xl font-unifraktur-cook mb-6 text-center text-amber-300">Join Our Readers</h2>
      <p className="text-gray-300 text-sm mb-6 text-center">
        Your signup request will be sent to the author for approval. You'll receive an email once reviewed.
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
            placeholder="Choose a secure password"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            id="newsletter"
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="w-4 h-4 text-amber-600 bg-gray-800 border-gray-600 rounded focus:ring-amber-500"
          />
          <label htmlFor="newsletter" className="font-semibold text-amber-300 font-medieval-sharp">
            Subscribe to chapter updates and newsletters
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-800 hover:bg-amber-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg font-medieval-sharp transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? "Sending Request..." : "Request to Join"}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Already approved? <a href="/auth/signin" className="text-amber-400 hover:text-amber-300 transition">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
