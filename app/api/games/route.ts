import { NextResponse } from 'next/server'
import { dataManager } from '@/lib/data-manager'

export async function GET() {
  try {
    const games = dataManager.getAllGames()
    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json([], { status: 200 })
  }
}