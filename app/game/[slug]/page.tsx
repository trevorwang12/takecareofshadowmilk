"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Play, Users, Tag, Calendar, Gamepad2 } from "lucide-react"
import { dataManager } from "@/lib/data-manager"
import GamePlayer from "@/components/GamePlayer"
import AdSlot from "@/components/AdSlot"
import YouMightAlsoLike from "@/components/YouMightAlsoLike"
import Header from "@/components/Header"
import Footer from "@/components/Footer"


interface PageProps {
  params: { slug: string }
}

export default function GamePage({ params }: PageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [relatedGames, setRelatedGames] = useState<any[]>([])
  const [game, setGame] = useState<any>(null)
  const [gameLoading, setGameLoading] = useState(false)
  const [loadingTipIndex, setLoadingTipIndex] = useState(0)
  
  const loadingTips = [
    "💡 Pro tip: Use arrow keys or WASD for better control!",
    "🎮 Did you know? This game supports multiple control schemes!",
    "⚡ Loading awesome graphics and smooth gameplay...",
    "🌟 Get ready for an epic gaming adventure!",
    "🎯 Tip: Check your internet connection for best experience!",
    "🚀 Preparing the ultimate gaming experience for you..."
  ]
  
  const hotGames = dataManager.getHotGames(8)
  
  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameData = await dataManager.getGameById(params.slug)
        setGame(gameData)
        
        if (gameData) {
          // 更新访问量
          dataManager.updateGameViews(params.slug)
          
          // 获取相关游戏
          const related = await dataManager.getRelatedGames(params.slug, 6)
          setRelatedGames(related)
        }
      } catch (error) {
        console.error('Error loading game:', error)
      }
    }
    
    loadGame()
  }, [params.slug])
  
  // Cycle through loading tips
  useEffect(() => {
    if (gameLoading) {
      const interval = setInterval(() => {
        setLoadingTipIndex(prev => (prev + 1) % loadingTips.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [gameLoading, loadingTips.length])


  if (!game) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
            <p className="text-gray-600 mb-4">Sorry, we couldn't find the game you're looking for.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const startGame = async () => {
    setGameLoading(true)
    dataManager.updateGamePlays(params.slug)
    
    // Simulate game loading time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setGameLoading(false)
    setIsPlaying(true)
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Ad Slot - Header Position */}
      <AdSlot position="header" className="max-w-7xl mx-auto px-4 py-2" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Game Player */}
            <div className="mb-8">
              {isPlaying && game.gameUrl ? (
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-auto">
                  <GamePlayer 
                    gameUrl={game.gameUrl}
                    gameName={game.name}
                    gameId={game.id}
                    allowFullscreen={true}
                    showControls={true}
                  />
                </div>
              ) : gameLoading ? (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg text-white h-[600px] flex items-center justify-center relative overflow-hidden">
                  {/* Floating Background Elements */}
                  <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full opacity-30 animate-bounce"></div>
                  <div className="absolute top-32 right-20 w-24 h-24 bg-white/20 rounded-full opacity-40 animate-pulse"></div>
                  <div className="absolute bottom-20 left-32 w-28 h-28 bg-white/15 rounded-full opacity-30 animate-ping"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Main Loading Animation */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto relative">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        
                        {/* Inner pulsing circle */}
                        <div className="absolute inset-3 bg-white/20 rounded-full animate-pulse flex items-center justify-center">
                          <Gamepad2 className="w-8 h-8 text-white animate-bounce" />
                        </div>
                      </div>
                      
                      {/* Loading dots */}
                      <div className="flex justify-center mt-6 space-x-1">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                    
                    {/* Dynamic Loading Text */}
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold animate-pulse">
                        Loading {game.name}...
                      </h1>
                      <p className="text-white/90 text-lg animate-pulse">
                        Preparing your gaming experience!
                      </p>
                      
                      {/* Progress bar */}
                      <div className="w-80 mx-auto bg-white/20 rounded-full h-3 mt-6">
                        <div className="bg-white h-3 rounded-full animate-pulse w-full"></div>
                      </div>
                      
                      {/* Dynamic loading tips */}
                      <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm max-w-md mx-auto">
                        <p className="text-white font-medium text-lg animate-pulse">
                          {loadingTips[loadingTipIndex]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg text-white h-[600px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={game.thumbnailUrl || "/placeholder.svg"} 
                      alt={`${game.name} - Play this exciting game online for free`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-4xl font-bold mb-4 max-w-md">{game.name}</h1>
                  <p className="mb-8 opacity-90 text-lg max-w-lg px-4">
                    {game.gradientDescription || (game.description.length > 100 
                      ? game.description.substring(0, 100) + '...' 
                      : game.description)}
                  </p>
                  <Button
                    onClick={startGame}
                    className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    PLAY NOW
                  </Button>
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Game Details</h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">About This Game</h3>
                    <div className="text-gray-700 mb-6 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-800 prose-strong:text-gray-900">
                      <ReactMarkdown>{game.description}</ReactMarkdown>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Game Features</h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {game.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="justify-center py-2">
                          {feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Game Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">Rating: {game.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="font-medium">Category: {game.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Plays: {dataManager.formatPlayCount(game.playCount)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4" />
                        <span className="font-medium">Views: {dataManager.formatPlayCount(game.viewCount)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Released: {game.releaseDate}</span>
                      </div>
                      <div>
                        <span className="font-medium">Developer: {game.developer || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Slot - Game Details Bottom Position */}
            <AdSlot position="game-details-bottom" className="mb-8" />

            {/* Controls & Platform */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How to Play</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gamepad2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Controls</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {game.controls.map((control, index) => (
                        <Badge key={index} variant="secondary">
                          {control}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Platforms</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {game.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Games</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {relatedGames.map((relatedGame) => (
                    <Link key={relatedGame.id} href={`/game/${relatedGame.id}`} className="group">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                        <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedGame.thumbnailUrl || "/placeholder.svg"} 
                            alt={`${relatedGame.name} - Similar game you might enjoy`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="p-3 flex-grow flex items-start">
                          <h3 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight">{relatedGame.name}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Hot Games */}
          <div className="w-80 hidden lg:block">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Hot games 热门游戏</h3>
              <div className="grid grid-cols-2 gap-3">
                {hotGames.map((hotGame, index) => (
                  <Link key={index} href={`/game/${hotGame.id}`} className="group">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative flex-shrink-0">
                        <img 
                          src={hotGame.thumbnailUrl || "/placeholder.svg"} 
                          alt={`${hotGame.name} - Popular online game`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-1 right-1">
                          <Badge className="bg-orange-500 text-white text-xs px-1 py-0.5">
                            ⭐{hotGame.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-2 flex-grow flex items-start">
                        <h3 className="font-medium text-xs text-gray-800 line-clamp-2 leading-tight">{hotGame.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Ad Slot - Sidebar Position */}
            <AdSlot position="sidebar" className="mt-6" />
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <YouMightAlsoLike />

      {/* Footer */}
      <Footer />
    </div>
  )
}