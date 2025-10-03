import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const all = searchParams.get('all');

  if (all === 'true') {
    const shortVideos = await prisma.shortVideos.findMany({
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({
      shortVideos,
      totalItems: shortVideos.length
    });
  }

  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '6');
  const skip = (pageNum - 1) * limitNum;

  const totalCount = await prisma.shortVideos.count();
  const totalPages = Math.ceil(totalCount / limitNum);

  const shortVideos = await prisma.shortVideos.findMany({
    orderBy: { created_at: 'desc' },
    skip: skip,
    take: limitNum,
  });

  return NextResponse.json({
    shortVideos,
    pagination: {
      currentPage: pageNum,
      totalPages: totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNum,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    }
  });
}

