import { content as globalContent } from "@/config/content";

export const myPetCareSalonContent = {
  // inherit basic content from global config
  ...globalContent,

  // game section config
  gameSection: {
    ...globalContent.gameSection,
    title: "My Pet Care Salon",
    game: {
      url: '/game/my-pet-care-salon/index.html',
      title: "My Pet Care Salon - Complete Pet Spa Experience",
      externalUrl: 'https://html5.gamedistribution.com/d25314c77d8a4931b7d3c7a8d7ee35ea/?gd_sdk_referrer_url=https://takecareofshadowmilk.cc/my-pet-care-salon'
    }
  },

  // features section config
  features: {
    title: "My Pet Care Salon: Ultimate Pet Spa & Styling Experience - Play Free Online!",
    items: [
      {
        title: "Professional Grooming & Bath Time",
        description: "Provide luxurious grooming services including relaxing baths, gentle shampooing, and thorough drying. Create a spa-like experience for adorable pets with professional grooming techniques and soothing treatments."
      },
      {
        title: "Trendy Haircuts & Styling",
        description: "Master the art of pet styling with trendy haircuts, creative designs, and fashionable looks! Use professional styling tools to create unique appearances that make every pet look absolutely stunning and stylish."
      },
      {
        title: "Nail Trimming & Pedicure Services",
        description: "Offer complete nail care services including trimming, filing, and decorative pedicures. Keep pets comfortable and healthy while providing beautiful nail treatments that owners will love."
      },
      {
        title: "Accessory Styling & Fashion",
        description: "Complete every makeover with fashionable accessories! Choose from bows, bandanas, collars, and other stylish items to give each pet a unique personality and perfect finishing touch."
      },
      {
        title: "Salon Management & Rewards",
        description: "Run your own successful pet spa business! Meet different adorable pets, manage appointments, satisfy pet owners, and earn rewards as you build your reputation as the ultimate pet stylist."
      }
    ]
  },
  
  whatIs: {
    title: "What is My Pet Care Salon? Run Your Very Own Pet Spa!",
    description: "My Pet Care Salon invites you to run your very own pet spa! Groom, pamper, and style a variety of adorable pets with fun, interactive activities. From bath time and nail trimming to trendy haircuts and accessory styling, provide the best care for your furry clients.\n\n" +
        "Manage your salon, meet different pets, and earn rewards as you create a welcoming environment for pets and their owners. Transform your pet care dreams into reality and become the ultimate pet stylist!",
    logo: {
      src: "/assets/virtual-pets/my-pet-care-salon.svg",
      alt: "My Pet Care Salon - Pet Spa & Styling Game Logo"
    }
  },
  
  howToPlay: {
    title: "How to Play My Pet Care Salon Free: Your Pet Spa & Styling Guide",
    description: "Welcome to your very own pet spa adventure! Use the Left Mouse Button Click to interact with all salon activities and provide amazing care for your adorable clients.\n\n" +
        "Start by greeting each pet and understanding their grooming needs. Give them relaxing bath time with gentle shampooing and thorough cleaning. Then use your styling skills to create trendy haircuts that suit each pet's personality. Don't forget the nail trimming and pedicure services!\n\n" +
        "Complete each makeover with fashionable accessory styling - choose the perfect bows, bandanas, or collars to give every pet a unique look. Manage your salon efficiently, keep clients happy, and earn rewards as you build your reputation as the ultimate pet stylist. Create a welcoming environment where pets and owners feel pampered and satisfied!",
    image: "/assets/virtual-pets/my-pet-care-salon.svg",
    imageAlt: "My Pet Care Salon Game Guide - Pet Spa & Styling Management"
  },
  
  faq: {
    title: "My Pet Care Salon: FAQ (Free Pet Spa & Styling Game)",
    items: [
      {
        value: "what-services-offered",
        question: "What services can I offer in My Pet Care Salon?",
        answer: "You can provide professional grooming services including bath time, nail trimming, trendy haircuts, accessory styling, and spa treatments. Create a complete pet pampering experience for adorable furry clients!"
      },
      {
        value: "grooming-styling-features",
        question: "What grooming and styling options are available?",
        answer: "The game features comprehensive grooming tools including bathing facilities, professional styling equipment, nail trimming tools, and a wide variety of fashionable accessories like bows, bandanas, and collars."
      },
      {
        value: "salon-management",
        question: "How do I manage my pet salon business?",
        answer: "Meet different pets, satisfy their grooming needs, keep pet owners happy, and earn rewards! Build your reputation by providing excellent service and creating a welcoming environment for all your clients."
      },
      {
        value: "pet-variety",
        question: "What types of pets can I style in the salon?",
        answer: "You'll meet a variety of adorable pets, each with unique grooming needs and styling preferences. Every pet presents a fun challenge to transform them into beautifully styled companions."
      },
      {
        value: "controls-gameplay",
        question: "How do I control the game and interact with pets?",
        answer: "Use Left Mouse Button Click to interact with all salon activities, grooming tools, accessories, and pets. The simple click controls make it easy to provide amazing spa treatments!"
      },
      {
        value: "free-pet-spa-game",
        question: "Is My Pet Care Salon free to play online?",
        answer: "Absolutely! My Pet Care Salon is completely free to play in your web browser. No downloads, registrations, or payments required - start your pet spa business adventure immediately!"
      }
    ]
  }
};