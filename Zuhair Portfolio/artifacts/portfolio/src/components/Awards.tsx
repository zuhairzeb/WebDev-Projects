import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, HeartHandshake, Star } from 'lucide-react';

const awards = [
  {
    icon: Trophy,
    title: "Top Performer Volunteer Award",
    issuer: "Dosti Peshawar",
    year: "2025",
    description: "Honored as a Top Performer Volunteer at the 4th DOSTI Peshawar Literature Festival 2025 for outstanding contribution and dedication to literary and cultural initiatives.",
    color: "#00FF88",
  },
  {
    icon: HeartHandshake,
    title: "Organizer — International Thalassemia Day",
    issuer: "Khyber Medical University · Dosti",
    year: "May 2025",
    description: "Participated as an event organizer in collaboration with various health organizations to raise awareness about Thalassemia.",
    color: "#D4A574",
  },
  {
    icon: Star,
    title: "Outstanding Contributor Award",
    issuer: "Elevvo Pathways",
    year: "Sep 2025",
    description: "Received the Outstanding Contributor Award from Elevvo for exceptional performance in their Data Analytics Program. Strengthened skills in Power BI, Excel, Python, SQL, and data storytelling while collaborating with industry professionals.",
    color: "#22FFAA",
  },
];

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="awards" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,136,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            <span className="text-primary" style={{ textShadow: 'none' }}>Awards</span>
            {' '}
            <span className="text-foreground">&amp; Recognition</span>
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-transparent rounded-full mb-4" />
          <p className="text-muted-foreground font-mono text-sm">Real honours and recognition received</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative group cursor-default"
              >
                <div
                  className="h-full relative rounded-xl border bg-card/60 backdrop-blur-sm p-5 overflow-hidden transition-all duration-400"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${award.color}35`;
                    el.style.boxShadow = `0 8px 40px ${award.color}15, 0 0 0 1px ${award.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.boxShadow = '';
                  }}
                >
                  {/* Top accent strip */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                    style={{ background: `linear-gradient(90deg, ${award.color}60, transparent)` }} />

                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${award.color}12`, border: `1px solid ${award.color}28` }}
                  >
                    <Icon size={20} style={{ color: award.color }} />
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-foreground text-sm leading-snug flex-1">{award.title}</h3>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: award.color, background: `${award.color}12`, border: `1px solid ${award.color}22` }}
                    >
                      {award.year}
                    </span>
                  </div>

                  <p className="text-xs font-mono mb-3" style={{ color: award.color, opacity: 0.7 }}>
                    {award.issuer}
                  </p>

                  <p className="text-sm text-foreground/65 leading-relaxed">{award.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
