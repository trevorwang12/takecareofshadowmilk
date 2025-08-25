"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { GameSection } from "@/components/game-section/GameSection";
import { getOtherGames } from "@/app/games/game-data";

// 懒加载首页下方的非关键组件
const OtherGames = dynamic(() => import("@/components/other-games/OtherGames").then(mod => ({ default: mod.OtherGames })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded-lg mb-16"></div>
});

const Features = dynamic(() => import("@/components/features/Features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg mb-16"></div>
});

const WhatIs = dynamic(() => import("@/components/what-is/WhatIs").then(mod => ({ default: mod.WhatIs })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg mb-16"></div>
});

const HowToPlay = dynamic(() => import("@/components/how-to-play/HowToPlay").then(mod => ({ default: mod.HowToPlay })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200 rounded-lg mb-16"></div>
});

const FAQ = dynamic(() => import("@/components/faq/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded-lg mb-16"></div>
});


const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-24 animate-pulse bg-gray-200 rounded-lg"></div>
});

export function HomeTemplate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const game = getOtherGames().find(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (game) {
      const element = document.getElementById("other-games");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-8">
        <GameSection />
        <OtherGames
          games={getOtherGames()}
          onGameSelect={setActiveGame}
        />
        <Features />
        <WhatIs />
        <HowToPlay />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}