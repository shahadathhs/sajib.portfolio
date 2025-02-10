// /api/blogs/route.ts
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // * connect to db
    await dbConnect();

    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // * connect to db
    await dbConnect();

    const newBlog = new Blog({ title, content });
    await newBlog.save();
    return NextResponse.json(
      { success: true, message: "Blog created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}
