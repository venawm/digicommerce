import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function PUT(req, context) {
  dbConnect();
  const body = await req.json();
  const { name } = body;
  try {
    const updatingTag = await Tag.findByIdAndUpdate(
      context.params.id,
      { ...body, slug: slugify(name) },
      { new: true }
    );
    return NextResponse.json(updatingTag);
  } catch (error) {
    console.log(error);
    NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, context) {
  dbConnect;
  try {
    const deletingTag = await Tag.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletingTag);
  } catch (error) {
    return NextResponse.json(error.message, { statusz: 500 });
  }
}
