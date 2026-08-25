import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  GitBranch,
  X,
  Gamepad2,
  Layers,
  Users,
  Boxes,
  Code2,
  Calendar,
  Sparkles,
  BookOpen,
  Store,
  HeartPulse,
  Bot,
} from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';
import { GlassCard } from './GlassEffect';

// ─────────────────────────────────────────────────────────────
// PROJECT DATA — this is the single source of truth.
// Every field here matches what was provided. Nothing invented.
// ─────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  category: string;
  date?: string;
  description: string;
  overview?: string;
  results?: string;
  skills?: string[];
  technologies?: string[];
  features?: string[];
  technicalDetails?: string[];
  controls?: string[];
  files?: string[];
  github?: string;
  caseStudyUrl?: string;
  liveDemo?: string;
  image?: string;
  icon: typeof Code2;
}

const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'Front End Development',
    description: 'A simple personal portfolio website built with HTML, CSS, and JavaScript.',
    overview: 'A small static portfolio site intended to showcase projects and responsive layouts.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    files: ['index.html', 'styles.css', 'mediaqueries.css', 'script.js', 'Preview/README.md'],
    github: 'https://github.com/zuhairzeb/WebDev-Projects/tree/Zuhair-Portfolio/Portfolio%20Website',
    image: '01.png',
    icon: Code2,
  },
  {
    id: 'personal-portfolio-website',
    title: 'Personal Portfolio Website',
    category: 'Front End Development',
    date: 'Jun 2025',
    description:
      'Designed and developed a modern, responsive personal portfolio website to showcase professional experience, technical skills, projects, and contact information.',
    overview:
      'Features a clean dark theme, smooth animations, mobile friendly navigation, downloadable CV, and optimized performance across all devices.',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Web Design',
      'UI Design',
      'Front End Development',
      'Git',
      'GitHub',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Boxicons', 'Font Awesome', 'Google Fonts'],
    features: [
      'Responsive design for desktop, tablet, and mobile',
      'Modern dark theme with custom UI',
      'Smooth scrolling and page animations',
      'Interactive navigation menu',
      'Portfolio and resume sections',
      'Downloadable CV',
      'Social media integration',
      'Contact section',
    ],
    github: 'https://github.com/zuhairzeb/WebDev-Projects/tree/Zuhair-Portfolio/Personal%20Portfolio%20Website',
    image: 'portfoliowebsite.png',
    icon: Code2,
  },
  {
    id: 'arcade-pong-game',
    title: 'Arcade PONG Game',
    category: 'Game Development',
    description:
      'A retro-style, browser-based PONG game with authentic arcade aesthetics, realistic physics, and sound effects.',
    features: [
      'Two-player gameplay',
      'Realistic physics with paddle acceleration and deceleration',
      'Collision detection',
      'Retro 8-bit arcade aesthetic with Press Start 2P typography',
      'Sound effects for hits, bounces, and scoring',
      'Real-time score tracking',
      '3D perspective effect with smooth animation',
    ],
    controls: [
      'Player 1: W / S to move paddle up and down',
      'Player 2: Arrow Up / Arrow Down to move paddle up and down',
    ],
    technicalDetails: [
      'Game area: 600px × 400px',
      'Paddle size: 20px × 100px',
      'Ball size: 20px × 20px',
      'Maximum paddle speed: 5 pixels per frame',
      'Initial ball speed: 2 pixels per frame',
      'Game loop runs every 8 milliseconds',
      'Physics: wall collision, paddle collision, out-of-bounds scoring, randomized ball direction on reset',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web Audio API', 'ES6+'],
    github: 'https://github.com/zuhairzeb/WebDev-Projects/tree/Zuhair-Portfolio/Arcade%20PONG%20Game',
    image: 'PONG GAME.png',
    icon: Gamepad2,
  },
  {
    id: 'sociapi-society-website',
    title: 'Sociapi Society Website',
    category: 'Full Stack Development',
    description: 'The official Sociapi Society website, built as a modern and interactive web platform.',
    features: [
      'Home, About Us, Team, Events, Blog, Careers, Contact, FAQ, Gallery',
      'Partner information',
      'Reviews',
      'Merch Store',
      'WhatsApp Chatbot',
      'Responsive design',
      'Performance monitoring',
      'Animated particles background',
      'Contact form',
      'Community and event information',
      'Team profiles',
    ],
    technologies: [
      'React 19.2.6',
      'TypeScript 5.9.3',
      'Vite 7.3.2',
      'Tailwind CSS 4.1.17',
      'Framer Motion 12.39.0',
      'Lucide React 1.16.0',
      'Vercel Analytics',
      'Vercel Speed Insights',
      'clsx',
      'tailwind-merge',
      'Netlify',
    ],
    github: 'https://github.com/sociapi/Sociapi-Society-Web',
    image: 'old version of sociapi.png',
    icon: Users,
  },
  {
    id: 'sociapi-society-web',
    title: 'Sociapi Society Web',
    category: 'Full Stack Development',
    description:
      'A modern, responsive website for Sociapi Society built with React, TypeScript, and Tailwind CSS. The newer version of the Sociapi Society website, serving as a comprehensive hub for community engagement, events, services, and member management.',
    features: [
      'Multi-page platform: Home, About, Chapters, Team, Events & Blog, Services, Partner, Gallery, Shop, Career, Contact, Reviews, FAQs',
      'Certificate Verification System',
      'E-Commerce integration with order management',
      'Team management with member roles and departments',
      'Supabase integration for authentication and authorization',
      'Server-side validation',
      'SEO metadata and sitemap',
      'Pre-rendered pages with Static Site Generation',
      'Google Forms integration',
      'Performance monitoring and optimization',
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS 4',
      'React Router v7',
      'Framer Motion',
      'Supabase',
      'Vercel',
      'Vercel Analytics',
      'Vercel Speed Insights',
      'Vite SSG',
      'Puppeteer',
      'ESBuild',
    ],
    liveDemo: 'https://sociapis.vercel.app/',
    image: 'New verion of sociapi.png',
    icon: Layers,
  },
  {
    id: 'sociapi-society-management-system',
    title: 'Sociapi Society Management System',
    category: 'Management System',
    description:
      'A lightweight React and Vite application for managing society membership, events, communications, and internal tools.',
    features: [
      'Dashboard',
      'Member management',
      'Attendance tracking and reports',
      'Email communication integration',
      'WhatsApp communication integration',
      'Authentication flows',
      'Account management',
      'Admin tools',
      'Activity logs',
    ],
    technicalDetails: [
      'src/ for the React application',
      'api/ for server-side helpers and email integrations',
      'supabase/ for SQL schema and edge functions',
      'netlify/functions for serverless functions',
      'Environment: Supabase URL and keys, Mailjet API keys',
    ],
    technologies: ['React', 'Vite', 'Supabase', 'JavaScript', 'Netlify Functions', 'Mailjet'],
    github: 'https://github.com/sociapisociety',
    image: 'ERP.png',
    icon: Boxes,
  },
  {
    id: 'homeitems-marketplace',
    title: 'HomeItems Marketplace',
    category: 'Multivendor Ecommerce',
    description:
      'HomeItems needed a multivendor platform where multiple sellers could manage their own products, pricing, and inventory under one branded marketplace.',
    overview:
      'Built a fully custom multivendor website with a tailored theme, advanced search and filtering, and a streamlined checkout flow designed around the client\'s brand identity.',
    results:
      'Delivered a responsive, fully tested marketplace that gave vendors independent control and gave customers a smooth shopping experience across all devices.',
    technologies: ['WooCommerce', 'WordPress', 'PHP'],
    liveDemo: 'https://homeitemss.com/',
    caseStudyUrl: 'https://www.example.com/case-study/homeitems-marketplace',
    image: 'homeitems.jpg',
    icon: Store,
  },
  {
    id: 'ospherics-pharma',
    title: 'Ospherics Pharma',
    category: 'Website Redesign',
    description: 'The brand needed a polished online presence to support product launches and investor trust.',
    overview: 'Redesigned the website with modern branding, faster navigation, and mobile-first layouts.',
    results: 'Delivered a professional site that increased lead engagement and strengthened brand trust.',
    technologies: ['WordPress', 'SEO', 'Elementor'],
    liveDemo: 'https://ospherics.com/',
    caseStudyUrl: 'https://www.refrens.com/zuhairzeb/portfolio/674966bb0a94c604a2c3718b-redesign-website-of-ospheric',
    image: 'ospheric.png',
    icon: HeartPulse,
  },
  {
    id: 'sociapi-whatsapp-chatbot',
    title: 'Sociapi WhatsApp Chatbot',
    category: 'Automation Solution',
    description: 'Customer support needed faster responses for common enquiries.',
    overview: 'Built a WhatsApp chatbot that handled FAQs, appointment scheduling, and lead capture.',
    results:
      'Automated repetitive support tasks, improved response consistency, and freed team time for higher-value work.',
    technologies: ['Node.js', 'Railway', 'JavaScript'],
    caseStudyUrl: 'https://www.example.com/case-study/sociapi-chatbot',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200',
    icon: Bot,
  },
];

