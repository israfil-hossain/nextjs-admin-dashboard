import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import { verifyJWT } from "@/utils/jwtUtils";

export async function GET(request: NextRequest) {
  await dbConnect();

  // Pagination params
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // Convert to number
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Convert to number
  
  const skip = (page - 1) * limit;

  // Filters (You can expand this with more search params as needed)
  const search = searchParams.get("search");

  try {
    // Validate JWT token
    const token = request.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required!" },
        { status: 401 }
      );
    }

    // Decode and verify JWT token
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token!" },
        { status: 401 }
      );
    }

    // Build filter criteria
    const filter: Record<string, any> = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Fetch portfolios with pagination
    const portfolios = await Portfolio.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Portfolio.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: portfolios,
      total,
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { title, short_description, description, url, cover_img, category } = await request.json();

  try {
    // Validate JWT token
    const token = request.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required!" },
        { status: 401 }
      );
    }

    // Decode and verify JWT token
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token!" },
        { status: 401 }
      );
    }

    // Create new portfolio
    const newPortfolio = new Portfolio({
      title,
      short_description,
      description,
      url,
      cover_img,
      category,
    });

    await newPortfolio.save();

    return NextResponse.json(
      { message: "Portfolio Created Successfully!", data: newPortfolio },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
