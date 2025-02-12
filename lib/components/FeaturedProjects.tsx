"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink?: string;
  isFeatured: boolean;
};

export default function FeaturedProjects() {
  const [featured, setFeatured] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const featuredProjects = data.projects.filter(
            (project: Project) => project.isFeatured
          );
          setFeatured(featuredProjects);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Optionally, return null if there are no featured projects
  if (featured.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <div
              key={project._id}
              className="border rounded shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description.slice(0,100) + "..."}</p>
                <div className="flex space-x-4">
                  <Link
                    href={`/projects/${project._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
