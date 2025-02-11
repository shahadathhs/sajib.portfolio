"use client";

import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Message sent successfully");
        // Clear the form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const contactEmail = "shahadathhossensajib732@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(contactEmail)
      .then(() => toast.success("Email copied!"))
      .catch(() => toast.error("Failed to copy email"));
  };

  return (
    <div className="w-full min-h-calc -mt-20 pt-20 h-full p-4 justify-between items-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Contact Form */}
      <div className="max-w-lg mx-auto rounded-md shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Sent Me Message</h1>
        <form onSubmit={handleSubmit} className="w-72 mx-auto">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-500"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Your name"
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="your@example.com"
            />
          </div>
          {/* Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-blue-500"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              value={message}
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Your message"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      {/* Social Links */}
      <div className="max-w-lg mx-auto rounded-md shadow-md p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Social Links</h2>
        <div className="space-y-6">
          {/* GitHub Link */}
          <div className="flex items-center space-x-3">
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.654 1.653.243 2.874.12 3.176.77.84 1.232 1.912 1.232 3.222 0 4.61-2.807 5.623-5.48 5.921.43.372.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              href="https://github.com/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-500 hover:underline"
            >
              GitHub
            </Link>
          </div>
          {/* Email with Copy Button */}
          <div className="flex items-center space-x-3">
            {/* Email Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>

            <span className="text-xs text-blue-500">
              {contactEmail}
            </span>
            <button onClick={handleCopyEmail}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-files"
              >
                <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
              </svg>
            </button>
          </div>
          {/* LinkedIn Link */}
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.238-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76s.784-1.75 1.75-1.75c.967 0 1.75.784 1.75 1.75s-.783 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.076-.022-2.462-1.5-2.462-1.5 0-1.73 1.171-1.73 2.38v4.582h-3v-9h2.881v1.229h.041c.401-.761 1.379-1.562 2.838-1.562 3.036 0 3.6 1.998 3.6 4.596v4.737z" />
            </svg>
            <Link
              href="https://linkedin.com/in/shahadathhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-500 hover:underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
