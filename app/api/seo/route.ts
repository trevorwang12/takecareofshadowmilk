import { NextResponse } from 'next/server'
import { loadFromFile } from '@/lib/file-manager'
import { DEFAULT_SEO } from '@/lib/seo-manager'

export async function GET() {
  try {
    const seoData = await loadFromFile('seo.json')
    return NextResponse.json(seoData)
  } catch (error) {
    console.error('Error fetching SEO data:', error)
    return NextResponse.json(DEFAULT_SEO, { status: 200 })
  }
}