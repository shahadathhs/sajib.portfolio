"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type Blog = {
  _id: string;
  title: string;
  content: string;
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        toast.dismiss();
        toast.success("Blog deleted successfully");
      } else {
        toast.dismiss();
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.dismiss();
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <Link
        href="/admin/blogs/new"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Blog
      </Link>

      <ul className="mt-4">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="border p-3 flex justify-between items-center"
          >
            <span>{blog.title}</span>
            <div>
              <Link
                href={`/admin/blogs/${blog._id}`}
                className="text-blue-500 mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
