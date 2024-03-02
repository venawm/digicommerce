import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
// import Order from "@models/order";
import { currentUser } from "@/utils/currentUser";

export async function POST(req) {
  await dbConnect();
  const user = await currentUser();
  const { productId, rating, comment } = await req.json();
  try {
    const product = await Product.findById(productId);
    console.log(product);
    // Chech if user has purchased the product

    // check if rating already exists
    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === user._id.toString()
    );
    if (existingRating) {
      // update the rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await product.save();

      return NextResponse.json(existingRating);
    }
    // new rating

    product.ratings.push({
      rating,
      comment,
      postedBy: user._id,
    });
    const updated = await product.save();
    return NextResponse.json(updated);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server error please try again" },
      { status: 500 }
    );
  }
}
