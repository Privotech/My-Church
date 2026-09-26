import { NextRequest, NextResponse } from 'next/server';
import { getGalleryImages } from '@/lib/data-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const featuredOnly = searchParams.get('featured') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

  try {
    const images = await getGalleryImages({
      category,
      search,
      featuredOnly,
      limit,
    });

    return NextResponse.json({
      success: true,
      images,
      count: images.length,
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load gallery images' },
      { status: 500 }
    );
  }
}
