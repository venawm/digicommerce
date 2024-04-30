import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parse(req.url);
  const page = searchParams["http://localhost:3000/api/product?page"];
  console.log(page);
  const pageSize = 10;

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalProducts = await Product.countDocuments({});

    const products = await Product.find({ bid: true })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      products,
      currentPage,
      totalProducts: Math.ceil(totalProducts / pageSize),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
