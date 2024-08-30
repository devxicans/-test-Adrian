import { NextRequest, NextResponse } from "next/server"
import { transport } from "@/app/utils/mail.utils";
import connectDB from "@/lib/db/mongoDB";
import contact from "@/lib/schema/contactsSchema";

export async function GET() {
  try {
    await connectDB();
    const contacts = await contact.find();
    return NextResponse.json({ contacts }, { status: 200 })
  }  catch (error) {
    console.log(error);
    return NextResponse.json({message: "Bad Request"}, {status: 500});
  }
}


export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await connectDB();

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

    await contact.create({
      name,
      email,
      message
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