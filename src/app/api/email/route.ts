import { NextResponse } from "next/server";
import { transport } from "@/app/utils/mail.utils";

export async function POST(req: Request) {
  const { email } = await req.json();

  const mailOptions =  {
    from: "adrife2000@gmail.com",
    to: email,
  }

  try {
    await transport.sendMail({
      ...mailOptions,
      subject: "We recieve your email",
    })
    return NextResponse.json({message: "Email Sent Successfully"}, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Bad Request"}, {status: 500});
  }
}