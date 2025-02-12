import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Projects";
import { NextResponse } from "next/server";

// * Operations for a specific project
export async function GET(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  // * connect to db
  await dbConnect();
  try {
    const project = await Project.findById(params.id);
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch project",
    });
  }
}

export async function PUT(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  try {
    const { id } = params;
    const { title, description, image, liveLink, repoLink, isFeatured } =
      await request.json();
    console.log(title, description, image, liveLink, repoLink, isFeatured);

    // * connect to db
    await dbConnect();
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description, image, liveLink, repoLink, isFeatured },
      { new: true }
    );
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update project",
    });
  }
}

export async function DELETE(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  try {
    const { id } = params;
    // * connect to db
    await dbConnect();
    const project = await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete project",
    });
  }
}
