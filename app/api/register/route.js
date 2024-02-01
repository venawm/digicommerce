import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();
  const { name, email, password, number } = await req.json();

  try {
    const user = await new User({
      name: name,
      email: email,
      number: number,
      password: await bcrypt.hash(password, 10),
    }).save();
    return NextResponse.json({ sucess: "Registered Sucessfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
