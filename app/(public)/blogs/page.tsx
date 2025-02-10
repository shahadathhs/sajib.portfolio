"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBlog } from "@/models/Blog";

export default function Blogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <ul className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id} className="border-b pb-4">
              <Link
                href={`/blogs/${blog._id}`}
                className="text-lg font-semibold underline"
              >
                {blog.title}
              </Link>
              <p>{blog.content.substring(0, 150)}...</p>
            </li>
          ))
        ) : (
          <li>No blogs available</li>
        )}
      </ul>
    </div>
  );
}
