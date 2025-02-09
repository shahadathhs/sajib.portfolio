"use client";

import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  console.log(id);
  return <div>ProjectDetailsPage</div>;
}
