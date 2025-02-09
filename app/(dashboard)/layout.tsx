"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/lib/shared/Sidebar";
import { USER_ROLES } from "@/models/User";
import toast from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    // Check for token and role in localStorage.
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      router.push("/login");
      toast.error("Login required to access this page.");
    } else if (token && role === USER_ROLES.USER) {
      router.push("/");
      toast.error("You are not authorized to access this page.");
    } else if (token && role === USER_ROLES.ADMIN) {
      setAuthorized(true);
      // toast.success("Welcome to the admin dashboard!");
    } else {
      router.push("/login");
      toast.error("Login required to access this page.");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex">
      <Sidebar />
      {children}
    </main>
  );
}
