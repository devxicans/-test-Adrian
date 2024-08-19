import { mailOptions, transport } from "@/app/utils/mail.utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await transport.sendMail({
      ...mailOptions,
      subject: "We recieved your mail"
    })
    return NextResponse.json({message: "Email Sent Successfully"}, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Bad Request"}, {status: 500});
  }
}