import { content as globalContent } from "@/config/content";

export const myDogyVirtualPetContent = {
  // inherit basic content from global config
  ...globalContent,

  // game section config
  gameSection: {
    ...globalContent.gameSection,
    title: "My DOGY Virtual Pet",
    game: {
      url: '/game/my-dogy-virtual-pet/index.html',
      title: "My DOGY Virtual Pet - Virtual Dog Care Game",
      externalUrl: 'https://html5.gamedistribution.com/0aa201caffd44d389a6e4fd64de06306/?gd_sdk_referrer_url=https://takecareofshadowmilk.cc/my-dogy-virtual-pet'
    }
  },

  // features section config
  features: {
    title: "My DOGY Virtual Pet: Adorable Puppy Care Features - Play Free Online!",
    items: [
      {
        title: "Meet Your Adorable Virtual Puppy",
        description: "Meet Dogy, your loveable virtual pet who needs your constant love and care! Watch as your adorable puppy responds to your attention and develops his own unique personality based on how well you take care of him."
      },
      {
        title: "Feed & Keep Him Happy",
        description: "Feed Dogy when he's hungry and watch his happiness grow! Monitor his needs through the progress bars at the top of the screen and make sure to keep all his essential needs fulfilled for a content and healthy puppy."
      },
      {
        title: "Bath Time & Cleanliness",
        description: "Give Dogy regular baths to keep him clean and fresh! Use interactive bathing tools and watch as your puppy enjoys his spa time. A clean Dogy is a happy Dogy, and he'll show his appreciation through adorable reactions."
      },
      {
        title: "Fun Games & Playtime",
        description: "Play entertaining games together to keep Dogy active and joyful! Engage in various fun activities that strengthen your bond while keeping your virtual puppy mentally stimulated and physically active."
      },
      {
        title: "Rest & Sleep Care",
        description: "When Dogy is tired, tuck him in for a good rest! Monitor his energy levels and ensure he gets proper sleep. A well-rested puppy is more responsive and happier, creating a rewarding care experience."
      }
    ]
  },
  
  whatIs: {
    title: "What is My DOGY Virtual Pet? Meet Your Adorable Virtual Puppy!",
    description: "Meet Dogy, your adorable virtual pet who needs your love and care! My Dogy Virtual Pet is a fun and engaging pet simulation game where you take care of an adorable puppy. This heartwarming experience brings the joy of dog ownership right to your screen.\n\n" +
        "Feed him when he's hungry, give him a bath to keep him clean, and play fun games together to keep him happy. When he's tired, tuck him in for a good rest. Dogy will react to how well you take care of him, so make sure he always feels loved!\n\n" +
        "Experience the special bond between you and your virtual puppy as you monitor his needs and watch him respond to your care. This engaging simulation teaches responsibility while providing endless entertainment with your loyal digital companion.",
    logo: {
      src: "/assets/virtual-pets/my-dogy-virtual-pet.svg",
      alt: "My DOGY Virtual Pet - Adorable Puppy Care Game Logo"
    }
  },
  
  howToPlay: {
    title: "How to Play My DOGY Virtual Pet Free: Your Puppy Care Guide",
    description: "Use the mouse or touch the screen to interact with Dogy and the objects around you. Follow the instructions on the screen to get started with caring for your adorable virtual puppy!\n\n" +
        "You can see Dogy's needs progression in the icons at the top of the screen. Try to keep the bars full by attending to his needs in each room - feed him when he's hungry, give him a bath to keep him clean, and play fun games together to keep him happy and entertained.\n\n" +
        "When Dogy is tired, make sure to tuck him in for a good rest. Remember, Dogy will react to how well you take care of him, so show him lots of love and attention! Monitor his happiness, hunger, cleanliness, and energy levels to ensure your virtual puppy stays healthy and content.",
    image: "/assets/virtual-pets/my-dogy-virtual-pet.svg",
    imageAlt: "My DOGY Virtual Pet Game Guide - How to Care for Your Virtual Puppy"
  },
  
  faq: {
    title: "My DOGY Virtual Pet: FAQ (Free Dog Simulation Game)",
    items: [
      {
        value: "what-is-my-dogy",
        question: "What is My DOGY Virtual Pet and how does it work?",
        answer: "My DOGY Virtual Pet is a free dog simulation game where you adopt, care for, and train a virtual dog companion. Feed, groom, play, and train your DOGY while watching him grow and develop his unique personality."
      },
      {
        value: "how-to-train-dog",
        question: "How do I train my virtual dog in the game?",
        answer: "Training involves teaching your DOGY various commands like sit, stay, fetch, and tricks. Use positive reinforcement, be consistent with commands, and practice regularly. The more you train, the more obedient and skilled your virtual dog becomes."
      },
      {
        value: "dog-breeds-available",
        question: "What dog breeds can I choose from?",
        answer: "My DOGY Virtual Pet offers various dog breeds, each with unique characteristics and appearances. You can choose the breed that matches your preferences and experience different personality traits as you care for your virtual companion."
      },
      {
        value: "is-game-free",
        question: "Is My DOGY Virtual Pet free to play?",
        answer: "Yes! My DOGY Virtual Pet is completely free to play online. No downloads, registrations, or payments required - just pure virtual dog care fun directly in your web browser."
      },
      {
        value: "dog-care-activities",
        question: "What activities can I do with my virtual dog?",
        answer: "You can feed, groom, train, play fetch, go for walks, teach tricks, decorate his house, and much more! The game offers a comprehensive virtual dog ownership experience with various interactive activities to keep both you and your DOGY entertained."
      },
      {
        value: "dog-health-care",
        question: "How do I take care of my DOGY's health?",
        answer: "Monitor your DOGY's health status regularly, provide nutritious food, fresh water, exercise, and grooming. Keep his living environment clean, and pay attention to his mood and energy levels. Regular care ensures your virtual dog stays happy and healthy."
      }
    ]
  }
};