// ─────────────────────────────────────────────────────────────
// Per-category accent — gives each card its own premium color
// story instead of one flat repeated gradient.
// ─────────────────────────────────────────────────────────────

interface Accent {
  bg: string;
  glow: string;
  ring: string;
  particle: string;
}

const ACCENTS: Record<string, Accent> = {
  'Front End Development': {
    bg: 'from-blue-600 via-indigo-700 to-slate-900',
    glow: 'rgba(37,99,235,0.55)',
    ring: 'ring-blue-400/30',
    particle: 'bg-blue-300',
  },
  'Game Development': {
    bg: 'from-violet-600 via-fuchsia-700 to-slate-900',
    glow: 'rgba(168,85,247,0.55)',
    ring: 'ring-violet-400/30',
    particle: 'bg-violet-300',
  },
  'Full Stack Development': {
    bg: 'from-cyan-600 via-blue-700 to-slate-900',
    glow: 'rgba(8,145,178,0.55)',
    ring: 'ring-cyan-400/30',
    particle: 'bg-cyan-300',
  },
  'Management System': {
    bg: 'from-emerald-600 via-teal-700 to-slate-900',
    glow: 'rgba(5,150,105,0.55)',
    ring: 'ring-emerald-400/30',
    particle: 'bg-emerald-300',
  },
  'Multivendor Ecommerce': {
    bg: 'from-amber-500 via-orange-600 to-slate-900',
    glow: 'rgba(217,119,6,0.55)',
    ring: 'ring-amber-400/30',
    particle: 'bg-amber-300',
  },
  'Website Redesign': {
    bg: 'from-rose-500 via-pink-600 to-slate-900',
    glow: 'rgba(225,29,72,0.55)',
    ring: 'ring-rose-400/30',
    particle: 'bg-rose-300',
  },
  'Automation Solution': {
    bg: 'from-lime-500 via-green-600 to-slate-900',
    glow: 'rgba(22,163,74,0.55)',
    ring: 'ring-lime-400/30',
    particle: 'bg-lime-300',
  },
};

