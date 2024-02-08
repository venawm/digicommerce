import { NextResponse } from "next/server";
import Verification from "@/models/verification";
import bcrypt from "bcrypt";
import User from "@/models/user";

export async function GET(req, context) {
  try {
    const id = context.params;
    console.log(id);
    const verification = await Verification.findOne({ userId: id.slug[1] });
    const verified = await bcrypt.compare(id.slug[0], verification.token);
    if (!verified) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 500 });
    }
    const user = await User.updateOne(
      { _id: id.slug[1] },
      { $set: { verified: true } }
    );

    await Verification.deleteOne({ userId: id.slug[1] });
    return NextResponse.json({ message: "Verification Sucessful" });

    // console.log(user);

    // Return a response
  } catch (error) {
    console.log(error);
  }
}
