import { deleteSession } from "@/lib";
import { NextResponse } from "next/server";

export function GET(req: Request) {
  deleteSession();
  return NextResponse.json({msg: "Nice!!"},{status: 307})
}