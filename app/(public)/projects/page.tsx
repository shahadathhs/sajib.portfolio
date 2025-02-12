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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
         console.log("data.projects", data);
          setProjects(data.projects || data.blogs || []);
        } else {
          console.error("Error fetching projects:", data.error);
          setProjects([]);
          toast.dismiss();
          toast.error("Error fetching projects");
        }
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
        toast.dismiss();
        toast.error("Error fetching projects");
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {projects.length === 0 ? <p>No projects found.</p> : null} */}

        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t"
              // width={500}
              // height={500}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description.slice(0, 100) + "..."}</p>
              <div className="flex space-x-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Live Demo
                </a>
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Source Code
                  </a>
                )}
              </div>
              <div className="mt-4">
                <Link
                  href={`/projects/${project._id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
