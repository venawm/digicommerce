import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export async function GET() {
  try {
    await dbConnect();

    // Query to get all orders where `refunded` is false
    const orders = await Order.find({ refunded: false });

    // Sum the amount_captured for these orders
    const totalAmount = orders.reduce(
      (sum, order) => sum + order.amount_captured,
      0
    );
    const total = totalAmount / 100;
    return NextResponse.json({ total });
  } catch (error) {
    console.error("Error calculating total amount:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
