import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();

    // Demo credentials
    const demoUser = {
      username: "Admin Demo",
      email: "admin@demo.com",
      password: "Demo123!",
      accessSection: "all",
      role: "admin",
    };

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: demoUser.email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "Demo user already exists",
          credentials: {
            email: demoUser.email,
            password: demoUser.password,
            role: demoUser.role,
          },
        },
        { status: 200 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(demoUser.password, 10);

    // Create demo user
    const newUser = new UserModel({
      username: demoUser.username,
      email: demoUser.email,
      password: hashedPassword,
      accessSection: demoUser.accessSection,
      role: demoUser.role,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "Demo user created successfully",
        credentials: {
          email: demoUser.email,
          password: demoUser.password,
          role: demoUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding demo user:", error);
    return NextResponse.json(
      { error: "Failed to seed demo user" },
      { status: 500 }
    );
  }
}
