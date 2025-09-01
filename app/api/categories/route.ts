import { NextResponse } from 'next/server'
import { dataManager } from '@/lib/data-manager'

export async function GET() {
  try {
    const categories = dataManager.getAllCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json([], { status: 200 })
  }
}