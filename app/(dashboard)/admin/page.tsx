"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IUser } from "@/models/User";

interface LoginUser extends IUser {
  token: string;
}

export default function RootAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<LoginUser | null>(null);

  // Retrieve the user object from localStorage on component mount
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");
    if (userString) {
      try {
        const userObj = JSON.parse(userString);
        setUser({ ...userObj, token: userToken });
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        // If parsing fails, remove the invalid user object and redirect to login.
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/login");
      }
    } else {
      // If no user exists in localStorage, redirect to login.
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Clear user data from localStorage (and any other related keys)
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // While loading the user object, display a loading state.
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Authentication Token</h2>
            <p className="break-all text-sm text-gray-700">{user.token}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
