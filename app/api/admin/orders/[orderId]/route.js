import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export async function PUT(req, context) {
  await dbConnect();
  const { delivery_status } = await req.json();

  try {
    const order = await Order.findByIdAndUpdate(
      context.params.orderId,
      {
        delivery_status,
      },
      { new: true }
    );

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
