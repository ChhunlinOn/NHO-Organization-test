import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET!;

function verifyToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; role: string };
  } catch {
    return null;
  }
}

// FIX: Add proper type for params and await it
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // FIX: Await the params first
    const { id } = await params;
    
    const payload = verifyToken(request);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teamMember = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const payload = verifyToken(request);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (payload.role !== "admin" && payload.role !== "editor") {
      return NextResponse.json({ error: "Forbidden: only admins or editors can update team members" }, { status: 403 });
    }

    const body = await request.json();
    const { name, role, description, image, imagePublicId, isFounder, displayOrder, isActive } = body;

    const existingMember = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });

    if (!existingMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: { 
        name, 
        role, 
        description, 
        image, 
        imagePublicId, 
        isFounder, 
        displayOrder,
        isActive 
      },
    });

    return NextResponse.json({
      success: true,
      teamMember: updatedTeamMember
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const payload = verifyToken(request);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (payload.role !== "admin" && payload.role !== "editor") {
      return NextResponse.json({ error: "Forbidden: only admins or editors can delete team members" }, { status: 403 });
    }

    const teamMember = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    if (teamMember.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(teamMember.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await prisma.teamMember.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}