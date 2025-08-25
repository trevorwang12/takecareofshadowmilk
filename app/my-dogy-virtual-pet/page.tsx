import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { myDogyVirtualPetContent } from "./content";

export const metadata: Metadata = {
  title: `My DOGY Virtual Pet | Free Dog Care Game | ${siteConfig.domain}`,
  description: "Meet Dogy, your adorable virtual puppy! Feed him, give him baths, play fun games, and tuck him in for rest. Watch Dogy react to your love and care in this engaging pet simulation!",
  openGraph: {
    title: `My DOGY Virtual Pet | Free Dog Care Game | ${siteConfig.domain}`,
    description: "Adopt and care for your very own virtual dog companion. Train, feed, play, and watch your DOGY grow in this heartwarming pet simulation game.",
    type: 'website',
    url: `${siteConfig.url}/my-dogy-virtual-pet`,
    siteName: siteConfig.name,
    images: [
      {
        url: `/assets/virtual-pets/my-dogy-virtual-pet.svg`,
        alt: `My DOGY Virtual Pet Game Screenshot`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My DOGY Virtual Pet | Free Dog Simulation Game',
    description: 'Play My DOGY Virtual Pet! Adopt, train, and care for your virtual dog companion. Experience the joy of dog ownership online for free.',
    images: [`/assets/virtual-pets/my-dogy-virtual-pet.svg`],
  },
  alternates: {
    canonical: `/my-dogy-virtual-pet`,
  }
};

// Game page configuration
const gameConfig = {
  metadata: {
    title: "My DOGY Virtual Pet",
    description: "Play My DOGY Virtual Pet - adopt and care for your virtual dog companion. Train, feed, play, and create lasting memories with your digital pet!",
    url: "/my-dogy-virtual-pet"
  },
  content: myDogyVirtualPetContent
};

export default function MyDogyVirtualPetPage() {
  return <GamePageTemplate gameConfig={gameConfig} />;
}