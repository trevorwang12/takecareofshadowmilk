export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export const games: Record<string, Game> = {
  "take-care-of-shadow-milk": {
    id: "take-care-of-shadow-milk",
    title: "Take Care of Shadow Milk",
    description: "Experience the viral virtual pet simulator featuring Shadow Milk Cookie from Cookie Run: Kingdom. Feed, care for, or playfully prank your digital companion in this addictive Scratch-based game with no rules and endless possibilities.",
    image: "/assets/take-care-of-shadow-milk/take-care-of-shadow-milk.svg",
    url: "/",
  },
  "pou-online": {
    id: "pou-online",
    title: "Pou Online",
    description: "Take care of your adorable virtual pet Pou! Feed, clean, play with, and help him grow while keeping him happy. A classic virtual pet game that brings back childhood memories.",
    image: "/assets/virtual-pets/pou-online.svg",
    url: "/pou-online",
  },
  "my-dogy-virtual-pet": {
    id: "my-dogy-virtual-pet",
    title: "My DOGY Virtual Pet",
    description: "Adopt and care for your very own virtual dog companion. Train, feed, play, and watch your DOGY grow in this heartwarming pet simulation game.",
    image: "/assets/virtual-pets/my-dogy-virtual-pet.svg",
    url: "/my-dogy-virtual-pet",
  },
  "pet-salon": {
    id: "pet-salon",
    title: "Pet Salon",
    description: "Run your own pet grooming salon! Wash, cut, style, and pamper adorable pets. Make them look their absolute best in this fun pet care simulation.",
    image: "/assets/virtual-pets/pet-salon.svg",
    url: "/pet-salon",
  },
  "pet-salon-2": {
    id: "pet-salon-2",
    title: "Pet Salon 2",
    description: "The enhanced sequel to the popular pet grooming game! More pets, more styling options, and more fun as you build your pet salon empire.",
    image: "/assets/virtual-pets/pet-salon-2.svg",
    url: "/pet-salon-2",
  },
  "my-pet-care-salon": {
    id: "my-pet-care-salon",
    title: "My Pet Care Salon",
    description: "Complete pet care experience! Not just grooming, but full veterinary care, feeding, and entertainment for your furry friends. The ultimate pet care simulator.",
    image: "/assets/virtual-pets/my-pet-care-salon.svg",
    url: "/my-pet-care-salon",
  }
};

// get other games list
export function getOtherGames(): Game[] {
  return Object.values(games);
}



