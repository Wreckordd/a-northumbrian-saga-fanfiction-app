"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthorLoginPage() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch('/api/author-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`✅ ${result.message} Redirecting to admin panel...`);
        setMessageType("success");
        
        // Store author session
        localStorage.setItem('author', JSON.stringify(result.user));
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        setMessage(`❌ ${result.message}`);
        setMessageType("error");
      }
    } catch (error) {
      console.error('Author login error:', error);
      setMessage("❌ Login failed. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
      setPassword("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-amber-900/20 to-gray-900/50 rounded-lg border-2 border-amber-600/30">
      <h2 className="text-3xl font-unifraktur-cook mb-6 text-center text-amber-300">Author Login</h2>
      <p className="text-gray-300 text-sm mb-6 text-center">
        Access the admin panel to manage chapters, comments, and reader approvals
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
          <label htmlFor="password" className="block mb-1 font-semibold text-amber-300 font-medieval-sharp">
            Author Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none transition"
            placeholder="Enter author password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-800 hover:bg-amber-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg font-medieval-sharp transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? "Authenticating..." : "Login as Author"}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          <a href="/" className="text-amber-400 hover:text-amber-300 transition">← Back to main page</a>
        </p>
      </div>
    </div>
  );
}
