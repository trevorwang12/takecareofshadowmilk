import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { pouOnlineContent } from "./content";

export const metadata: Metadata = {
  title: `Pou Online | Free Virtual Pet Game | ${siteConfig.domain}`,
  description: "Take care of Pou - the ultimate virtual pet experience! Feed, clean, play games, experiment with potions in the Lab, and customize with outfits, hats & eyeglasses. Watch Pou grow and level up!",
  openGraph: {
    title: `Pou Online | Free Virtual Pet Game | ${siteConfig.domain}`,
    description: "Take care of Pou - the ultimate virtual pet experience! Feed, clean, play games, experiment with potions in the Lab, and customize with outfits, hats & eyeglasses. Watch Pou grow and level up!",
    type: 'website',
    url: `${siteConfig.url}/pou-online`,
    siteName: siteConfig.name,
    images: [
      {
        url: `/assets/virtual-pets/pou-online.svg`,
        alt: `Pou Online Virtual Pet Game Screenshot`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pou Online | Ultimate Virtual Pet Experience',
    description: 'Care for Pou, play games, experiment with potions, customize with outfits & accessories! Watch your pet grow and level up in this complete virtual pet experience.',
    images: [`/assets/virtual-pets/pou-online.svg`],
  },
  alternates: {
    canonical: `/pou-online`,
  }
};

// Game page configuration
const gameConfig = {
  metadata: {
    title: "Pou Online",
    description: "Play Pou Online - care for your virtual pet Pou in this classic simulation game. Feed, clean, and play with your adorable companion!",
    url: "/pou-online"
  },
  content: pouOnlineContent
};

export default function PouOnlinePage() {
  return <GamePageTemplate gameConfig={gameConfig} />;
}