import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const experiences = [
  {
    role: 'WordPress Developer Intern',
    company: 'Kaizen Hive',
    period: 'Jul 2026 - Aug 2026',
    desc: 'Completed a comprehensive WordPress training program covering 45+ practical tasks on a live training institute website. Configured on-page SEO, built site navigation with dropdowns, set up theme activation and branding, managed media library, performed quality assurance, handled user management and security, configured core site settings, performed maintenance tasks, and executed content migration workflows with full documentation and screenshots following professional QA practices.'
  },
  {
    role: 'Data Analytics Intern',
    company: 'Elevvo Pathways',
    period: 'Aug 2025 - Sep 2025',
    desc: 'Built and designed interactive dashboards using Power BI. Created DAX measures for key performance indicators including Revenue, Average Order Value, and Delivery Rate. Analyzed sales and operations data to generate actionable business insights. Improved reporting efficiency by automating recurring reports.'
  },
  {
    role: 'Founder & President',
    company: 'Sociapi Society',
    period: 'Present',
    desc: 'Leading a community focused on social impact and technology.'
  },
  {
    role: 'Freelance WordPress Developer',
    company: 'Self-Employed',
    period: '2021 – Present',
    desc: 'Delivering custom WordPress solutions and ecommerce platforms globally.'
  },
  {
    role: 'WordPress Mentor',
    company: 'Digital Empowerment Network',
    period: '2024',
    desc: 'Training and mentoring aspiring developers in WordPress and web technologies.'
  },
  {
    role: 'HR Volunteer',
    company: 'The Order of Pen',
    period: '2025',
    desc: 'Assisting in human resource management and community outreach.'
  }
];

const certificates = [
  'WordPress Virtual Internship Program',
  'WordPress Mentor Recognition',
  'Web Development Course',
  'Pakistan Freelancers Association Member'
];

import { SectionWrapper } from './SectionWrapper';

export const Career = () => {
  return (
    <SectionWrapper id="career">
      {/* Shared section header — spans both columns so the sidebar
          and the timeline start from the same baseline. */}
      <div className="mb-16">
        <span className="text-blue-600 font-bold tracking-[0.3em] text-xs block mb-8">Professional Journey</span>
        <h2 className="font-bebas text-6xl sm:text-8xl leading-[0.9] tracking-tighter">
          Experience <br />
          <span className="text-blue-600">&</span> awards.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 lg:pr-6 lg:border-r lg:border-gray-100">
          {/*
            Sticky sidebar: stays paired with the timeline while the
            visitor scrolls instead of leaving dead white space.
          */}
          <div className="lg:sticky lg:top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <h3 className="font-bebas text-3xl mb-6 text-blue-600">Certifications</h3>
                <div className="space-y-5">
                  {certificates.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 group border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-relaxed pr-4">{cert}</h4>
                      <Award size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-gray-900">
                <h3 className="font-bebas text-3xl mb-6 text-blue-600">Achievements</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="font-bold">Outstanding Contributor</span>
                    <span className="text-xs text-gray-500">2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Top Performer Volunteer</span>
                    <span className="text-xs text-gray-500">2025</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="lg:col-span-8 lg:pl-4">
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative pb-10 border-b border-gray-100 last:border-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <h3 className="font-bebas text-3xl sm:text-4xl tracking-tight group-hover:text-blue-600 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-400 font-semibold text-xs mb-3">{exp.company}</p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
