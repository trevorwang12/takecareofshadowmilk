'use client';

import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import { GameSection } from "@/components/game-section/GameSection";
import { getOtherGames } from "@/app/games/game-data";
import { generateGameSchema } from "@/app/schema";

// 懒加载非关键组件以提高性能
const Features = dynamic(() => import("@/components/features/Features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg"></div>
});

const WhatIs = dynamic(() => import("@/components/what-is/WhatIs").then(mod => ({ default: mod.WhatIs })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg"></div>
});

const HowToPlay = dynamic(() => import("@/components/how-to-play/HowToPlay").then(mod => ({ default: mod.HowToPlay })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg"></div>
});

const FAQ = dynamic(() => import("@/components/faq/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded-lg"></div>
});

const OtherGames = dynamic(() => import("@/components/other-games/OtherGames").then(mod => ({ default: mod.OtherGames })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded-lg"></div>
});

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-24 animate-pulse bg-gray-200 rounded-lg"></div>
});

// 游戏页面模板的属性接口
interface GamePageTemplateProps {
  gameConfig: {
    metadata: {
      title: string;
      description: string;
      url: string;
    };
    content: any;
  };
}

export function GamePageTemplate({ gameConfig }: GamePageTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Add H2 title for the current game */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 lg:mb-12">
          {gameConfig.content.gameSection?.title || gameConfig.metadata.title}
        </h2>
        <GameSection content={gameConfig.content} />
        <OtherGames
          games={getOtherGames()}
          onGameSelect={() => {}}
        />
        <Features content={gameConfig.content} />
        <WhatIs content={gameConfig.content} />
        <HowToPlay content={gameConfig.content} />
        <FAQ content={gameConfig.content} />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateGameSchema({
              title: gameConfig.metadata.title,
              description: gameConfig.metadata.description,
              url: gameConfig.metadata.url
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "HowTo",
            "name": gameConfig.content.howToPlay.title,
            "url": `https://takecareofshadowmilk.cc${gameConfig.metadata.url}`,
            "inLanguage": "en",
            "image": {
              "@type": "ImageObject",
              "url": gameConfig.content.howToPlay.image
            },
            "step": [{
              "@type": "HowToStep",
              "position": "1",
              "name": gameConfig.content.howToPlay.title,
              "text": gameConfig.content.howToPlay.description,
              "image": gameConfig.content.howToPlay.image
            }]
          }),
        }}
      />
    </div>
  );
}
