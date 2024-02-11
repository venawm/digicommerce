import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const product = await Product.create({
      ...body,
      slug: slugify(body.title),
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
