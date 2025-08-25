import { siteConfig } from "./site";

export const content = {
  header: {
    title: "Take Care of Shadow Milk",
    search: {
      placeholder: "Search Shadow Milk and virtual pet games...",
      ariaLabel: "Search Shadow Milk games",
      buttonAriaLabel: "Search Shadow Milk Games",
    },
    navigation: {
      links: [
        { text: "Play Take Care of Shadow Milk", href: "#game-section" },
        { text: "More Virtual Pet Games", href: "#other-games" },
        { text: "Shadow Milk Features", href: "#features" },
        { text: "About Take Care of Shadow Milk", href: "#what-is" },
        { text: "How to Play", href: "#how-to-play" },
        { text: "FAQ", href: "#faq" },
      ]
    }
  },
  footer: {
    about: {
      title: "About Take Care of Shadow Milk",
      description: `Experience Take Care of Shadow Milk - the viral virtual pet simulator featuring Shadow Milk Cookie from Cookie Run: Kingdom. Discover the ultimate Shadow Milk companion experience with endless interactive possibilities. Feed, care for, or playfully prank your digital pet right in your browser. No downloads required for Take Care of Shadow Milk.`,
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { text: "Take Care of Shadow Milk", href: "/" },
        { text: "Pou Online", href: "/pou-online" },
        { text: "My DOGY Virtual Pet", href: "/my-dogy-virtual-pet" },
        { text: "Pet Salon", href: "/pet-salon" },
        { text: "Pet Salon 2", href: "/pet-salon-2" },
        { text: "My Pet Care Salon", href: "/my-pet-care-salon" },
      ]
    },
    games: {  // games section
      title: "Games",
      links: [
        { text: "Take Care of Shadow Milk", href: "/" },
        { text: "Pou Online", href: "/pou-online" },
        { text: "My DOGY Virtual Pet", href: "/my-dogy-virtual-pet" },
        { text: "Pet Salon", href: "/pet-salon" },
      ]
    },
    social: {
      title: "Share",
      links: [
        {
          icon: "Facebook",
          href: `https://www.facebook.com/sharer.php?t=${encodeURIComponent(siteConfig.name)}&u=${encodeURIComponent(siteConfig.url)}`
        },
        {
          icon: "Twitter",
          href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(siteConfig.name)}&url=${encodeURIComponent(siteConfig.url)}&hashtags=${siteConfig.social.twitter},Games`
        }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Contact Us", href: "/contact" },
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms of Service", href: "/terms-of-service" }
      ]
    },
    copyright: {
      text: "© {year} Take Care of Shadow Milk. All rights reserved.",
      subText: "All virtual pet games on this platform are free to play and do not require downloads."
    }
  },
  rating: {
    title: "Rate Take Care of Shadow Milk",
    votes: "votes",
    initialRating: 4.9,
    initialVotes: 312
  },
  gameSection: {
    title: "Play Take Care of Shadow Milk - Ultimate Virtual Pet Simulator Online Free",
    description: "Play Take Care of Shadow Milk, the ultimate virtual pet simulator, for free online. No downloads required!",
    game: {
      url: '/game/take-care-of-shadow-milk/index.html',
      title: "Take Care of Shadow Milk - Virtual Pet Simulator",
      externalUrl: '/game/take-care-of-shadow-milk/index.html'
    }
  },
  otherGames: {
    title: "Popular Virtual Pet Games - More Interactive Pet Fun",
    cardLabels: {
      playButton: "Play Now",
    }
  },
  howToPlay: {
    title: "How to Play Take Care of Shadow Milk Online Free - Virtual Pet Care Guide",
    description: "Playing Take Care of Shadow Milk online is simple and addictive: Move between different rooms like the bedroom, kitchen, or bathroom to interact with your Shadow Milk Cookie companion. Drag and drop food, objects, or random tools to see how your virtual pet reacts to different items and situations.\n\n" +
      "Master the art of pet care in Take Care of Shadow Milk by monitoring his essential status bars - hunger, energy, health, and hygiene. You can choose to be a caring owner by feeding and nurturing your Shadow Milk Cookie, or unleash your mischievous side by pranking and causing playful chaos with no consequences.\n\n" +
      "Create your own unique story by experimenting with different interactions. Take Care of Shadow Milk offers complete freedom - there are no missions, no game-over screens, just endless possibilities to care for or playfully torment your adorable Shadow Milk companion. Keep experimenting with this viral Scratch game that has become a TikTok sensation!",
    image: "/assets/take-care-of-shadow-milk/take-care-of-shadow-milk-howto-v2.svg?v=20250825",
    imageAlt: "Take Care of Shadow Milk Game Guide - Play Online Free, Virtual Pet Tutorial"
  },
  whatIs: {
    title: "Everything about Take Care of Shadow Milk - Play Virtual Pet Game Online Free",
    description: "Take Care of Shadow Milk is a captivating free virtual pet simulator game featuring the beloved Shadow Milk Cookie from Cookie Run: Kingdom. Interact with your digital companion by feeding, caring, or playfully pranking them in various room environments. You can play this addictive pet game online anytime, directly in your browser.\n\n" +
      "Experience the viral sensation that has taken TikTok by storm with this innovative Scratch-based game created by GPE_sb3. Take Care of Shadow Milk offers a unique blend of cute aesthetics with mischievous undertones, perfectly reflecting Shadow Milk Cookie's deceitful yet adorable persona from the popular mobile game.\n\n" +
      "Whether you're a Cookie Run fan or just looking for a fun virtual pet experience, Take Care of Shadow Milk provides endless entertainment with no rules or restrictions. Play this free online pet simulator directly in your browser - no downloads needed, just pure chaotic fun that's both adorable and unpredictable.",
    logo: {
      src: "/assets/img/android-chrome-512x512.png",
      alt: "Take Care of Shadow Milk - Ultimate Free Online Virtual Pet Simulator Logo",
      useInlineSvg: true
    }
  },
  faq: {
    title: "Frequently Asked Questions - Take Care of Shadow Milk Virtual Pet Game",
    items: [
      {
        value: "what-is-shadow-milk-game",
        question: "What is Take Care of Shadow Milk and how do I play it online?",
        answer: "Take Care of Shadow Milk is a free online virtual pet simulator featuring Shadow Milk Cookie from Cookie Run: Kingdom. You can play it directly in your browser by visiting our website. Move between different rooms and drag-and-drop items to interact with your Shadow Milk companion - feed him, care for him, or playfully prank him with no rules or restrictions."
      },
      {
        value: "play-on-mobile",
        question: "Can I play Take Care of Shadow Milk on my mobile device?",
        answer: "Yes! Take Care of Shadow Milk is fully compatible with mobile devices including phones and tablets. The Scratch-based game works seamlessly in modern web browsers on iOS and Android devices, allowing you to interact with your virtual pet on the go with intuitive touch controls."
      },
      {
        value: "shadow-milk-cookie",
        question: "What makes Shadow Milk Cookie special in this virtual pet game?",
        answer: "Shadow Milk Cookie from Cookie Run: Kingdom brings his deceitful yet adorable personality to this virtual pet simulator. The character features cute aesthetics with mischievous undertones, allowing for both caring and chaotic interactions. His unpredictable reactions to different items and situations make every gameplay session unique and entertaining."
      },
      {
        value: "game-rules",
        question: "Are there any rules or objectives in Take Care of Shadow Milk?",
        answer: "No! That's what makes Take Care of Shadow Milk so addictive and fun. There are no strict rules, missions, or game-over screens. You have complete freedom to interact with Shadow Milk however you want - be a caring pet owner or unleash your mischievous side. The game encourages experimentation and creative chaos."
      },
      {
        value: "new-player-guide",
        question: "How easy is it for beginners to start playing Take Care of Shadow Milk?",
        answer: "Take Care of Shadow Milk is incredibly easy to learn and play. The simple drag-and-drop mechanics make it accessible to players of all ages. Just move between rooms (bedroom, kitchen, bathroom) and experiment with different objects to see how Shadow Milk reacts. The game provides instant visual feedback and encourages creative exploration."
      },
      {
        value: "technical-requirements",
        question: "What do I need to play Take Care of Shadow Milk smoothly?",
        answer: "To play Take Care of Shadow Milk online, you need a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection. The Scratch-based game runs smoothly on most devices including computers, tablets, and smartphones. No downloads or special software required - just click and play."
      },
      {
        value: "viral-popularity",
        question: "Why has Take Care of Shadow Milk become so popular on TikTok?",
        answer: "Take Care of Shadow Milk has gone viral on TikTok because of its unpredictable and often hilarious character reactions. Players love creating short clips showing Shadow Milk's wild responses to different interactions. The game's blend of cute aesthetics with chaotic possibilities makes it perfect for creating shareable, entertaining content."
      },
      {
        value: "interaction-types",
        question: "What types of interactions can I have with Shadow Milk Cookie?",
        answer: "You can interact with Shadow Milk in countless ways! Feed him various foods, give him baths, play with toys, or try more mischievous actions like pranking or 'torturing' him (all in good fun, of course). Monitor his status bars for hunger, energy, health, and hygiene, or simply ignore them and see what happens - the choice is entirely yours!"
      }
    ]
  },
  features: {
    title: "Amazing Features of Take Care of Shadow Milk - Play Free Virtual Pet Game Online",
    items: [
      {
        title: "Intuitive Pet Interaction",
        description: "Take Care of Shadow Milk features an incredibly intuitive drag-and-drop interface that makes virtual pet care accessible to everyone. Simply drag objects and food items to interact with your Shadow Milk companion. Each interaction produces unique reactions and animations, allowing you to create endless entertainment scenarios when you play this free virtual pet game."
      },
      {
        title: "Shadow Milk Cookie Character",
        description: "Experience the beloved Shadow Milk Cookie from Cookie Run: Kingdom in this dedicated virtual pet simulator. This specially designed character brings his mischievous personality and adorable appearance to life with detailed animations and unpredictable reactions. The perfect blend of cute aesthetics and chaotic possibilities creates an engaging pet simulation experience."
      },
      {
        title: "Creative Freedom & No Rules",
        description: "Take Care of Shadow Milk empowers your creativity with complete freedom of interaction. There are no missions, rules, or game-over screens - just endless possibilities to care for, play with, or prank your virtual companion. The game celebrates individual creativity and chaos, making every playthrough unique when you play Take Care of Shadow Milk online free."
      },
      {
        title: "Cross-Platform Compatibility",
        description: "Enjoy Take Care of Shadow Milk on any device with seamless cross-platform compatibility. Whether you're on a computer, tablet, or smartphone, the Scratch-based game adapts perfectly to your screen size and input method. Care for your virtual pet at home or on the go with this free online pet simulator that works flawlessly across all modern web browsers and operating systems."
      }
    ]
  }
} as const;


