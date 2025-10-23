import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

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

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        photos: {
          take: 1,
          select: { imageUrl: true }
        },
        _count: {
          select: { photos: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(albums);
  } catch (error: unknown) {
    console.error('Get albums error:', error);
    
    const maybePrismaError = error as { code?: string };
    if (maybePrismaError.code === 'P2021') {
      return NextResponse.json(
        { error: "Database table not found. Please run database setup." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { title, description, category } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const album = await prisma.album.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        category: category?.trim() || null,
        createdBy: payload.id,
      },
    });
    
    return NextResponse.json(album, { status: 201 });
  } catch (error: unknown) {
    console.error('Create album error:', error);
    
    const maybePrismaError = error as { code?: string };
    if (maybePrismaError.code) {
      const errorCode = maybePrismaError.code;
      
      if (errorCode === 'P2021') {
        return NextResponse.json(
          { error: "Database table not found. Please run database setup." },
          { status: 500 }
        );
      }
      
      if (errorCode === 'P2002') {
        return NextResponse.json(
          { error: "Album with this title already exists" },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}