import { motion } from 'framer-motion';
import { VideoPlayer } from './VideoAssets';

const steps = [
  {
    num: '01',
    title: 'Discovery & Planning',
    desc: 'Understanding goals, requirements, and challenges.'
  },
  {
    num: '02',
    title: 'Design & Architecture',
    desc: 'Creating scalable solutions and workflows.'
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Building secure and high-performance systems.'
  },
  {
    num: '04',
    title: 'Testing & Optimization',
    desc: 'Improving speed, reliability, and user experience.'
  },
  {
    num: '05',
    title: 'Launch & Support',
    desc: 'Deployment, maintenance, and continuous improvement.'
  }
];

import { SectionWrapper } from './SectionWrapper';

export const Process = () => {
  return (
    <SectionWrapper id="process" dark>
      <div className="flex flex-col items-center text-center mb-24">
        <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs block mb-8">Workflow</span>
        <h2 className="font-bebas text-6xl sm:text-8xl md:text-[10rem] leading-none mb-8">
          HOW I <span className="text-blue-400">OPERATE.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="space-y-4">
            {steps.slice(0, 3).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="text-blue-400 font-bebas text-2xl mb-2 block">{step.num}</span>
                <h3 className="font-bebas text-3xl mb-2 tracking-tight">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
          <div className="relative rounded-[3rem] bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden">
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] border border-dashed border-white/10 rounded-full"
            />
            <VideoPlayer src="/desktop.mp4" className="w-full max-w-sm relative z-10" />
          </div>
        </div>

        <div className="lg:col-span-4 order-3">
          <div className="space-y-4">
            {steps.slice(3).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="text-blue-400 font-bebas text-2xl mb-2 block">{step.num}</span>
                <h3 className="font-bebas text-3xl mb-2 tracking-tight">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
            <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white flex flex-col justify-center items-center text-center">
              <h3 className="font-bebas text-3xl mb-2">READY TO START?</h3>
              <a
                href="https://beacons.ai/zuhairzeb"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest mt-2 hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};