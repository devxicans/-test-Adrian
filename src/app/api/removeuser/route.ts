import { deleteSession } from "@/lib";

export function GET(req: Request) {
 return deleteSession();
}