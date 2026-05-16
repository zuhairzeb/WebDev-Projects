import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

const certificates = [
  {
    title: "Certificate of Mentorship for WordPress Interns",
    issuer: "Digital Empowerment Network",
    year: "2024",
    color: "#00FF88",
  },
  {
    title: "Crash Course on Python · Soft Skills Program (PAFLA)",
    issuer: "Google",
    year: "2024",
    color: "#4285F4",
  },
  {
    title: "Python Programming",
    issuer: "University of Pennsylvania",
    year: "2024",
    color: "#D4A574",
  },
  {
    title: "Volunteer — 4th Dosti Peshawar Literature Festival",
    issuer: "Dosti",
    year: "2025",
    color: "#22FFAA",
  },
  {
    title: "Data Analysis",
    issuer: "UNICEF",
    year: "2024",
    color: "#009EDB",
  },
  {
    title: "Data Analytics Internship Program",
    issuer: "Elevvo Pathways",
    year: "Sep 2025",
    color: "#00FF88",
  },
];

export default function Certificates() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certificates" ref={ref} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            <span className="text-foreground">Certi</span>
            <span className="text-primary">ficates</span>
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-transparent rounded-full mb-4" />
          <p className="text-muted-foreground font-mono text-sm">Verified credentials from recognised organisations</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group cursor-default"
            >
              <div
                className="relative flex items-start gap-3 p-4 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 h-full"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${cert.color}30`;
                  el.style.boxShadow = `0 4px 24px ${cert.color}10`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.boxShadow = '';
                }}
              >
                {/* Left colour strip */}
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300"
                  style={{ background: cert.color, opacity: 0.4 }}
                />

                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                >
                  <BadgeCheck size={16} style={{ color: cert.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs" style={{ color: cert.color, opacity: 0.75 }}>
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{cert.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
