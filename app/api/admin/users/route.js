import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({}).sort({ createdAt: -1 }); // Sort users by createdAt if needed
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
