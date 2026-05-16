import { motion } from 'framer-motion';

const languages = [
  { name: 'English', level: 'Professional', pct: 88, color: '#00FF88' },
  { name: 'Urdu', level: 'Native', pct: 100, color: '#22FFAA' },
  { name: 'Pashto', level: 'Native', pct: 100, color: '#D4A574' },
];

export default function About() {
  const stats = [
    { label: "Events Organized", value: "2", suffix: "" },
    { label: "Projects", value: "5", suffix: "+" },
    { label: "Society Founded", value: "1", suffix: "" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold inline-block relative">
            <span className="text-foreground">ABOUT</span>{' '}
            <span className="text-secondary">_INIT</span>
            <motion.div
              className="absolute -bottom-3 left-0 h-[3px] bg-secondary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Stats */}
          <motion.div
            className="md:col-span-4 grid gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="relative p-5 border border-primary/20 bg-background/50 backdrop-blur-sm group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-bottom transform scale-y-0 transition-transform group-hover:scale-y-100" />
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {stat.value}<span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="font-mono text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}

            {/* Languages */}
            <div className="p-5 border border-primary/20 bg-background/50 backdrop-blur-sm">
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Languages</div>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-sans text-sm font-semibold text-foreground">{lang.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                        style={{ background: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio + status */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="max-w-none">
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed font-sans mb-5">
                I am an undergraduate student in{' '}
                <span className="text-primary font-bold">Artificial Intelligence</span>{' '}
                building my career as a Data Analyst. I enjoy working with data, creating dashboards, and finding insights that help solve real problems.
              </p>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed font-sans mb-6">
                Skilled in{' '}
                <span className="text-primary font-bold">Python</span>, SQL, Excel, and Power BI, I have hands-on experience in data analysis and visualization through internships, freelance projects, and community leadership. My goal is to grow as a Data Analyst and apply my skills to meaningful, impact-driven projects.
              </p>

              <div className="inline-flex items-center gap-4 px-5 py-4 border border-accent/30 bg-accent/5 rounded-sm w-full md:w-auto">
                <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-40" />
                  <div className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <div>
                  <div className="text-xs text-accent font-mono uppercase tracking-wider mb-1">Current Status</div>
                  <div className="text-foreground font-bold text-sm md:text-base">Founder of Sociapi Society · Open to Work</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
