import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all public news (no authentication required)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalCount = await prisma.news.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated news
    const news = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
      skip: skip,
      take: limit,
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

    return NextResponse.json({
      news,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}