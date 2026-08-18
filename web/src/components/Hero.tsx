import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GitBranch, Sparkles, Star, ArrowRight, Code2, Rocket, Zap, ChevronDown, Terminal, Braces, Database, Globe, Palette, Cpu } from 'lucide-react';
import { GlassCard } from './GlassEffect';
import { VideoPlayer, VIDEOS } from './VideoAssets';

const STATS = [
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 300, suffix: '+', label: 'Organizers' },
  { value: 9, suffix: '+', label: 'Certifications' },
  { value: 4, suffix: '+', label: 'Years Exp' },
];

const TECH_STACK = [
  { name: 'WordPress', icon: <Globe size={13} />, color: 'from-blue-500 to-blue-600' },
  { name: 'WooCommerce', icon: <Braces size={13} />, color: 'from-purple-500 to-purple-600' },
  { name: 'PHP', icon: <Code2 size={13} />, color: 'from-indigo-500 to-indigo-600' },
  { name: 'MySQL', icon: <Database size={13} />, color: 'from-emerald-500 to-emerald-600' },
];

const GITHUB_URL = 'https://github.com/zuhairzeb';

const CountUp = ({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    let frame: number;
    
    const easeOutExpo = (x: number) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };
    
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      setValue(Math.round(easedProgress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 30]);
  const y2 = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-24 pb-16 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Soft gradient orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 via-indigo-50/30 to-purple-100/40 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-100/30 to-teal-50/30 rounded-full blur-3xl"
      />

      <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN - Fresh, minimal, modern */}
        <div className="lg:col-span-7">
          
          {/* Modern badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-600">
              Available for freelance work
            </span>
          </motion.div>

          {/* Editorial heading */}
          <div className="mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-bebas text-[4.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.9] tracking-tight text-gray-900"
            >
              MUHAMMAD
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <h1 className="font-bebas text-[4.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ZUHAIR
                </span>
              </h1>
              <h1 className="font-bebas text-[4.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.9] tracking-tight text-gray-900">
                ZEB
              </h1>
            </motion.div>
          </div>

          {/* Role with icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 mb-5 text-sm"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">
              <Code2 size={14} />
              WordPress Developer
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full font-medium">
              <Cpu size={14} />
              WooCommerce Specialist
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
              <Rocket size={14} />
              Community Founder
            </span>
          </motion.div>

          {/* Clean description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 max-w-lg"
          >
            I craft <span className="text-gray-900 font-semibold">fast, beautiful WordPress sites</span> that 
            help businesses grow and convert better.
          </motion.p>

          {/* CTA buttons - modern minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              <GitBranch size={16} />
              GitHub
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex justify-center items-center gap-2 px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              View Projects
            </motion.a>
          </motion.div>

          {/* Tech stack - clean pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {TECH_STACK.map((tech) => (
              <motion.span
                key={tech.name}
                whileHover={{ scale: 1.05, y: -1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="text-gray-500">{tech.icon}</span>
                {tech.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats - minimal horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-8 sm:gap-12"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Video with modern styling */}
        <div className="lg:col-span-5 relative max-w-sm mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Subtle glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-200/40 via-indigo-100/30 to-purple-200/40 rounded-[3.5rem] blur-xl" />
            
            <div className="relative z-20">
              <VideoPlayer
                src={VIDEOS.hero}
                className="w-full h-auto max-w-full drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] rounded-[3rem] object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Founder card - modern glass */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}
              className="absolute top-[55%] sm:top-[60%] -right-2 sm:-right-6 md:-right-8 z-30"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <GlassCard className="p-4 w-40 sm:w-48 backdrop-blur-xl bg-white/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm leading-tight">Founder</h4>
                      <p className="text-[9px] text-gray-500 font-medium tracking-wide">
                        Sociapi Society
                      </p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ delay: 1.8, duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Rating chip */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 1.1, duration: 0.7, type: 'spring' }}
              className="absolute -top-6 -right-2 sm:-right-8 z-30"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <GlassCard className="px-4 py-2.5 bg-white/80 backdrop-blur-xl flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-sm">5.0</span>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Floating badges */}
            {['Fast', 'SEO', 'Secure'].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{
                  opacity: { delay: 1.3 + i * 0.15, duration: 0.5 },
                  scale: { delay: 1.3 + i * 0.15, duration: 0.5, type: 'spring' },
                  y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }
                }}
                className={`hidden sm:flex items-center gap-1.5 absolute z-10 px-3 py-1.5 bg-white shadow-md border border-gray-200 rounded-full text-xs font-semibold text-gray-700 ${
                  i === 0 ? '-left-6 top-[20%]' : i === 1 ? '-left-10 top-[45%]' : 'top-[75%] right-0'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${
                  i === 0 ? 'from-blue-500 to-blue-600' : 
                  i === 1 ? 'from-emerald-500 to-emerald-600' : 
                  'from-purple-500 to-purple-600'
                }`} />
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-gray-400"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};