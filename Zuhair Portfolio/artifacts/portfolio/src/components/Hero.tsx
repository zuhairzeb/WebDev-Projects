import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

/* ── HUD corner bracket ── */
function HUDCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const h = pos.startsWith('t') ? 'top-0' : 'bottom-0';
  const v = pos.endsWith('l') ? 'left-0' : 'right-0';
  const bh = pos.startsWith('t') ? 'top-0' : 'bottom-0';
  const bv = pos.endsWith('l') ? 'left-0' : 'right-0';
  return (
    <div className={`absolute w-7 h-7 ${h} ${v}`}>
      <div className={`absolute ${bh} ${bv} w-full h-[2px] bg-primary opacity-50`} />
      <div className={`absolute ${bh} ${bv} w-[2px] h-full bg-primary opacity-50`} />
    </div>
  );
}

/* ── Hex grid SVG overlay ── */
function HexGrid() {
  const hexPath = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M ${pts.join(' L ')} Z`;
  };
  const cols = 14;
  const rows = 8;
  const r = 38;
  const w = r * Math.sqrt(3);
  const h = r * 1.5;
  const hexes: { d: string; delay: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * w + (row % 2 === 0 ? 0 : w / 2);
      const cy = row * h;
      hexes.push({ d: hexPath(cx, cy, r - 2), delay: (row + col) * 0.05 });
    }
  }
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.04 }}
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${cols * w} ${rows * h}`}
    >
      {hexes.map(({ d }, i) => (
        <path key={i} d={d} fill="none" stroke="#00FF88" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

/* ── Circuit trace lines ── */
function CircuitLines() {
  const traces = [
    "M 5,30 L 20,30 L 20,60 L 40,60",
    "M 5,70 L 15,70 L 15,50 L 30,50",
    "M 95,20 L 80,20 L 80,45 L 65,45",
    "M 95,75 L 85,75 L 85,55 L 70,55",
    "M 5,85 L 25,85 L 25,92",
    "M 95,10 L 78,10 L 78,18",
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
      {traces.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#00FF88"
          strokeWidth="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
        />
      ))}
      {/* Nodes at junctions */}
      {[
        [20, 30], [20, 60], [40, 60], [15, 70], [15, 50],
        [80, 20], [80, 45], [85, 75], [85, 55],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r="0.8"
          fill="#00FF88"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

/* ── Neural network lines ── */
function NeuralLines() {
  const nodes = [
    { x: 8, y: 18 }, { x: 22, y: 48 }, { x: 8, y: 78 },
    { x: 90, y: 14 }, { x: 94, y: 52 }, { x: 88, y: 82 },
    { x: 50, y: 4 }, { x: 50, y: 92 },
  ];
  const connections = [[0,1],[1,2],[3,4],[4,5],[0,6],[3,6],[2,7],[5,7],[1,4],[6,4]];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" preserveAspectRatio="none">
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
          x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
          stroke="#00FF88" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0,1,1,0], opacity: [0,0.7,0.7,0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r="2.5" fill="#00FF88"
          animate={{ opacity: [0.15, 1, 0.15], r: [1.5, 3.5, 1.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </svg>
  );
}

/* ── Data stream column ── */
function DataStream({ x, delay }: { x: string; delay: number }) {
  const chars = '01アイウエオAIML10'.split('');
  return (
    <div className="absolute top-0 pointer-events-none overflow-hidden h-full opacity-20" style={{ left: x, width: '14px' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="font-mono text-[8px] text-primary block text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 1, 0], y: [-20, 420] }}
          transition={{ duration: 3.5 + Math.random() * 2, repeat: Infinity, delay: delay + i * 0.28, ease: 'linear' }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Floating stat bubble ── */
function FloatingStat({ label, value, x, y, delay }: { label: string; value: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 } }}
    >
      <div className="px-3 py-2 rounded border text-center backdrop-blur-md"
        style={{ borderColor: 'rgba(0,255,136,0.25)', background: 'rgba(0,255,136,0.05)' }}>
        <div className="text-primary font-display font-bold text-lg leading-none">{value}</div>
        <div className="text-muted-foreground font-mono text-[9px] uppercase tracking-wider mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

/* ── Orbiting ring ── */
function OrbitRing({ size, duration, delay, color, dashed }: { size: number; duration: number; delay: number; color: string; dashed?: boolean }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, top: '50%', left: '50%', marginLeft: -size / 2, marginTop: -size / 2, border: `1px ${dashed ? 'dashed' : 'solid'} ${color}` }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = ['Data Analyst', 'AI Student', 'Power BI Developer', 'Dashboard Designer', 'Founder · Sociapi Society'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2800);
    return () => clearInterval(iv);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  const title = 'Muhammad Zuhair Zeb';

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* BG layer 0: particles */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background z-10" />
      </div>

      {/* BG layer 1: hex grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <HexGrid />
      </div>

      {/* BG layer 2: perspective grid floor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none hidden md:block"
        style={{
          backgroundImage: 'linear-gradient(to right, #00FF88 1px, transparent 1px), linear-gradient(to bottom, #00FF88 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          transform: 'perspective(600px) rotateX(58deg) translateY(-60px) scale(2.2)',
          transformOrigin: 'center top',
        }}
      />

      {/* BG layer 3: circuit traces */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <CircuitLines />
      </div>

      {/* BG layer 4: neural network */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <NeuralLines />
      </div>

      {/* BG layer 5: matrix data streams */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <DataStream x="2%" delay={0} />
        <DataStream x="7%" delay={1.4} />
        <DataStream x="93%" delay={0.7} />
        <DataStream x="97%" delay={2.1} />
      </div>

      {/* BG layer 6: mouse glow */}
      <div
        className="absolute inset-0 z-2 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,255,136,0.07) 0%, transparent 60%)` }}
      />

      {/* BG layer 7: orbit rings (desktop) */}
      <div className="absolute inset-0 z-2 pointer-events-none hidden md:block">
        <OrbitRing size={540} duration={30} delay={0} color="rgba(0,255,136,0.06)" />
        <OrbitRing size={380} duration={20} delay={-5} color="rgba(34,255,170,0.10)" dashed />
        <OrbitRing size={220} duration={13} delay={-2} color="rgba(0,255,136,0.14)" />
      </div>

      {/* BG layer 8: HUD frame (desktop) */}
      <div className="absolute inset-6 md:inset-10 z-3 pointer-events-none hidden md:block">
        <HUDCorner pos="tl" />
        <HUDCorner pos="tr" />
        <HUDCorner pos="bl" />
        <HUDCorner pos="br" />
        <motion.div className="absolute top-0 left-10 right-10 flex justify-between pt-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.6 }}>
          <span className="font-mono text-[10px] text-primary/40 hud-pulse">SYS.STATUS: ACTIVE</span>
          <span className="font-mono text-[10px] text-primary/40 hud-pulse">MZZ_PORTFOLIO_v2.0</span>
        </motion.div>
        <motion.div className="absolute bottom-0 left-10 right-10 flex justify-between pb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }}>
          <span className="font-mono text-[10px] text-primary/30">LOC: PESHAWAR, PK</span>
          <span className="font-mono text-[10px] text-primary/30">OPEN_TO_WORK: TRUE</span>
        </motion.div>
      </div>

      {/* Floating stats (desktop) */}
      <FloatingStat label="Projects" value="5+" x="4%" y="32%" delay={5.0} />
      <FloatingStat label="Internships" value="1" x="4%" y="52%" delay={5.3} />
      <FloatingStat label="Society" value="1" x="82%" y="32%" delay={5.6} />
      <FloatingStat label="Certifications" value="6" x="82%" y="52%" delay={5.9} />

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6 text-center"
        style={{ y: yParallax, opacity: fadeOut }}
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-5 md:mb-6 px-3 md:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-[10px] md:text-xs tracking-widest"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ boxShadow: '0 0 8px #00FF88' }} />
          SYSTEM_ONLINE // AI_ANALYST_MODULE
        </motion.div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-bold mb-6 md:mb-8 tracking-tight leading-none">
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 3.5 + index * 0.032, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`inline-block ${char === ' ' ? 'w-3 sm:w-4 md:w-6 lg:w-8' : ''} ${
                index >= 9 && index <= 14 ? 'text-primary' : 'text-foreground'
              }`}
              style={index >= 9 && index <= 14 ? { textShadow: '0 0 24px rgba(0,255,136,0.6)' } : {}}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.8 }}
        >
          {/* Role rotator */}
          <div className="h-8 md:h-9 overflow-hidden relative mb-8 md:mb-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -22, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-mono text-sm md:text-lg text-primary/80 tracking-[0.1em] md:tracking-[0.15em] absolute"
              >
                &gt; {roles[roleIndex]} _
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full sm:w-auto px-7 md:px-9 py-3.5 md:py-4 overflow-hidden rounded-sm"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/35 transition-colors duration-300" />
              <div className="absolute inset-0 border border-primary"
                style={{ boxShadow: '0 0 18px rgba(0,255,136,0.25), inset 0 0 18px rgba(0,255,136,0.05)' }} />
              <motion.div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-700" />
              <span className="relative font-mono text-foreground tracking-widest uppercase text-xs md:text-sm z-10 flex items-center justify-center gap-2">
                View Projects
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.a>

            <motion.a
              href="/muhammad-zuhair-zeb.pdf"
              download="Muhammad-Zuhair-Zeb-CV.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full sm:w-auto px-7 md:px-9 py-3.5 md:py-4 overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 border border-secondary/60 group-hover:border-secondary transition-colors duration-300"
                style={{ background: 'rgba(212,165,116,0.05)' }} />
              <motion.div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-secondary/15 to-transparent transition-transform duration-700" />
              <span className="relative font-mono text-secondary tracking-widest uppercase text-xs md:text-sm z-10 flex items-center justify-center">
                Download CV
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full sm:w-auto px-7 md:px-9 py-3.5 md:py-4 overflow-hidden rounded-sm"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="absolute inset-0 border border-muted-foreground/40 group-hover:border-primary/50 transition-colors duration-300" />
              <span className="relative font-mono text-muted-foreground group-hover:text-primary tracking-widest uppercase text-xs md:text-sm z-10 transition-colors duration-300 flex items-center justify-center">
                Contact Me
              </span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 1 }}
      >
        <div className="w-[24px] h-[40px] md:w-[26px] md:h-[44px] rounded-full border-2 border-primary/40 flex justify-center pt-2"
          style={{ boxShadow: '0 0 10px rgba(0,255,136,0.18)' }}>
          <motion.div
            className="w-1 h-2 md:h-2.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px #00FF88' }}
          />
        </div>
        <span className="font-mono text-[9px] text-primary/40 tracking-widest uppercase">scroll</span>
      </motion.div>
    </section>
  );
}
