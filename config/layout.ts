export const layout = {
  header: {
    isVisible: true,
    maxWidth: "max-w-sm",
    searchEnabled: false,
    logoSize: "text-2xl",
    container: {
      padding: "px-4 md:px-8",
    },
    logo: {
      src: "/assets/img/shadow-milk-logo-bright.svg", // Shadow Milk Cookie theme logo - bright version
      size: "w-12 h-12", // 48x48 display size
    }
  },
  gameSection: {
    isVisible: {
      title: false  // control game section title visibility
    }
  },
  footer: {
    isVisible: true,
    sections: {
      about: true,
      quickLinks: true,
      social: true,
      legal: true,
      games: true,  // games section
    }
  },
  whatIs: {
    sectionId: "what-is",
    grid: {
      columns: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center",
      gap: "gap-8",
    },
    content: {
      span: "md:col-span-2"
    },
    logo: {
      size: {
        width: "w-48",
        height: "h-48"
      }
    }
  },
  faq: {
    sectionId: "faq",
    accordion: {
      type: "single",
      collapsible: true
    }
  }
} as const;






