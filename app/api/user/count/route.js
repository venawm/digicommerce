import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export async function GET() {
  try {
    await dbConnect();

    // Count users with the role 'user'
    const userCount = await User.countDocuments({ role: "user" });

    return NextResponse.json({ totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
