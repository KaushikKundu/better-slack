
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { content, room, userId } = await req.json();

    if (!content || !userId || !room) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: { title:content, roomId:room, userId },
      include: { author: true }, 
    });

    return NextResponse.json(message, { status: 201 });
  } catch (err) {
    console.error("Message save error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
