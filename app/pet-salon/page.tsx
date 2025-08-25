import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { petSalonContent } from "./content";

export const metadata: Metadata = {
  title: `Pet Salon | Free Pet Care Game | ${siteConfig.domain}`,
  description: "Take care of the cutest pets! Bathe adorable puppies and kittens, bring them to the doctor, and provide daycare services. Have fun caring for the sweetest pets!",
  openGraph: {
    title: `Pet Salon | Free Pet Grooming Game | ${siteConfig.domain}`,
    description: "Run your own pet grooming salon! Wash, cut, style, and pamper adorable pets. Make them look their absolute best in this fun pet care simulation.",
    type: 'website',
    url: `${siteConfig.url}/pet-salon`,
    siteName: siteConfig.name,
    images: [
      {
        url: `/assets/virtual-pets/pet-salon.svg`,
        alt: `Pet Salon Game Screenshot`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Salon | Free Pet Grooming Simulation Game',
    description: 'Play Pet Salon! Run your own pet grooming business, wash, style, and pamper cute pets. Make every furry customer look amazing!',
    images: [`/assets/virtual-pets/pet-salon.svg`],
  },
  alternates: {
    canonical: `/pet-salon`,
  }
};

// game page configuration
const gameConfig = {
  metadata: {
    title: "Pet Salon",
    description: "Play Pet Salon - run your own pet grooming business! Wash, cut, style, and accessorize pets to create amazing makeovers.",
    url: "/pet-salon"
  },
  content: petSalonContent
};

export default function PetSalonPage() {
  return <GamePageTemplate gameConfig={gameConfig} />;
}