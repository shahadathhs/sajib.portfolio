"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
// import Image from "next/image";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink?: string;
  isFeatured: boolean;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If your API returns an array (e.g., data.project), pick the first item
          const proj = Array.isArray(data.project)
            ? data.project[0]
            : data.project;
          setProject(proj);
        } else {
          console.error("Error fetching project:", data.error);
          toast.dismiss();
          toast.error("Error fetching project");
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.dismiss();
        toast.error("Error fetching project");
      });
  }, [id]);

  if (!project) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="rounded-md shadow-md p-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded"
          // width={500}
          // height={300}
        />
        <h1 className="text-3xl font-bold mt-4">{project.title}</h1>
        <p className="text-gray-400 mt-2">{project.description}</p>
        <div className="flex space-x-4 mt-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Live Demo
          </a>
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
