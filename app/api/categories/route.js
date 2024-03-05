import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Categories from "@/models/categories";
export async function GET() {
  await dbConnect();
  try {
    const categories = await Categories.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
