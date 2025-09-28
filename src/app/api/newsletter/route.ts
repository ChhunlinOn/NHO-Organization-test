import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Token verification function
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; role: string };
  } catch {
    return null;
  }
}

// GET all subscribers (protected - admin/editor only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const payload = verifyToken(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has admin or editor role
    if (payload.role !== 'admin' && payload.role !== 'editor') {
      return NextResponse.json(
        { success: false, error: 'Access denied. Admin or editor role required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const [subscribers, totalCount] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
        orderBy: { created_at: 'desc' }, // Fixed: changed from createdAt to created_at
        skip,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({
        where: { isActive: true }
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      subscribers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// POST new subscriber (public - no authentication required)
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if email already exists and is active
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { success: false, error: 'This email is already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate previously unsubscribed email
        const reactivatedSubscriber = await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true }
        });

        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
          subscriber: reactivatedSubscriber
        });
      }
    }

    // Create new subscriber
    const newSubscriber = await prisma.newsletterSubscriber.create({
      data: { email }
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscriber: newSubscriber
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}