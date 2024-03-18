import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import dbConnect from "@/utils/dbConnect";
import { parse } from "url";

export async function POST(req) {
  dbConnect();
  const { product, quantity, userId } = await req.json();
  try {
    const cartItem = await Cart.create({
      product,
      quantity,
      userId,
    });
    return NextResponse.json({ cartItem });
  } catch (error) {
    return NextResponse.error({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const { query } = parse(req.url, true);
  const userId = query.userId;

  if (!userId) {
    return NextResponse.error({ error: "userId is missing" }, { status: 400 });
  }

  try {
    const data = await Cart.find({ userId: userId }).populate("product");
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.error({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  dbConnect();
  const { quantity, productId } = await req.json();
  try {
    const cartItem = await Cart.updateOne(
      { product: productId },
      { $set: { quantity: quantity } }
    );
    return NextResponse.json({ cartItem });
  } catch (error) {
    return NextResponse.error({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  dbConnect();
  const { productId } = await req.json();
  try {
    const cartItem = await Cart.deleteOne({ product: productId });
    return NextResponse.json({ cartItem });
  } catch (error) {
    return NextResponse.error({ error: error.message }, { status: 500 });
  }
}
