"use client";

import { IBlog } from "@/models/Blog";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog>({} as IBlog);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog[0]);
        } else {
          console.error("Failed to fetch blog");
          toast.dismiss();
          toast.error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.dismiss();
        toast.error("Error fetching blog");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog.content)
    return (
      <p className="min-h-[400px] flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <div className="flex flex-col justify-between py-4">
      <h1 className="text-4xl font-bold mb-4 text-center max-w-3xl mx-auto py-4">
        {blog.title}
      </h1>
      <MDEditor
        value={blog.content}
        preview="preview"
        hideToolbar
        height={750}
      />
    </div>
  );
}
