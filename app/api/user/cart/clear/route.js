import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import dbConnect from "@/utils/dbConnect";

export async function DELETE(req) {
  await dbConnect();
  const { userId } = await req.json();
  try {
    const cartItem = await Cart.deleteMany({ userId: userId });
    return NextResponse.json({ cartItem });
  } catch (error) {
    return NextResponse.error({ error: error.message }, { status: 500 });
  }
}
