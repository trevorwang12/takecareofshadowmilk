import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Public API to get homepage content (no admin restrictions)
// 公共API获取首页内容（无管理员限制）

interface CustomHtmlSection {
  id: string
  title: string
  content: string
  isVisible: boolean
}

interface HomepageContent {
  hero: {
    isVisible: boolean
    title: string
    subtitle: string
    backgroundGradient: string
  }
  featuredGame: {
    isVisible: boolean
    showPlayButton: boolean
  }
  newGames: {
    isVisible: boolean
    title: string
    limit: number
    showViewAllButton: boolean
  }
  features: {
    isVisible: boolean
    title: string
    sections: {
      instantPlay: { isVisible: boolean, title: string, description: string }
      freeGames: { isVisible: boolean, title: string, description: string }
      highQuality: { isVisible: boolean, title: string, description: string }
      multipleCategories: { isVisible: boolean, title: string, description: string }
    }
  }
  whatIs: {
    isVisible: boolean
    title: string
    content: {
      mainText: string
      statsText: string
      gamesCount: string
      playersCount: string
    }
  }
  howToPlay: {
    isVisible: boolean
    title: string
    steps: {
      step1: { title: string, description: string }
      step2: { title: string, description: string }
      step3: { title: string, description: string }
    }
  }
  whyChooseUs: {
    isVisible: boolean
    title: string
    premiumSection: {
      title: string
      features: string[]
    }
    communitySection: {
      title: string
      features: string[]
    }
  }
  faq: {
    isVisible: boolean
    title: string
    questions: {
      question: string
      answer: string
    }[]
  }
  youMightAlsoLike: {
    isVisible: boolean
  }
  customHtmlSections: CustomHtmlSection[]
  sectionOrder: { [key: string]: number }
}

function getDefaultContent(): HomepageContent {
  return {
    hero: {
      isVisible: false,
      title: "GAMES",
      subtitle: "Best Online Gaming Platform",
      backgroundGradient: "from-blue-500 to-purple-600"
    },
    featuredGame: {
      isVisible: true,
      showPlayButton: true
    },
    newGames: {
      isVisible: true,
      title: "New Games",
      limit: 8,
      showViewAllButton: true
    },
    features: {
      isVisible: false,
      title: "Why Play With Us",
      sections: {
        instantPlay: {
          isVisible: true,
          title: "Instant Play",
          description: "No downloads required. Play games directly in your browser."
        },
        freeGames: {
          isVisible: true,
          title: "Free Games",
          description: "100% free to play. No hidden fees or subscriptions."
        },
        highQuality: {
          isVisible: true,
          title: "High Quality",
          description: "Carefully curated games with excellent ratings and reviews."
        },
        multipleCategories: {
          isVisible: true,
          title: "Multiple Categories",
          description: "Action, puzzle, strategy, casual - something for everyone."
        }
      }
    },
    whatIs: {
      isVisible: false,
      title: "What is Our Gaming Platform?",
      content: {
        mainText: "Our platform is a comprehensive online gaming destination.",
        statsText: "From classic arcade games to modern indie creations.",
        gamesCount: "500+",
        playersCount: "1M+"
      }
    },
    howToPlay: {
      isVisible: false,
      title: "How to Get Started",
      steps: {
        step1: {
          title: "Browse Games",
          description: "Explore our collection of games by category."
        },
        step2: {
          title: "Click & Play",
          description: "Simply click on any game to start playing instantly."
        },
        step3: {
          title: "Enjoy Gaming",
          description: "Have fun playing your favorite games."
        }
      }
    },
    whyChooseUs: {
      isVisible: false,
      title: "Why Choose Our Platform?",
      premiumSection: {
        title: "Premium Gaming Experience",
        features: []
      },
      communitySection: {
        title: "Community & Safety",
        features: []
      }
    },
    faq: {
      isVisible: false,
      title: "Frequently Asked Questions",
      questions: []
    },
    youMightAlsoLike: {
      isVisible: true
    },
    customHtmlSections: [],
    sectionOrder: {
      featuredGame: 0,
      newGames: 1,
      features: 2,
      whatIs: 3,
      howToPlay: 4,
      whyChooseUs: 5,
      faq: 6,
      youMightAlsoLike: 7
    }
  }
}

async function loadFromFile(): Promise<HomepageContent> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'homepage-content.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const loadedData = JSON.parse(fileContent)
    console.log('Homepage data loaded from file:', filePath)
    return loadedData
  } catch (error) {
    console.log('Failed to load homepage data from file, using default:', error)
    return getDefaultContent()
  }
}

export async function GET() {
  try {
    const homepageContent = await loadFromFile()
    return NextResponse.json(homepageContent)
  } catch (error) {
    console.error('GET homepage error:', error)
    return NextResponse.json(getDefaultContent(), { status: 200 })
  }
}