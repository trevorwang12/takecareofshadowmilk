import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { petSalon2Content } from "./content";

export const metadata: Metadata = {
  title: `Pet Salon 2 | Enhanced Pet Grooming Game | ${siteConfig.domain}`,
  description: "The enhanced sequel to the popular pet grooming game! More pets, more styling options, and more fun as you build your pet salon empire.",
  openGraph: {
    title: `Pet Salon 2 | Enhanced Pet Grooming Game | ${siteConfig.domain}`,
    description: "The enhanced sequel to the popular pet grooming game! More pets, more styling options, and more fun as you build your pet salon empire.",
    type: 'website',
    url: `${siteConfig.url}/pet-salon-2`,
    siteName: siteConfig.name,
    images: [
      {
        url: `/assets/virtual-pets/pet-salon-2.svg`,
        alt: `Pet Salon 2 Game Screenshot`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Salon 2 | Enhanced Pet Grooming Simulation',
    description: 'Play Pet Salon 2! The enhanced sequel with more pets, luxury spa services, and advanced grooming features. Build your salon empire!',
    images: [`/assets/virtual-pets/pet-salon-2.svg`],
  },
  alternates: {
    canonical: `/pet-salon-2`,
  }
};

// Game page configuration
const gameConfig = {
  metadata: {
    title: "Pet Salon 2",
    description: "Play Pet Salon 2 - the enhanced pet grooming sequel! More pets, luxury spa services, and advanced styling options await.",
    url: "/pet-salon-2"
  },
  content: petSalon2Content
};

export default function PetSalon2Page() {
  return <GamePageTemplate gameConfig={gameConfig} />;
}