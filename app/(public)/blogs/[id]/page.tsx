// * Single blog post page ("/blogs/[id]")
"use client";

import { useParams } from "next/navigation";

export default function BlogDetailsPage() {
  const { id } = useParams();
  console.log(id);
  return <div>BlogDetailsPage</div>;
}
