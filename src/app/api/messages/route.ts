import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { content, room, userId } = await req.json();

        if (!content || !userId || !room) {
            return NextResponse.json(
                { error: [content,room,userId] },
                { status: 400 }
            );
        }

        const message = await prisma.message.create({
            data: { title: content, roomId: room, userId },
            include: { author: true },
        });

        return Response.json({
            userId: message.userId,
            username: message.author.name,
            content: message.title, 
            createdAt: message.createdAt,
        });
    } catch (err) {
        console.error("Message save error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
// /api/messages?roomId=123 (GET)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const messages = await prisma.message.findMany({
    where: { roomId: roomId || undefined },
    include: { author: true },
    orderBy: { createdAt: "asc" },
  });

  const formatted = messages.map((m) => ({
    userId: m.userId,
    username: m.author.name,
    content: m.title, 
    createdAt: m.createdAt,
  }));

  return Response.json(formatted);
}
