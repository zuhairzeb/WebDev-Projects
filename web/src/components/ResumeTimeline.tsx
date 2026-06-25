import { SectionWrapper } from './SectionWrapper';
import { CalendarDays, Sparkles, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const timeline = [
  { year: '2021', title: 'Freelance WordPress Developer', company: 'Self-Employed', icon: Briefcase, bullets: ['Built 10+ custom WordPress sites and WooCommerce stores for clients globally'] },
  { year: '2024', title: 'WordPress Intern & Mentor', company: 'Digital Empowerment Network', icon: Sparkles, bullets: ['Mentored 60+ interns in WordPress development and SEO'] },
  { year: '2025', title: 'Founder — Sociapi Society', company: 'Sociapi', icon: Users, bullets: ['Grew community to 300+ event attendees and organized workshops'] },
  { year: '2026', title: 'Open to Opportunities', company: 'Seeking Roles', icon: CalendarDays, bullets: ['Looking for freelance and entry level roles in WordPress development'] },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const ResumeTimeline = () => {
  return (
    <SectionWrapper id="timeline" className="bg-gray-900 text-white overflow-visible">
      <div className="text-center mb-12">
        <span className="text-blue-300 font-bold tracking-[0.3em] uppercase text-xs block mb-4">Experience</span>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tight">
          PROFESSIONAL <span className="text-blue-400 italic">EXPERIENCE</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 mt-4">Selected roles, projects and leadership that demonstrate delivery and impact.</p>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div variants={item} key={`${item.year}-${index}`} className="flex gap-6 p-8 rounded-4xl bg-white/5 border border-white/10">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-3xl bg-blue-400/10 text-blue-300 p-3">
                  <Icon size={20} />
                </div>
                {index < timeline.length - 1 && <span className="h-full w-px bg-white/10" />}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-2">{item.year} • {item.company}</p>
                <h3 className="font-bebas text-2xl tracking-tight mb-2">{item.title}</h3>
                <ul className="text-gray-300 list-disc ml-5 space-y-1">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="text-sm">{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
};