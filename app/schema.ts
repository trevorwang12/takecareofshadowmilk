import { siteConfig } from "@/config/site";

export const generateGameSchema = (game: {
  title: string;
  description: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "playMode": "SinglePlayer",
    "applicationCategory": "PetGame",
    "genre": ["Virtual Pet", "Simulation", "Casual"],
    "gamePlatform": ["Web Browser", "Mobile", "Tablet"],
    "url": `${siteConfig.url}${game.url}`,
    "inLanguage": "en",
    "keywords": "take care of shadow milk, shadow milk game, virtual pet game, cookie run kingdom, pet simulator",
    "audience": {
      "@type": "Audience",
      "audienceType": "General Public"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "GPE_sb3"
    }
  };
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Take Care of Shadow Milk - Ultimate Virtual Pet Simulator",
  "alternateName": "Shadow Milk Game",
  "description": siteConfig.description,
  "url": siteConfig.url,
  "keywords": "take care of shadow milk, shadow milk game, virtual pet game, cookie run kingdom, shadow milk cookie, pet simulator",
  "inLanguage": "en",
  "about": {
    "@type": "Thing",
    "name": "Virtual Pet Games",
    "description": "Interactive online virtual pet simulation and care games"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url
  }
};

import { content } from "@/config/content";

export const howToPlaySchema = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  "name": content.howToPlay.title,
  "url": siteConfig.url,
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": content.howToPlay.image
  },
  "step": [{
    "@type": "HowToStep",
    "position": "1",
    "name": content.howToPlay.title,
    "text": content.howToPlay.description,
    "image": content.howToPlay.image
  }]
};

export const generateRatingSchema = (rating: number, votes: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Take Care of Shadow Milk",
    "alternateName": "Shadow Milk Virtual Pet Game",
    "applicationCategory": "GameApplication",
    "applicationSubCategory": "Virtual Pet Game",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5 compatible browser",
    "keywords": "take care of shadow milk, shadow milk game, virtual pet game, cookie run kingdom, pet simulator",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": votes,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Free virtual pet care game",
      "Drag and drop interactions", 
      "Multiple room environments",
      "Mobile compatible",
      "No download required",
      "Shadow Milk Cookie character"
    ]
  };
};

// 专门为Take Care of Shadow Milk主页设计的schema
export const incrediboxVitalsMainSchema = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Take Care of Shadow Milk",
  "description": "Play Take Care of Shadow Milk - the ultimate virtual pet simulator featuring Shadow Milk Cookie from Cookie Run: Kingdom. Feed, care for, or playfully prank your virtual companion with complete creative freedom.",
  "genre": "Virtual Pet Game",
  "playMode": "SinglePlayer",
  "gamePlatform": ["Web Browser", "Mobile", "Tablet"],
  "url": siteConfig.url,
  "inLanguage": "en",
  "keywords": "take care of shadow milk, shadow milk game, virtual pet game, cookie run kingdom, shadow milk cookie, pet simulator",
  "applicationCategory": "Pet Game",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "GPE_sb3"
  },
  "mainEntity": {
    "@type": "WebApplication",
    "name": "Take Care of Shadow Milk Online Game",
    "applicationCategory": "Pet Game"
  }
};



