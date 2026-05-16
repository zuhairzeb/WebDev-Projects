import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'Power BI', level: 85, category: 'Data Visualization', description: 'Interactive dashboards, DAX formulas, data modeling, and business intelligence reporting.' },
  { name: 'Excel', level: 90, category: 'Data Analysis', description: 'Advanced formulas, pivot tables, VLOOKUP, data cleaning, and financial modeling.' },
  { name: 'Python', level: 80, category: 'Programming', description: 'Data pipelines, scripting, automation, and analytical workflows.' },
  { name: 'SQL', level: 82, category: 'Database', description: 'Complex queries, joins, subqueries, aggregations, and database design.' },
  { name: 'Pandas', level: 78, category: 'Data Science', description: 'DataFrame manipulation, data wrangling, merging, groupby operations.' },
  { name: 'NumPy', level: 72, category: 'Data Science', description: 'Numerical computing, array operations, statistical analysis.' },
  { name: 'Matplotlib', level: 75, category: 'Visualization', description: 'Static charts, plots, custom visualizations, and figure styling.' },
  { name: 'Seaborn', level: 70, category: 'Visualization', description: 'Statistical data visualization, heatmaps, distribution plots.' },
  { name: 'Linux', level: 65, category: 'OS / DevOps', description: 'Command line, shell scripting, file management, and system operations.' },
];

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-lg border p-3 md:p-4 transition-all duration-300 cursor-pointer"
        style={{
          borderColor: hovered ? 'rgba(0,200,83,0.5)' : 'rgba(0,200,83,0.15)',
          background: hovered ? 'rgba(0,200,83,0.06)' : 'transparent',
        }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-bold text-sm md:text-base" style={{ color: hovered ? '#00C853' : 'inherit' }}>
              {skill.name}
            </span>
            <span className="font-mono text-[10px] md:text-xs px-1.5 py-0.5 rounded" style={{ color: '#2D7D4E', background: 'rgba(45,125,78,0.15)', border: '1px solid rgba(45,125,78,0.3)' }}>
              {skill.category}
            </span>
          </div>
          <span className="font-mono font-bold text-sm" style={{ color: '#00C853' }}>
            {isInView ? skill.level : 0}%
          </span>
        </div>

        <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: 'linear-gradient(90deg, #1F5A3F, #00C853)',
              boxShadow: hovered ? '0 0 14px rgba(0,200,83,0.7)' : '0 0 6px rgba(0,200,83,0.3)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-muted-foreground">
            {skill.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(ellipse, #00C853 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 text-foreground">
            Technical{' '}
            <span style={{ color: '#00C853' }}>Skills</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '70px' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #1F5A3F, #00C853)' }}
          />
          <p className="mt-3 text-muted-foreground font-mono text-sm">Tap any skill to read more</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
