"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProjectCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title || !description || !image || !liveLink) {
      toast.dismiss();
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          image,
          liveLink,
          repoLink,
          isFeatured,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.dismiss();
        toast.success("Project created successfully");
        router.push("/admin/projects");
      } else {
        toast.dismiss();
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.dismiss();
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <div className="space-y-4 max-w-xl">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Project Title</label>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Project description */}
        <div>
          <label className="block font-medium mb-2">Project Description</label>
          <textarea
            placeholder="Project Description"
            value={description}
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Image url */}
        <div>
          <label className="block font-medium mb-2">Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* live link  */}
        <div>
          <label className="block font-medium mb-2">Live Link URL</label>
          <input
            type="text"
            placeholder="Live Link URL"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* repository link */}
        <div>
          <label className="block font-medium mb-2">Repository Link URL</label>
          <input
            type="text"
            placeholder="Repository Link URL (optional)"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* featured checkbox  */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2 checkbox"
          />
          <label>Feature this project on home page</label>
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
