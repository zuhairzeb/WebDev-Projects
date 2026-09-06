import portfolio from "./portfolio.json";
export const { projects, reviews, experiences, certificates, faqs } = portfolio;
export type Project = (typeof projects)[number];
export const email = "zuhairzeb@yahoo.com";
export const socials = [
  ["LinkedIn", "https://linkedin.com/in/zuhairzeb"],
  ["GitHub", "https://github.com/zuhairzeb"],
  ["Instagram", "https://instagram.com/zuhairzeb"],
  ["X / Twitter", "https://twitter.com/zuhairzeb"],
  ["Facebook", "https://www.facebook.com/xuhairxeb"],
  ["All links", "https://beacons.ai/zuhairzeb"],
] as const;
export const skills = [
  {
    name: "WEB",
    items: [
      ["WordPress", "Custom themes, plugins, and client websites"],
      ["WooCommerce", "Storefronts and multivendor marketplaces"],
      ["Elementor Pro", "Responsive page design"],
      ["PHP", "Custom WordPress functionality"],
      ["HTML5", "Semantic, accessible pages"],
      ["CSS3", "Responsive layouts and interactions"],
      ["JavaScript", "Interactive websites"],
      ["MySQL", "Website databases"],
    ],
  },
  {
    name: "MODERN WEB",
    items: [
      ["React", "Community platforms and web applications"],
      ["TypeScript", "Typed applications"],
      ["Vite", "Modern frontend builds"],
      ["Supabase", "Authentication and member management"],
    ],
  },
  {
    name: "TOOLS",
    items: [
      ["Git", "Source control"],
      ["GitHub", "Code collaboration"],
      ["cPanel", "Hosting administration"],
      ["SSL", "Secure website setup"],
      ["SEO", "On-page and technical optimization"],
      ["Ubuntu / Linux", "Development environments"],
    ],
  },
  {
    name: "AI & DATA",
    items: [
      [
        "Artificial Intelligence",
        "BS Artificial Intelligence — currently studying",
      ],
      ["Prompt engineering", "AI tools and automation"],
      ["Power BI", "Interactive reporting dashboards"],
      ["DAX", "Revenue and operations measures"],
      ["Automation", "Chatbots and workflow integrations"],
    ],
  },
];
export const services = [
  [
    "WordPress development",
    "Custom themes and plugins built around your business. Clean structure, responsive pages, and a site you can manage yourself.",
  ],
  [
    "WooCommerce",
    "Single-vendor stores and multivendor marketplaces, with product management, search, filtering, and a straightforward checkout.",
  ],
  [
    "Landing pages",
    "Focused, responsive pages that explain your offer and give visitors a clear next step.",
  ],
  [
    "Website redesign",
    "A considered update to branding, navigation, and mobile layouts, preserving the content your business needs.",
  ],
  [
    "Speed & fixes",
    "Speed optimization, SSL and hosting setup, site migration, malware cleanup, and reliable launch support.",
  ],
  [
    "SEO & maintenance",
    "On-page SEO, technical audits, ongoing maintenance, and content updates to keep your website useful.",
  ],
];
export const process = [
  [
    "Discovery & planning",
    "Understanding goals, requirements, and challenges.",
  ],
  ["Design & architecture", "Creating scalable solutions and workflows."],
  ["Development", "Building secure and high-performance systems."],
  [
    "Testing & optimization",
    "Improving speed, reliability, and user experience.",
  ],
  ["Launch & support", "Deployment, maintenance, and continuous improvement."],
];
// Preserve original destinations in portfolio.json without offering broken actions.
// Verified 2026-09-06: HomeItems DNS fails; the Refrens case study returns 404.
export const unavailableProjectLinks = new Set([
  "https://homeitemss.com/",
  "https://www.refrens.com/zuhairzeb/portfolio/674966bb0a94c604a2c3718b-redesign-website-of-ospheric",
]);
