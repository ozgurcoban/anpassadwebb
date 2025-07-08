import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const views = await redis.get<number>(`post:${slug}:views`) || 0;
    
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Skip tracking in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({ views: 0, message: 'View tracking disabled in development' });
  }

  try {
    const { slug } = await params;
    const key = `post:${slug}:views`;
    
    // Increment view count
    const views = await redis.incr(key);
    
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}