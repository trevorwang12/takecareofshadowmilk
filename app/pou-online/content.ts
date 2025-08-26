import { content as globalContent } from "@/config/content";

export const pouOnlineContent = {
  // inherit basic content but override gameSection completely
  ...globalContent,
  // game section config - completely override global gameSection
  gameSection: {
    title: "Pou Online",
    description: "Have you ever taken care of Pou as a pet? Feed it, clean it, play with it and watch it grow up while leveling up!",
    game: {
      url: '/game/pou-online/index.html',
      title: "Pou Online - Virtual Pet Game",
      externalUrl: 'https://html5.gamedistribution.com/d1362abc246f43bdb5c26643aec2b61b/?gd_sdk_referrer_url=https://takecareofshadowmilk.cc/pou-online'
    }
  },

  // features section config
  features: {
    title: "Pou Online: Complete Virtual Pet Experience - Play Free Online!",
    items: [
      {
        title: "Feed, Care & Watch Pou Grow",
        description: "Take complete care of your adorable virtual pet Pou! Feed him when hungry, clean him when dirty, and watch him grow up while leveling up. Monitor his status bars and keep him happy and healthy as he evolves into your perfect companion."
      },
      {
        title: "Games Room & Coin Collection",
        description: "Visit the exciting games room to play different mini-games with your Pou! Earn coins through various challenges and activities that you can spend on customizations, food, and special items for your pet."
      },
      {
        title: "Laboratory & Magic Potions",
        description: "Experiment with magical potions at the Lab! Create special concoctions that can change Pou's appearance, give him unique abilities, or unlock special effects. Discover new recipes and become a master potion maker!"
      },
      {
        title: "Complete Customization System",
        description: "Dress up your Pou with new outfits, stylish hats, and trendy eyeglasses! Customize his appearance, change colors, and create countless unique looks. Make your Pou stand out with endless fashion possibilities."
      },
      {
        title: "Room Personalization & Achievements",
        description: "Customize each room's wallpaper and decorations to create the perfect environment! Unlock special achievements and rare items as you progress. Show off your dedication and unlock exclusive content through gameplay milestones."
      }
    ]
  },
  
  whatIs: {
    title: "What is Pou Online? The Ultimate Virtual Pet Experience!",
    description: "Have you ever taken care of Pou as a pet? Feed it, clean it, play with it and watch it grow up while leveling up! This brand new Pou game for web and mobile brings the complete virtual pet experience right to your browser.\n\n" +
        "Feed, nurture and take care of your Pou while exploring exciting features like playing different games in the games room to collect coins, experimenting with magical potions at the Lab, and customizing Pou's appearance with new outfits, hats and eyeglasses! You can even customize each room's wallpaper and unlock special achievements and items.\n\n" +
        "Experience the joy of watching your Pou grow and evolve under your care. This comprehensive virtual pet simulator combines classic pet care mechanics with modern customization options, mini-games, and progression systems that keep the gameplay fresh and engaging for hours of entertainment.",
    logo: {
      src: "/assets/virtual-pets/pou-online.svg",
      alt: "Pou Online - Ultimate Virtual Pet Game Logo"
    }
  },
  
  howToPlay: {
    title: "How to Play Pou Online Free: Complete Care & Customization Guide",
    description: "Use the mouse or tap the screen to interact with Pou and objects around you. Follow the on-screen instructions to get started with caring for your virtual pet!\n\n" +
        "Feed, clean, and play with your Pou while watching it grow and level up! Visit the games room to play different mini-games and collect coins that you can spend on customizations. Head to the Lab to experiment with magical potions that can change Pou's appearance or give special effects.\n\n" +
        "Customize Pou's look by trying out new outfits, hats, and eyeglasses from the wardrobe. Personalize each room by changing wallpapers and decorations. As you progress, unlock special achievements and rare items that make your Pou unique. The more you interact and care for Pou, the more content you'll unlock!",
    image: "/assets/virtual-pets/pou-online.svg",
    imageAlt: "Pou Online Game Guide - Complete Pet Care and Customization"
  },
  
  faq: {
    title: "Pou Online: FAQ (Free Virtual Pet Game)",
    items: [
      {
        value: "what-is-pou-online",
        question: "What is Pou Online and how do I play it?",
        answer: "Pou Online is a free virtual pet simulation game where you care for an adorable alien pet named Pou. Feed him, keep him clean, play mini-games together, and watch him grow happy and healthy under your care."
      },
      {
        value: "how-to-keep-pou-happy",
        question: "How do I keep my Pou happy and healthy?",
        answer: "Monitor Pou's status bars regularly! Feed him when hungry, give water when thirsty, clean him when dirty, and play mini-games to keep him entertained. Regular care and attention will keep your Pou in perfect condition."
      },
      {
        value: "can-customize-pou",
        question: "Can I customize my Pou's appearance?",
        answer: "Yes! You can change Pou's color, dress him up with different outfits, add accessories like hats and glasses, and decorate his room with furniture and wallpapers. Make your Pou unique and stylish!"
      },
      {
        value: "is-pou-online-free",
        question: "Is Pou Online free to play?",
        answer: "Absolutely! Pou Online is completely free to play in your web browser. No downloads or payments required - just pure virtual pet fun with your adorable Pou companion."
      },
      {
        value: "pou-games-room-coins",
        question: "What can I do in the games room and how do I collect coins?",
        answer: "Visit the games room to play different mini-games and challenges! You can earn coins through various activities like puzzle games, arcade challenges, and interactive tasks. Use these coins to buy food, outfits, decorations, and special items for your Pou."
      },
      {
        value: "pou-lab-potions",
        question: "How do I use the Laboratory and create potions?",
        answer: "Head to the Lab to experiment with magical potions! Mix different ingredients to create special concoctions that can change Pou's appearance, give unique effects, or unlock new abilities. Discover new recipes through experimentation and become a master potion maker."
      },
      {
        value: "pou-customization-outfits",
        question: "What customization options are available for Pou?",
        answer: "You can dress up Pou with numerous outfits, stylish hats, and trendy eyeglasses! Change his color, try different clothing combinations, and create unique looks. Customize each room's wallpaper and decorations to match your style and unlock special items through achievements."
      },
      {
        value: "pou-not-responding",
        question: "What should I do if my Pou seems sad or isn't responding?",
        answer: "Check Pou's status bars - he might be hungry, thirsty, dirty, or bored. Take care of his immediate needs by feeding, cleaning, or playing with him. Regular interaction and care will bring your Pou back to his happy, playful self!"
      }
    ]
  }
};