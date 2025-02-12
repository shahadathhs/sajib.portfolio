"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProjectEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.project) {
          // data.project might be an object or array depending on your API design
          const project = Array.isArray(data.project)
            ? data.project[0]
            : data.project;
          setTitle(project.title);
          setDescription(project.description);
          setImage(project.image);
          setLiveLink(project.liveLink);
          setRepoLink(project.repoLink || "");
          setIsFeatured(project.isFeatured);
        } else {
          toast.dismiss();
          toast.error("Failed to fetch project");
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.dismiss();
        toast.error("Failed to fetch project");
      });
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !description || !image || !liveLink) {
      toast.dismiss();
      toast.error("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
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
        toast.success("Project updated successfully");

        //8 wait for 1 second before redirecting
        setTimeout(() => {
          router.push("/admin/projects");
        }, 1000);
      } else {
        toast.dismiss();
        toast.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.dismiss();
      toast.error("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
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

        {/* Update button */}
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Updating..." : "Update Project"}
        </button>
      </div>
    </div>
  );
}
