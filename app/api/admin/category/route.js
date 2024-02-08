import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/categories";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name } = body;
  try {
    const category = await Category.create({ name, slug: slugify(name) });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    NextResponse.json(error.message, { status: 500 });
  }
}
