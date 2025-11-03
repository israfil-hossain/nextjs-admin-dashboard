import dbConnect from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import { authenticate } from "../utils/authenticate";


// GET by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found!" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: portfolio });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// DELETE by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  const auth = await authenticate(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return NextResponse.json({ message: "Portfolio not found!" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Portfolio deleted successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// PATCH by ID
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const updates = await request.json();

  const auth = await authenticate(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedPortfolio) {
      return NextResponse.json({ message: "Portfolio not found!" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedPortfolio });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