const getAccent = (category: string) => ACCENTS[category] ?? ACCENTS['Front End Development'];

// ─────────────────────────────────────────────────────────────
// ProjectVisual — shows the real screenshot when one is provided.
// Falls back to the animated icon scene when `image` is empty,
// so nothing breaks while you're still adding real pictures.
// ─────────────────────────────────────────────────────────────

const ProjectVisual = ({ project }: { project: Project }) => {
  const accent = getAccent(project.category);

  if (project.image) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Bottom gradient so the category badge and any overlay text stay readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
        {/* Diagonal shine sweep on hover, same as the icon tile */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        {/* Thin colored ring on hover for a premium finish */}
        <div
          className="absolute inset-0 ring-1 ring-inset opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 0 2px ${accent.glow}` }}
        />
      </div>
    );
  }

  return <IconFallback Icon={project.icon} category={project.category} />;
};

// ─────────────────────────────────────────────────────────────
// Visual fallback — used when no real screenshot exists yet.
// Layered, animated icon scene: drifting glow orbs, a fine grid,
// floating particles, a pulsing ring behind the icon, and a
// diagonal shine sweep.
// ─────────────────────────────────────────────────────────────

const IconFallback = ({ Icon, category }: { Icon: typeof Code2; category: string }) => {
  const accent = getAccent(category);
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br ${accent.bg} overflow-hidden`}>
      {/* Drifting glow orbs for depth */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-40"
        style={{ backgroundColor: accent.glow }}
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-14 -right-6 w-48 h-48 rounded-full blur-3xl opacity-30 bg-white"
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${accent.particle}`}
          style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}

      {/* Diagonal shine sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Icon with pulsing halo */}
      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-3xl bg-white/30 blur-md"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08, rotate: 3 }}
          className={`relative p-8 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.25)] ring-4 ${accent.ring}`}
        >
          <Icon size={56} className="text-white drop-shadow-lg" strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Detail modal
// ─────────────────────────────────────────────────────────────

