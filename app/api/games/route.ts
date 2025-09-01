import { NextResponse } from 'next/server'
import gamesData from '@/data/games.json'

export async function GET() {
  try {
    // Return active games only
    const activeGames = gamesData.filter((game: any) => game.isActive)
    return NextResponse.json(activeGames)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json([], { status: 200 })
  }
}