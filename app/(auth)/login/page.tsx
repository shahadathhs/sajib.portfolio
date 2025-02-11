"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { USER_ROLES } from "@/models/User";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
      } else {
        // Store token, role, and the full user object for protected route validations
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.dismiss();
        toast.success(data.message || "Login successful!");

        // * Redirect based on role:
        if (data.role === USER_ROLES.ADMIN) {
          router.push("/admin");
          toast.dismiss();
          toast.success("Welcome, Admin!");
        } else if (data.role === USER_ROLES.USER) {
          router.push("/user");
          toast.dismiss();
          toast.success("Welcome, User!");
        } else {
          router.push("/");
          toast.dismiss();
          toast.success("Login successful!");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-md shadow-md p-6 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        Login to your account
      </h1>
      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            placeholder="you@example.com"
          />
        </div>
        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-500"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            placeholder="Enter your password"
          />
        </div>
        {/* Register Link */}
        <div className="text-sm text-gray-400 mb-2">
          New here?{" "}
          <Link href="/register">
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Register
            </span>
          </Link>
        </div>
        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
