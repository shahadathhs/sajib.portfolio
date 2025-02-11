"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog created successfully");
        router.push("/admin/blogs");
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter blog title"
      />
      <MDEditor
        value={content}
        height={400}
        onChange={(value) => setContent(value as string)}
      />
      <button
        onClick={handleCreate}
        disabled={creating}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        {creating ? "Creating..." : "Create Blog"}
      </button>
    </div>
  );
}
