import { NextRequest } from 'next/server';
import { relayAuth } from '@/lib/auth-relay';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  return relayAuth(req, 'reset-password');
}
