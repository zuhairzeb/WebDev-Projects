import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';
import { GlassCard } from './GlassEffect';

const projects = [
  {
    title: 'HomeItems Marketplace',
    tag: 'Multivendor Ecommerce',
    image: 'homeitems.jpg?auto=format&fit=crop&q=80&w=1200',
    tech: ['WooCommerce', 'WordPress', 'PHP'],
    problem: 'HomeItems needed a multivendor platform where multiple sellers could manage their own products, pricing, and inventory under one branded marketplace.',
    solution: 'Built a fully custom multivendor website with a tailored theme, advanced search and filtering, and a streamlined checkout flow designed around the client\'s brand identity.',
    results: 'Delivered a responsive, fully tested marketplace that gave vendors independent control and gave customers a smooth shopping experience across all devices.',
    liveUrl: 'https://homeitemss.com/',
    caseStudyUrl: 'https://www.example.com/case-study/homeitems-marketplace'
  },
  {
    title: 'Ospherics Pharma',
    tag: 'Website Redesign',
    image: 'ospheric.png?auto=format&fit=crop&q=80&w=1200',
    tech: ['WordPress', 'SEO', 'Elementor'],
    problem: 'The brand needed a polished online presence to support product launches and investor trust.',
    solution: 'Redesigned the website with modern branding, faster navigation, and mobile-first layouts.',
    results: 'Delivered a professional site that increased lead engagement and strengthened brand trust.',
    liveUrl: 'https://ospherics.com/',
    caseStudyUrl: 'https://www.refrens.com/zuhairzeb/portfolio/674966bb0a94c604a2c3718b-redesign-website-of-ospheric'
  },
  {
    title: 'Sociapi WhatsApp Chatbot',
    tag: 'Automation Solution',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200',
    tech: ['Node.js', 'Railway', 'JavaScript'],
    problem: 'Customer support needed faster responses for common enquiries.',
    solution: 'Built a WhatsApp chatbot that handled FAQs, appointment scheduling, and lead capture.',
    results: 'Automated repetitive support tasks, improved response consistency, and freed team time for higher-value work.',
    caseStudyUrl: 'https://www.example.com/case-study/sociapi-chatbot'
  }
];

export const Projects = () => {
  
  return (
    <SectionWrapper id="projects" className="bg-transparent overflow-visible">
      <div className="flex flex-col mb-32">
        <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-8">Portfolio Showcase</span>
        <h2 className="font-bebas text-[10vw] leading-[0.8] tracking-tighter">
          PROJECTS <br />
          <span className="text-blue-600 italic">THAT MATTER.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-40">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <div className={`lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
              <div className="relative rounded-[4rem] overflow-hidden aspect-16/10 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                
                <div className="absolute top-10 left-10 flex gap-3">
                  {project.tech.map((t) => (
                    <div key={t} className="px-5 py-2 backdrop-blur-xl bg-black/20 border border-white/20 rounded-full text-[10px] font-black uppercase text-white tracking-widest">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
              <GlassCard className="p-12 border-none">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">{project.tag}</span>
                <h3 className="font-bebas text-6xl mb-6 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <div className="space-y-4 text-gray-600 mb-10">
                  <p className="font-bold text-lg">Problem</p>
                  <p>{project.problem}</p>
                  <p className="font-bold text-lg">Solution</p>
                  <p>{project.solution}</p>
                  <p className="font-bold text-lg">Results</p>
                  <p>{project.results}</p>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-black text-white hover:bg-blue-600 transition-all inline-flex items-center gap-2"
                    >
                      <ArrowUpRight size={18} /> Live Site
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 border-2 border-black rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all"
                    >
                      View Case Study
                    </a>
                  )}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};