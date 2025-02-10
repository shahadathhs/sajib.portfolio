"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTitle(data.blog.title);
          setContent(data.blog.content);
        }
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Blog updated successfully!");
        router.push("/admin/blogs");
      } else {
        alert("Error updating blog");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter blog title"
      />
      <MDEditor
        value={content}
        onChange={(value) => setContent(value as string)}
      />
      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
