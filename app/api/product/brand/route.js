// api/product/brands/route
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

// Import NextResponse from the correct path based on your project structure
// Adjust the import statement accordingly.
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const brands = await Product.distinct("brand");
    console.log(brands);
    return NextResponse.json(brands);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
