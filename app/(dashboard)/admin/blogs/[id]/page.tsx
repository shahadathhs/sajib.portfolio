"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTitle(data.blog[0].title);
          setContent(data.blog[0].content);
          console.log("data.blog:", data.blog);
        }
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (data.success) {
        toast.dismiss();
        toast.success("Blog updated successfully!");
        router.push("/admin/blogs");
      } else {
        toast.dismiss();
        toast.error("Error updating blog");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.dismiss();
      toast.error("Error updating blog");
    } finally {
      setSaving(false);
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
        defaultValue={title}
      />
      <MDEditor
        value={content}
        height={400}
        onChange={(value) => setContent(value as string)}
      />
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        {saving ? "Saving..." : "Update Blog"}
      </button>
    </div>
  );
}
