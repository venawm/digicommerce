import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import Verification from "@/models/verification";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

    const randToken = crypto.randomBytes(36).toString("hex");
    const verify = await Verification.create({
      userId: user._id,
      token: await bcrypt.hash(randToken, 10),
    });
    const tokenLink = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Token</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333;">Verify Your Account</h1>
        <p style="color: #666666;">Click the button below to verify your account:</p>
        <a href="http://localhost:3000/api/verify/${randToken}/${user._id}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Account</a>
      </div>
    </body>
    </html>
    `;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    try {
      const testResult = await transport.verify();
      console.log(testResult);
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      const sendResult = await transport.sendMail({
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Verify your Digicommerce Account",
        html: tokenLink,
      });
    } catch (error) {}

    return NextResponse.json({ sucess: "Registered Sucessfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
