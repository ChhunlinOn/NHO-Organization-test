import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all public team members (no authentication required)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalCount = await prisma.teamMember.count({
      where: { isActive: true }
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated team members
    const team = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [
        { isFounder: 'desc' },
        { displayOrder: 'asc' },
        { created_at: 'desc' }
      ],
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        role: true,
        description: true,
        image: true,
        isFounder: true,
        displayOrder: true,
        created_at: true,
        updated_at: true
      }
    });

    return NextResponse.json({
      team,
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
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}