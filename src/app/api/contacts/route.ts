import { NextResponse } from "next/server"
import { transport } from "@/app/utils/mail.utils";


export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'You should fill every field of the form' }, { status: 400 })
  }

  const mailOptions =  {
    from: "adrife2000@gmail.com",
    to: email,
  }

  try {
    await transport.sendMail({
      ...mailOptions,
      subject: "We recieve your email",
    })

    return NextResponse.json({
    name,
    email,
    message
  }, { status : 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Bad Request"}, {status: 500});
  }
}