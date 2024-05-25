import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req) {
  await dbConnect();

  try {
    const products = await Product.find({}, "title stock sold").sort({
      createdAt: -1,
    });

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
