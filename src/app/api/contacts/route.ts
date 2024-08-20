import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, message } = await req.json();


  if (!name || !email || !message) {
    return NextResponse.json({ error: 'You should fill every field of the form' }, { status: 400 })
  }

  return NextResponse.json({
    name,
    email,
    message
  }, { status : 200 })
}