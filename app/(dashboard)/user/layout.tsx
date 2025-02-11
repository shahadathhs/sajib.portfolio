"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/models/User";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UserLayout({
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
      toast.dismiss();
      toast.error("Login required to access this page.");
    } else if (token && role === USER_ROLES.ADMIN) {
      router.push("/admin");
      toast.dismiss();
      toast.error("You are not authorized to access this page.");
    } else if (token && role === USER_ROLES.USER) {
      setAuthorized(true);
    } else {
      router.push("/login");
      toast.dismiss();
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
    <main className="min-h-screen w-full flex justify-between">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          {children}

          {/* button to open drawer in mobile view */}
          <div className="fixed top-4 right-4 z-50">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open Menu
            </label>
          </div>
        </div>

        {/* Drawer side content here */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-40 p-4">
            {/* Sidebar content here */}
            <li>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.route}
                  className="btn btn-ghost text-md"
                >
                  {item.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

const navItems = [
  { label: "Home", route: "/" },
  { label: "Blogs", route: "/blogs" },
  { label: "User", route: "/user" },
];
