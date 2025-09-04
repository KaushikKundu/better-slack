import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("auth-token")?.value;
  
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name: string;
    };
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
