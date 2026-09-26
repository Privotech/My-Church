import { NextRequest, NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import { createCloudinaryUploadSignature, isCloudinaryConfigured } from '@/lib/media-storage';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  let originHost = '';
  try { originHost = origin ? new URL(origin).host : ''; } catch { /* Reject malformed origins below. */ }
  if (!originHost || !host || originHost !== host) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Sign in to upload images.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    return NextResponse.json(createCloudinaryUploadSignature(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Admin] Could not sign Cloudinary upload:', error);
    return NextResponse.json({ error: 'Could not prepare the image upload.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
