const { default: dbConnect } = require("@/utils/dbConnect");
import { NextResponse } from "next/server";
import Product from "@/models/product";

async function UPDATE(req) {
  await dbConnect();
  const body = await req.json;
  NextResponse.json({ message: "hee" });
}
