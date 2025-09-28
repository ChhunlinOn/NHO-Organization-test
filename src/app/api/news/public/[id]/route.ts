import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single public news by ID (no authentication required)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        image: true,
        title: true,
        text: true,
        date: true,
        category: true,
        excerpt: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}