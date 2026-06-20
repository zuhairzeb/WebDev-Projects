import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlassCard } from './GlassEffect';
import { VideoPlayer, VIDEOS } from './VideoAssets';

const STATS = [
  { value: '20+', label: 'Projects' },
  { value: '300+', label: 'Event Organizers' },
  { value: '9+', label: 'Certifications' },
  { value: '4+', label: 'Years Experience' },
];

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <section className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-40 right-[10%] w-40 h-40 bg-blue-700/15 backdrop-blur-2xl border border-white/30 rounded-4xl -z-10 hidden lg:block"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 left-[5%] w-60 h-60 bg-gradient-to-tr from-blue-700/10 to-cyan-400/15 backdrop-blur-3xl border border-blue-700/10 rounded-full -z-10 hidden lg:block"
      />

      <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center gap-2 mb-10 px-5 py-2 rounded-full bg-blue-700/10 border border-blue-700/20 w-fit"
          >
            <Sparkles size={14} className="text-blue-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">
              Zuhair Portfolio
            </span>
            <span className="ml-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-black px-3 py-1 text-[10px] text-white font-semibold">
              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-white"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Available for Internships &amp; Entry-Level Roles
            </span>
          </motion.div>

          {/* ✅ FIXED HEADING — no R/ZEB overlap */}
          <div className="relative mb-12">
            <h1 className="font-bebas tracking-tighter">

              {/* Line 1: MUHAMMAD */}
              <div className="overflow-hidden leading-[0.85]">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem]"
                >
                  MUHAMMAD
                </motion.span>
              </div>

              {/* Line 2: ZUHAIR + ZEB — same line, pr-4 on ZUHAIR prevents R bleed */}
              <div className="overflow-hidden leading-[0.85]">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="flex items-baseline"
                >
                  <span
                    className="italic bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem] pr-3 sm:pr-4"
                  >
                    ZUHAIR
                  </span>
                  <span
                    className="text-black text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem]"
                  >
                    ZEB
                  </span>
                </motion.div>
              </div>

            </h1>
          </div>

          {/* ✅ FIXED DESCRIPTION — punchy, not cheap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            {/* Role tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Data Analyst', 'WordPress Dev', 'Community Founder'].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full border border-blue-700/30 bg-blue-700/5 text-blue-700 text-xs font-bold uppercase tracking-widest"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Main tagline */}
            <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
              Raw data becomes sharp decisions.{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-700">Blank pages become real products.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-700/20 origin-left rounded-full"
                />
              </span>
            </p>

            {/* Sub-tagline */}
            <p className="text-base text-gray-400 font-medium tracking-wide">
              Shipping work that actually moves the needle — not just fills a portfolio.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
            <a
              href="/resume.pdf"
              className="inline-flex justify-center px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-blue-700 transition-all min-w-[180px]"
            >
              Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex justify-center px-8 py-4 border-2 border-black rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-blue-700 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-700/15 transition-all min-w-[180px]"
            >
              View Projects
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} className="group">
                <div className="flex items-end gap-1 h-5 mb-2">
                  {[6, 12, 18].map((h, j) => (
                    <motion.span
                      key={j}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ delay: 0.9 + i * 0.1 + j * 0.06, duration: 0.5, ease: 'easeOut' }}
                      style={{ width: 4 }}
                      className="rounded-full bg-blue-700 group-hover:bg-cyan-500 transition-colors"
                    />
                  ))}
                </div>
                <div className="text-3xl font-bebas text-blue-700 leading-none">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Video + Founder Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative max-w-sm mx-auto w-full"
        >
          {/* Video */}
          <div className="relative z-20">
            <VideoPlayer
              src={VIDEOS.hero}
              className="w-full h-auto max-w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-[4rem] object-cover"
            />
          </div>

          {/* ✅ FIXED: Founder card — visible on ALL screens, not just xl */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-[60%] -right-4 md:-right-8 z-30"
          >
            <GlassCard className="p-4 xl:p-6 w-44 xl:w-56">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-bebas text-base xl:text-lg leading-tight">Founder</h4>
                  <p className="text-[8px] xl:text-[9px] text-gray-500 uppercase font-bold tracking-widest">
                    Sociapi Society
                  </p>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 2, duration: 2 }}
                  className="h-full bg-blue-700"
                />
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};