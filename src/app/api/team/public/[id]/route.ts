import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const teamMember = await prisma.teamMember.findUnique({
      where: { 
        id: Number(id),
        isActive: true 
      },
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

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}