export interface SiteConfig {
  siteName: string
  description: string
  url: string
  logo: string
  favicon: string
  theme: {
    primaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
  }
  features: {
    search: boolean
    categories: boolean
    userAccounts: boolean
    favorites: boolean
    comments: boolean
    ratings: boolean
  }
  seo: {
    keywords: string[]
    author: string
    twitterHandle?: string
    ogImage: string
  }
  analytics: {
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
  ads: {
    enabled: boolean
    googleAdsenseId?: string
    adPositions: string[]
  }
  social: {
    twitter?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export const siteConfig: SiteConfig = {
  siteName: "GAMES",
  description: "Best Online Gaming Platform - Play hundreds of free browser games",
  url: "https://yourgamesite.com",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  
  theme: {
    primaryColor: "#475569", // slate-600
    accentColor: "#f97316",  // orange-500
    backgroundColor: "#f8fafc", // slate-50
    textColor: "#1e293b"     // slate-800
  },
  
  features: {
    search: true,
    categories: true,
    userAccounts: false,
    favorites: true,
    comments: false,
    ratings: true
  },
  
  seo: {
    keywords: [
      "online games",
      "browser games", 
      "free games",
      "HTML5 games",
      "web games",
      "casual games",
      "arcade games"
    ],
    author: "Gaming Platform",
    twitterHandle: "@yourgames",
    ogImage: "/og-image.png"
  },
  
  analytics: {
    googleAnalyticsId: "GA_MEASUREMENT_ID",
    // facebookPixelId: "FB_PIXEL_ID"
  },
  
  ads: {
    enabled: false,
    // googleAdsenseId: "ca-pub-XXXXXXXXXXXXXXXX",
    adPositions: ["header", "sidebar", "between-games"]
  },
  
  social: {
    twitter: "https://twitter.com/yourgames",
    facebook: "https://facebook.com/yourgames",
    // instagram: "https://instagram.com/yourgames",
    // youtube: "https://youtube.com/yourgames"
  }
}