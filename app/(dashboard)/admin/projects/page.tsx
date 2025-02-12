"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink?: string;
  isFeatured: boolean;
};
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.dismiss();
          toast.error("Failed to fetch projects");
        }
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        toast.dismiss();
        toast.error("Failed to fetch projects");
      });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((project) => project._id !== id));
        toast.dismiss();
        toast.success("Project deleted successfully");
      } else {
        toast.dismiss();
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.dismiss();
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>
      <Link
        href="/admin/projects/new"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
      >
        Create New Project
      </Link>
      <ul className="mt-4 space-y-4">
        {projects.length === 0 && <p>No projects found.</p>}

        {projects.map((project) => (
          <li
            key={project._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description.slice(0, 100) + "..."}</p>
            </div>
            <div className="space-x-4">
              <Link
                href={`/admin/projects/${project._id}`}
                className="text-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project._id)}
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
