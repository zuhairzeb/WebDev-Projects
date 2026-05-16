import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Users } from 'lucide-react';

const experiences = [
  {
    year: "Aug 2025 – Sep 2025",
    title: "Data Analyst Intern",
    company: "Elevvo Pathways",
    location: "Cairo, Egypt (Remote)",
    type: "work",
    description: "Built and designed interactive dashboards using Power BI. Created DAX measures for KPIs such as Revenue, Average Order Value, and Delivery Rate. Analyzed sales and operations data to generate insights for business decisions. Improved reporting efficiency by automating recurring reports.",
    tags: ["Power BI", "DAX", "Data Visualization", "KPI Analysis", "Report Automation"],
  },
  {
    year: "Aug 2025",
    title: "Human Resources Volunteer",
    company: "The Order Of Pen",
    location: "Peshawar (On-site)",
    type: "volunteer",
    description: "Assisted in onboarding and coordinating volunteers for events. Maintained attendance records and supported team communication. Helped resolve volunteer queries and ensured smooth collaboration. Collected feedback to improve future activities.",
    tags: ["HR Coordination", "Event Support", "Team Communication", "Volunteer Management"],
  },
  {
    year: "2024 – Present",
    title: "Founder & Community Lead",
    company: "Sociapi Society",
    location: "Peshawar, Pakistan",
    type: "work",
    description: "Founded and built Sociapi Society — a student-led tech community focused on Artificial Intelligence and Data Science. Recruited members, set the community's learning direction, and successfully planned and executed 2 tech events that brought together AI enthusiasts, developers, and professionals from across the region.",
    tags: ["Leadership", "Community Building", "Event Management", "AI / Data Science"],
  },
  {
    year: "Jul 2024 – Nov 2024",
    title: "WordPress Mentor & Intern",
    company: "Digital Empowerment Network",
    location: "Pakistan",
    type: "work",
    description: "Served as both a WordPress mentor and development intern. Conducted training sessions for 2–3 batches of students, teaching them how to create and manage websites using WordPress. Covered plugin configurations, on-page SEO techniques, and performance optimization best practices.",
    tags: ["WordPress", "Web Development", "Teaching", "SEO", "Mentorship"],
  },
];

const education = [
  {
    year: "2023 – Present",
    title: "Bachelor of Science in Artificial Intelligence",
    company: "University, Peshawar",
    location: "Peshawar, Pakistan",
    type: "education",
    description: "Pursuing an undergraduate degree in Artificial Intelligence with strong focus on data analytics, machine learning fundamentals, statistical analysis, and applied mathematics. Coursework includes database systems, Python programming, data structures, and AI algorithms.",
    tags: ["Artificial Intelligence", "Machine Learning", "Data Analytics", "Python", "Statistics"],
  },
];

function TimelineCard({
  item,
  index,
  side,
}: {
  item: (typeof experiences)[0];
  index: number;
  side: 'left' | 'right';
}) {
  const Icon = item.type === 'education' ? GraduationCap : item.type === 'volunteer' ? Users : Briefcase;

  return (
    <div className={`relative flex flex-col md:flex-row items-start ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
      {/* Center node */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 translate-y-7 z-10 flex items-center justify-center">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          style={{ boxShadow: '0 0 8px rgba(0,255,136,0.9)' }}
        />
        <motion.div className="absolute inset-0 border border-primary rounded-full animate-ping opacity-30" />
      </div>

      {/* Content */}
      <motion.div
        className={`pl-12 md:pl-0 w-full md:w-[46%] ${side === 'left' ? 'md:pr-12' : 'md:pl-12'}`}
        initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 120 }}
      >
        <div
          className="relative p-4 md:p-5 bg-card/60 border border-border backdrop-blur-sm group hover:border-primary/40 transition-all duration-300 rounded-sm"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,255,136,0.08)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'; }}
        >
          <div className={`absolute top-0 h-full w-[3px] bg-primary/20 group-hover:bg-primary transition-colors duration-300 rounded-sm ${side === 'left' ? 'right-0 md:left-0' : 'left-0'}`} />

          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 border border-primary/20">
              <Icon size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-primary text-[11px] block mb-0.5">{item.year}</span>
              <h3 className="text-base md:text-lg font-display font-bold text-foreground leading-tight">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
                <span className="font-mono text-sm font-semibold text-secondary">{item.company}</span>
                <span className="text-muted-foreground text-xs font-mono">· {item.location}</span>
              </div>
            </div>
          </div>

          <p className="text-foreground/70 font-sans leading-relaxed text-sm mb-3">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.18)', color: 'rgba(0,255,136,0.8)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-16 md:py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold inline-block relative">
            <span className="text-foreground">Experience</span>
            {' '}
            <span className="text-primary">&</span>
            {' '}
            <span className="text-foreground">Education</span>
            <motion.div
              className="absolute -bottom-3 left-0 h-[3px] bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ boxShadow: '0 0 8px rgba(0,255,136,0.6)' }}
            />
          </h2>
          <p className="mt-6 text-muted-foreground font-mono text-sm">Professional work · Internships · Volunteer · Academic background</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 overflow-hidden pointer-events-none">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
              style={{ scaleY: pathScale, height: '100%' }}
            />
          </div>

          {/* Experience entries */}
          <div className="space-y-10 md:space-y-14 mb-16 md:mb-20">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} item={exp} index={i} side={i % 2 === 0 ? 'right' : 'left'} />
            ))}
          </div>

          {/* Education divider */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-12 md:mb-14 pl-12 md:pl-0"
          >
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 flex-shrink-0">
              <GraduationCap size={13} className="text-secondary" />
              <span className="font-mono text-xs text-secondary tracking-widest uppercase">Education</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {/* Education */}
          <div className="space-y-10">
            {education.map((edu, i) => (
              <TimelineCard key={i} item={edu} index={i} side="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
