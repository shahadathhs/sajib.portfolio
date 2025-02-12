import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Projects";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const { title, description, image, liveLink, repoLink, isFeatured } =
      await request.json();

    if (!title || !description || !image || !liveLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // * connect to db
    await dbConnect();

    const newProject = new Project({
      title,
      description,
      image,
      liveLink,
      repoLink,
      isFeatured,
    });
    await newProject.save();
    return NextResponse.json(
      { success: true, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Error creating project" }, { status: 500 });
  }
}