const DetailBlock = ({ title, items }: { title: string; items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-8">
      <p className="font-bold text-sm uppercase tracking-widest text-blue-600 mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-start gap-3 text-gray-600 text-sm sm:text-base leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const TagList = ({ items }: { items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {items.map((t, i) => (
        <motion.span
          key={t}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.03 * i, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.08, y: -1 }}
          className="px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold cursor-default"
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2.5rem] sm:rounded-[3rem] bg-white shadow-2xl"
      >
        <div className="h-40 sm:h-52 relative rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden group">
          <ProjectVisual project={project} />
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="icon-btn absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-10">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">
            {project.category}
          </span>
          <h3 className="font-bebas text-5xl tracking-tight mb-2 leading-none">
            {project.title}
          </h3>
          {project.date && (
            <p className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Calendar size={14} /> {project.date}
            </p>
          )}

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-2">{project.description}</p>
          {project.overview && (
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-2">{project.overview}</p>
          )}
          {project.results && (
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
              <span className="font-bold text-gray-700">Results: </span>
              {project.results}
            </p>
          )}
          {!project.overview && !project.results && <div className="mb-8" />}

          <DetailBlock title="Key Features" items={project.features} />
          <DetailBlock title="Controls" items={project.controls} />
          <DetailBlock title="Technical Details" items={project.technicalDetails} />
          <DetailBlock title="Files" items={project.files} />

          {project.skills && project.skills.length > 0 && (
            <div className="mb-2">
              <p className="font-bold text-sm uppercase tracking-widest text-blue-600 mb-3">Skills</p>
              <TagList items={project.skills} />
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-2">
              <p className="font-bold text-sm uppercase tracking-widest text-blue-600 mb-3">Technologies</p>
              <TagList items={project.technologies} />
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-6">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ArrowUpRight size={18} /> Live Site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GitBranch size={18} /> Repository
              </a>
            )}
            {!project.github && project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <BookOpen size={18} /> Case Study
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Project card
// ─────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const accent = getAccent(project.category);
  const previewTech = (project.technologies ?? project.skills ?? []).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      {/* Ambient glow that appears behind the card on hover */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10"
        style={{ backgroundColor: accent.glow }}
      />

      <GlassCard className="p-0 overflow-hidden border border-gray-100 group-hover:border-transparent h-full flex flex-col relative shadow-[0_4px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.25)] transition-shadow duration-500">
        {/* Large faint project number, revealed on hover */}
        <span className="pointer-events-none absolute -bottom-4 -right-2 font-bebas text-[7rem] leading-none text-gray-900/[0.03] group-hover:text-gray-900/[0.06] transition-colors duration-500 select-none z-[1]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative aspect-16/10 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <ProjectVisual project={project} />
          </motion.div>
          <span className="absolute top-4 left-4 px-3 py-1.5 backdrop-blur-xl bg-black/30 border border-white/20 rounded-full text-xs font-bold text-white tracking-wide">
            {project.category}
          </span>
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bebas text-3xl tracking-tight leading-none transition-colors group-hover:text-blue-600">
              {project.title}
            </h3>
          </div>

          {project.date && (
            <p className="flex items-center gap-1.5 text-gray-400 text-xs font-bold tracking-wide mb-3">
              <Calendar size={12} /> {project.date}
            </p>
          )}

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {previewTech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {previewTech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-gray-50 border border-transparent group-hover:border-gray-200 text-gray-600 text-xs font-bold tracking-wide transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 items-center pt-5 mt-auto border-t border-gray-100">
            <motion.button
              onClick={onOpen}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-current text-blue-600 font-bold text-xs transition-all hover:gap-3"
            >
              View Details <Sparkles size={14} />
            </motion.button>
            <div className="flex-1" />
            <div className="flex gap-3">
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.12, rotate: -6 }}
                  whileTap={{ scale: 0.94 }}
                  className="icon-btn border border-gray-200 bg-white text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_0_6px_rgba(37,99,235,0.15)]"
                  aria-label={`${project.title} live site`}
                  title={`${project.title} — open live site`}
                >
                  <ArrowUpRight size={16} />
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  whileTap={{ scale: 0.94 }}
                  className="icon-btn border border-gray-200 bg-white text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_0_6px_rgba(37,99,235,0.15)]"
                  aria-label={`${project.title} repository`}
                  title={`${project.title} — view source on GitHub`}
                >
                  <GitBranch size={16} />
                </motion.a>
              )}
              {!project.github && project.caseStudyUrl && (
                <motion.a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  whileTap={{ scale: 0.94 }}
                  className="icon-btn border border-gray-200 bg-white text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_0_6px_rgba(37,99,235,0.15)]"
                  aria-label={`${project.title} case study`}
                  title={`${project.title} — read the case study`}
                >
                  <BookOpen size={16} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects" className="bg-transparent overflow-visible">
      <div className="flex flex-col mb-16 sm:mb-24">
        <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-xs mb-8">
          Portfolio Showcase
        </span>
        <h2 className="font-bebas text-6xl sm:text-8xl leading-[0.9] tracking-tighter">
          Projects <br />
          <span className="text-blue-600 italic">that matter.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
