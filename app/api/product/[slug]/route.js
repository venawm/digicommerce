import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req, context) {
  await dbConnect();

  try {
    const product = await Product.findOne({ slug: context.params.slug });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}