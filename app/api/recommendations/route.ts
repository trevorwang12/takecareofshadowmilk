import { NextResponse } from 'next/server'
import { loadFromFile } from '@/lib/file-manager'

export async function GET() {
  try {
    const recommendations = await loadFromFile('recommendations.json')
    return NextResponse.json(recommendations?.games || [])
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json([], { status: 200 })
  }
}