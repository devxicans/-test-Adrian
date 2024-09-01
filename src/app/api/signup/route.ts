import { NextResponse } from "next/server";
import user from "@/lib/schema/usersSchema";
import connectDB from "@/lib/db/mongoDB";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectDB();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'You should fill every field of the form' }, { status: 400 })
  }

   await user.create({
    name,
    email,
    password
  })

  return NextResponse.json({
    name,
    email,
    password
  })
}