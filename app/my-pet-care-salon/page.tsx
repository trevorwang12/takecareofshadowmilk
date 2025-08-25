import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { myPetCareSalonContent } from "./content";

export const metadata: Metadata = {
  title: `My Pet Care Salon | Complete Pet Care Game | ${siteConfig.domain}`,
  description: "Complete pet care experience! Not just grooming, but full veterinary care, feeding, and entertainment for your furry friends. The ultimate pet care simulator.",
  openGraph: {
    title: `My Pet Care Salon | Complete Pet Care Game | ${siteConfig.domain}`,
    description: "Complete pet care experience! Not just grooming, but full veterinary care, feeding, and entertainment for your furry friends. The ultimate pet care simulator.",
    type: 'website',
    url: `${siteConfig.url}/my-pet-care-salon`,
    siteName: siteConfig.name,
    images: [
      {
        url: `/assets/virtual-pets/my-pet-care-salon.svg`,
        alt: `My Pet Care Salon Game Screenshot`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Pet Care Salon | Ultimate Pet Care Simulation',
    description: 'Play My Pet Care Salon! Complete veterinary care, grooming, nutrition, and wellness services. The most comprehensive pet care game!',
    images: [`/assets/virtual-pets/my-pet-care-salon.svg`],
  },
  alternates: {
    canonical: `/my-pet-care-salon`,
  }
};

// Game page configuration
const gameConfig = {
  metadata: {
    title: "My Pet Care Salon",
    description: "Play My Pet Care Salon - the ultimate pet care simulation! Veterinary services, grooming, nutrition, and complete wellness care.",
    url: "/my-pet-care-salon"
  },
  content: myPetCareSalonContent
};

export default function MyPetCareSalonPage() {
  return <GamePageTemplate gameConfig={gameConfig} />;
}