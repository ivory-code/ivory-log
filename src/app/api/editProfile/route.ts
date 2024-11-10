// app/api/editProfile/route.ts
import {NextResponse} from 'next/server'

import {mockProfiles} from '@/shared/mock/mockData'

export async function GET() {
  return NextResponse.json({profileData: mockProfiles})
}
