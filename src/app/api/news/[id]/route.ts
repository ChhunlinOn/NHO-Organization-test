import { NextResponse } from "next/server";
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

// Update the params type to use Promise
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const news = await prisma.news.findUnique({
    where: { id: Number(resolvedParams.id) },
  });

  if (!news) {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }

  return NextResponse.json(news);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can update news articles" }, { status: 403 });
  }

  const { image, title, text, date, category, excerpt } = await req.json();

  const updatedNews = await prisma.news.update({
    where: { id: Number(resolvedParams.id) },
    data: { image, title, text, date, category, excerpt },
  });

  return NextResponse.json(updatedNews);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can delete news articles" }, { status: 403 });
  }

  try {
    // First get the news to access imagePublicId
    const news = await prisma.news.findUnique({
      where: { id: Number(resolvedParams.id) },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if publicId exists
    if (news.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(news.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
        // Continue with database deletion even if image deletion fails
      }
    }

    // Delete from database
    await prisma.news.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}