import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

export async function GET(req) {
  await dbConnect();
  const user = await currentUser();
  try {
    const likedProducts = await Product.find({ likes: user._id });
    return NextResponse.json(likedProducts);
  } catch (error) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const user = await currentUser();

  const { productId } = await req.json();

  try {
    const updated = await Product.findByIdAndUpdate(
      productId,
      {
        $addToSet: { likes: user._id },
      },
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
