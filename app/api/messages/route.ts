import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

//* POST: Create a new message
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return NextResponse.json(
      { success: true, message: "Message submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting message:", error);
    return NextResponse.json(
      { error: "Error submitting message" },
      { status: 500 }
    );
  }
}

// * GET: Retrieve all messages (for admin use)
export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: 500 }
    );
  }
}
