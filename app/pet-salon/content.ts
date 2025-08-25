import { content as globalContent } from "@/config/content";

export const petSalonContent = {
  // inherit basic content from global config
  ...globalContent,

  // game section config
  gameSection: {
    ...globalContent.gameSection,
    title: "Pet Salon",
    game: {
      url: 'https://html5.gamedistribution.com/ca0dd2ea005944609eb4341ee98a9dfb/?gd_sdk_referrer_url=https://www.example.com/games/pet-salon',
      title: "pet-salon",
      externalUrl: 'https://html5.gamedistribution.com/ca0dd2ea005944609eb4341ee98a9dfb/?gd_sdk_referrer_url=https://www.example.com/games/pet-salon'
    }
  },

  // features section config
  features: {
    title: "Pet Salon: Cutest Pet Care Features - Play Free Online!",
    items: [
      {
        title: "Bath the Cutest Pets",
        description: "Give adorable pets relaxing baths with gentle shampoos and warm water! Watch as the cutest puppies, kittens, and other furry friends enjoy their spa treatments. Make bath time fun and soothing for every pet."
      },
      {
        title: "Medical Care & Doctor Visits",
        description: "Take care of pets' health by bringing them to the doctor when needed! Provide medical attention, check-ups, and treatment to ensure every pet stays healthy and happy. Be the caring veterinarian they need."
      },
      {
        title: "Pet Daycare Services",
        description: "Pet Salon is very helpful for pet daycare! Watch over adorable pets during the day, play with them, feed them, and make sure they're comfortable and content while their owners are away."
      },
      {
        title: "Adorable Pet Varieties",
        description: "Care for the cutest pets of all types! From fluffy puppies and playful kittens to other adorable animals, each pet has unique needs and personalities that make every care session special and rewarding."
      },
      {
        title: "Fun & Caring Gameplay",
        description: "Have too much fun with this game while learning about pet care! Pet Salon combines entertainment with education, teaching responsibility and empathy while providing hours of enjoyable gameplay with the cutest pets."
      }
    ]
  },
  
  whatIs: {
    title: "What is Pet Salon? Take Care of the Cutest Pets!",
    description: "Take care of the cutest pets that you can bathe and bring to the doctor! Pet Salon is very helpful for the daycare of your pet and provides endless fun with this engaging pet care game.\n\n" +
        "This delightful pet care simulation lets you experience the joy of running your own pet daycare and grooming salon. From giving adorable pets relaxing baths to ensuring they receive proper medical attention, you'll become the ultimate pet caretaker.\n\n" +
        "Pet Salon combines pet care with fun gameplay, teaching responsibility while providing hours of entertainment. Whether you're bathing fluffy puppies, caring for sick pets, or simply enjoying playtime with your furry friends, every moment is filled with cuteness and joy!",
    logo: {
      src: "/assets/virtual-pets/pet-salon.svg",
      alt: "Pet Salon - Cutest Pet Care Game Logo"
    }
  },
  
  howToPlay: {
    title: "How to Play Pet Salon Free: Your Pet Care Guide",
    description: "Take care of the cutest pets that you can bathe and bring to the doctor! Start by welcoming adorable pets into your salon and daycare facility where you'll provide complete care and attention.\n\n" +
        "Give your furry friends relaxing baths using gentle shampoos and warm water. Make sure to clean them thoroughly and dry them off carefully. When pets need medical attention, take them to the doctor area where you can provide proper healthcare and treatment.\n\n" +
        "Pet Salon is very helpful for daycare activities - play with the pets, feed them, and make sure they're comfortable and happy. Monitor each pet's needs and respond with love and care. Have fun creating a safe, nurturing environment where every pet feels loved and well-cared for!",
    image: "/assets/virtual-pets/pet-salon.svg",
    imageAlt: "Pet Salon Game Guide - How to Care for the Cutest Pets"
  },
  
  faq: {
    title: "Pet Salon: FAQ (Free Pet Grooming Game)",
    items: [
      {
        value: "what-is-pet-salon-game",
        question: "What is Pet Salon and how do I play it?",
        answer: "Pet Salon is a fun pet grooming simulation game where you run your own pet salon business. Wash, cut, style, and accessorize pets to make them look beautiful while keeping their owners happy with your professional services."
      },
      {
        value: "what-pets-can-groom",
        question: "What types of pets can I groom in the salon?",
        answer: "You can groom various pets including different dog breeds, cats, and other adorable animals. Each pet type has unique grooming needs and styling possibilities, making every appointment a new and exciting challenge."
      },
      {
        value: "grooming-tools-available",
        question: "What grooming tools and equipment can I use?",
        answer: "Pet Salon features professional grooming tools including shampoo, brushes, hair dryers, clippers, scissors, nail trimmers, and various styling accessories like bows, bandanas, and nail polish for complete makeovers."
      },
      {
        value: "is-pet-salon-free",
        question: "Is Pet Salon free to play online?",
        answer: "Yes! Pet Salon is completely free to play in your web browser. No downloads, installations, or payments required - just start grooming pets and building your salon business immediately!"
      },
      {
        value: "how-to-satisfy-customers",
        question: "How do I keep pet owners satisfied with my services?",
        answer: "Listen to each owner's specific requests, work carefully and efficiently, and pay attention to detail. The better you follow instructions and create beautiful results, the happier customers become, leading to a more successful salon."
      },
      {
        value: "creative-styling-options",
        question: "Can I be creative with pet styling and accessories?",
        answer: "Absolutely! Pet Salon encourages creativity with various styling options, hair cuts, colors, accessories, and decorative items. Express your artistic side while making each pet look unique and beautiful."
      }
    ]
  }
};