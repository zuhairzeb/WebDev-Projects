import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "E-Commerce Sales Performance Dashboard",
    description: "Analyzed 100K+ sales transactions, built interactive Power BI dashboard tracking KPIs, revenue trends, and product performance.",
    tags: ["Power BI", "Data Analysis", "KPI Tracking"],
    color: "primary"
  },
  {
    title: "Customer Insights & Retention Analysis",
    description: "Python + Pandas pipeline for customer segmentation and churn prediction. Identified high-risk segments reducing potential churn by 23%.",
    tags: ["Python", "Pandas", "Predictive Analytics"],
    color: "secondary"
  },
  {
    title: "Revenue Forecasting & Trend Analysis",
    description: "SQL + Python time-series analysis for revenue trend identification. Automated reporting saved 8 hours/week.",
    tags: ["SQL", "Python", "Time-series"],
    color: "accent"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateX(((e.clientY - rect.top - cy) / cy) * -8);
    setRotateY(((e.clientX - rect.left - cx) / cx) * 8);
  };

  const hoverBorderColor = {
    primary: 'group-hover:border-primary group-hover:shadow-[0_0_28px_rgba(0,200,83,0.25)]',
    secondary: 'group-hover:border-secondary group-hover:shadow-[0_0_28px_rgba(212,165,116,0.25)]',
    accent: 'group-hover:border-accent group-hover:shadow-[0_0_28px_rgba(0,200,83,0.25)]',
  };
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`relative p-5 md:p-8 h-full bg-background/60 backdrop-blur-md border border-border transition-all duration-300 group flex flex-col ${hoverBorderColor[project.color as keyof typeof hoverBorderColor]}`}
    >
      <div className="mb-4 md:mb-6 flex-1" style={{ transform: 'translateZ(24px)' }}>
        <h3 className="text-lg md:text-2xl font-display font-bold text-foreground mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-foreground/70 font-sans leading-relaxed text-sm md:text-base">
          {project.description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(16px)' }} className="mt-auto">
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-[10px] md:text-xs font-mono px-2 py-0.5 md:py-1 rounded-sm text-foreground/70"
              style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.18)' }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="h-8 relative overflow-hidden flex items-center">
          <span className={`font-mono text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${colorMap[project.color as keyof typeof colorMap]}`}>
            &gt; VIEW_PROJECT
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold inline-block relative">
            <span className="text-foreground">DEPLOYED</span>{' '}
            <span className="text-accent">_MODULES</span>
            <motion.div
              className="absolute -bottom-3 left-0 h-[3px] bg-accent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
