import { NextResponse } from "next/server";
import Product from "@/models/product";
import dbConnect from "@/utils/dbConnect";
import queryString from "query-string";

export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { productId, bid, userId } = body;

    // Fetch the product from the database
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.error(
        { message: "Product not found" },
        { status: 500 }
      );
    }

    // Check if the bid is greater than the current maximum bid
    const maxBid = Math.max(...product.bids.map((bid) => bid.amount));

    if (bid <= maxBid) {
      return NextResponse.error(
        { message: "Bid amount must be greater than the current maximum bid" },
        { status: 500 }
      );
    }

    // Create a new bid object
    const newBid = {
      userId: userId,
      amount: bid,
      createdAt: new Date(),
    };

    // Add the new bid to the bids array
    product.bids.push(newBid);

    // Save the updated product
    await product.save();

    return NextResponse.json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  await dbConnect();

  // Parse the id from the request URL
  const searchParams = queryString.parse(req.url);
  const id = searchParams["http://localhost:3000/api/product/auctions/bid?id"];

  try {
    // Find the product with the matching _id in the database and populate the bids with usernames
    const product = await Product.findById(id).populate({
      path: "bids",
      populate: {
        path: "userId",
        model: "User",
        select: "name", // Assuming name is a field in the User model
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Return the populated bids array
    return NextResponse.json({ bids: product.bids });
  } catch (error) {
    console.error("Error retrieving bids:", error);
    return NextResponse.json(
      { message: "Error retrieving bids" },
      { status: 500 }
    );
  }
}
