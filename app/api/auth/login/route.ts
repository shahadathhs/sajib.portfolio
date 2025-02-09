// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configuration from "@/config/configuration";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // * Connect to MongoDB
    await dbConnect();

    // * Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // * Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const jwtSecret = configuration.jwtSecret as string;
    const jwtExpiration = configuration.jwtExpiration as string;
    // * Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: parseInt(jwtExpiration, 10),
    });

    return NextResponse.json(
      {
        success: true,
        role: user.role,
        token,
        message: "Logged in successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Login failed", details: error },
      { status: 500 }
    );
  }
}
