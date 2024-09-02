import { NextResponse } from "next/server";
import user from "@/lib/schema/usersSchema";
import connectDB from "@/lib/db/mongoDB";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectDB();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'You should fill every field of the form' }, { status: 400 })
  }

  const checkIfEmailExist = await user.findOne({email})

  if (checkIfEmailExist) {
    return NextResponse.json({ error: 'You should enter a different email' }, { status: 400 })
  }

   const newUser = await user.create({
    name,
    email,
    password
  })

  return NextResponse.json({
    _id: newUser.id
  }, {status: 201})
}