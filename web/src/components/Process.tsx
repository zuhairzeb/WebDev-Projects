import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Planning",
    desc: "Understanding goals, requirements, and challenges.",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Creating scalable solutions and workflows.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Building secure and high-performance systems.",
  },
  {
    num: "04",
    title: "Testing & Optimization",
    desc: "Improving speed, reliability, and user experience.",
  },
  {
    num: "05",
    title: "Launch & Support",
    desc: "Deployment, maintenance, and continuous improvement.",
  },
];

import { SectionWrapper } from "./SectionWrapper";

export const Process = () => {
  return (
    <SectionWrapper id="process" dark>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-blue-400 font-bold tracking-wider text-xs block mb-6">
          Workflow
        </span>
        <h2 className="font-bebas text-6xl sm:text-8xl leading-none mb-6">
          How I <span className="text-blue-400">operate.</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
          A clear, structured 5-step process designed for reliable execution and
          high-quality results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-blue-400 font-bebas text-3xl mb-2 block">
                {step.num}
              </span>
              <h3 className="font-bebas text-2xl mb-2 tracking-tight text-white">
                {step.title}
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Full-width closing CTA — centred below the steps so the
          numbered grid stays balanced instead of leaving a dead
          corner cell in the bottom-right. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center"
      >
        <h3 className="font-bebas text-3xl text-white">Ready to start?</h3>
        <a
          href="https://beacons.ai/zuhairzeb"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-10 py-4 text-base"
        >
          Let's Talk
        </a>
      </motion.div>
    </SectionWrapper>
  );
};
