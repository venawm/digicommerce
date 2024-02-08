import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/categories";
import slugify from "slugify";

export async function PUT(req, context) {
  dbConnect();
  const body = await req.json();
  const { name } = body;
  try {
    const updatingCategory = await Category.findByIdAndUpdate(
      context.params.id,
      { ...body, slug: slugify(name) },
      { new: true }
    );
    return NextResponse.json(updatingCategory);
  } catch (error) {
    NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, context) {
  dbConnect;
  try {
    const deletingCategory = await Category.findByIdAndDelete(
      context.params.id
    );
    return NextResponse.json(deletingCategory);
  } catch (error) {
    return NextResponse.json(error.message, { statusz: 500 });
  }
}
