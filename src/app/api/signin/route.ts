import { NextResponse } from "next/server";
import user from "@/lib/schema/usersSchema";
import connectDB from "@/lib/db/mongoDB";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB()

  if (!email || !password) {
    return NextResponse.json({ error: 'You should fill every field of the form' }, { status: 400 })
  }

  const userExist = await user.findOne({ email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    return NextResponse.json({
      _id : userExist.id
    }, { status: 200 })
  } else {
    return NextResponse.json({ message: 'There is no user that exist in our database with that email' }, { status: 401 })
  }
}