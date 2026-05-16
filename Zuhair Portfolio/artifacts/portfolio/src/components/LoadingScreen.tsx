import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Bicycle() {
  const wheelAnim = {
    animate: { rotate: 360 },
    transition: { duration: 0.5, repeat: Infinity, ease: 'linear' as const },
  };
  const legAnim = {
    animate: { rotate: 360 },
    transition: { duration: 0.7, repeat: Infinity, ease: 'linear' as const },
  };

  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rear wheel */}
      <motion.g style={{ transformOrigin: '28px 56px' }} {...wheelAnim}>
        <circle cx="28" cy="56" r="18" stroke="#00FF88" strokeWidth="2.5" fill="none"/>
        <line x1="28" y1="38" x2="28" y2="74" stroke="#00FF88" strokeWidth="1.5" opacity="0.7"/>
        <line x1="10" y1="56" x2="46" y2="56" stroke="#00FF88" strokeWidth="1.5" opacity="0.7"/>
        <line x1="15" y1="43" x2="41" y2="69" stroke="#00FF88" strokeWidth="1" opacity="0.4"/>
        <line x1="41" y1="43" x2="15" y2="69" stroke="#00FF88" strokeWidth="1" opacity="0.4"/>
      </motion.g>

      {/* Front wheel */}
      <motion.g style={{ transformOrigin: '92px 56px' }} {...wheelAnim}>
        <circle cx="92" cy="56" r="18" stroke="#00FF88" strokeWidth="2.5" fill="none"/>
        <line x1="92" y1="38" x2="92" y2="74" stroke="#00FF88" strokeWidth="1.5" opacity="0.7"/>
        <line x1="74" y1="56" x2="110" y2="56" stroke="#00FF88" strokeWidth="1.5" opacity="0.7"/>
        <line x1="79" y1="43" x2="105" y2="69" stroke="#00FF88" strokeWidth="1" opacity="0.4"/>
        <line x1="105" y1="43" x2="79" y2="69" stroke="#00FF88" strokeWidth="1" opacity="0.4"/>
      </motion.g>

      {/* Frame */}
      <line x1="28" y1="56" x2="58" y2="40" stroke="#22FFAA" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="56" x2="50" y2="24" stroke="#22FFAA" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="24" x2="72" y2="24" stroke="#22FFAA" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="72" y1="24" x2="58" y2="40" stroke="#22FFAA" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="24" x2="58" y2="40" stroke="#22FFAA" strokeWidth="2" strokeLinecap="round"/>
      <line x1="72" y1="24" x2="92" y2="56" stroke="#22FFAA" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Handlebar */}
      <line x1="72" y1="24" x2="78" y2="17" stroke="#22FFAA" strokeWidth="2" strokeLinecap="round"/>
      <line x1="75" y1="17" x2="83" y2="17" stroke="#00FF88" strokeWidth="3" strokeLinecap="round"/>

      {/* Seat post + seat */}
      <line x1="50" y1="24" x2="50" y2="17" stroke="#22FFAA" strokeWidth="2" strokeLinecap="round"/>
      <line x1="43" y1="17" x2="57" y2="17" stroke="#00FF88" strokeWidth="3" strokeLinecap="round"/>

      {/* Pedal hub */}
      <circle cx="58" cy="40" r="4" fill="#00FF88" opacity="0.9"/>

      {/* Rider — head */}
      <circle cx="54" cy="7" r="6" fill="none" stroke="#00FF88" strokeWidth="2"/>
      <circle cx="54" cy="7" r="2.5" fill="#00FF88"/>

      {/* Rider — torso */}
      <line x1="54" y1="13" x2="58" y2="24" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Rider — arms */}
      <line x1="56" y1="18" x2="76" y2="18" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round"/>

      {/* Rider — legs (pedaling) */}
      <motion.g style={{ transformOrigin: '58px 40px' }} {...legAnim}>
        <line x1="58" y1="24" x2="50" y2="40" stroke="#00FF88" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="40" x2="46" y2="50" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="58" y1="24" x2="66" y2="34" stroke="#00FF88" strokeWidth="2" strokeLinecap="round"/>
        <line x1="66" y1="34" x2="70" y2="46" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round"/>
      </motion.g>

      {/* Speed lines */}
      <line x1="0" y1="34" x2="10" y2="34" stroke="#00FF88" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
      <line x1="0" y1="42" x2="8" y2="42" stroke="#00FF88" strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
      <line x1="0" y1="50" x2="6" y2="50" stroke="#00FF88" strokeWidth="0.6" opacity="0.2" strokeLinecap="round"/>
    </svg>
  );
}

function RoadStreaks({ progress }: { progress: number }) {
  const count = 7;
  return (
    <div className="absolute inset-x-0 bottom-0 h-20 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px rounded-full"
          style={{
            width: `${40 + i * 8}px`,
            bottom: `${16 + i * 1.5}px`,
            background: 'linear-gradient(90deg, transparent, #00FF88, transparent)',
          }}
          animate={{ x: [120, -200], opacity: [0, 0.8, 0] }}
          transition={{
            duration: Math.max(0.5, 1.4 - progress / 120),
            repeat: Infinity,
            delay: i * 0.18,
            ease: 'linear',
          }}
        />
      ))}
      <div
        className="absolute bottom-3 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.5) 40%, rgba(0,255,136,0.7) 50%, rgba(0,255,136,0.5) 60%, transparent)',
          boxShadow: '0 0 12px rgba(0,255,136,0.4)',
        }}
      />
    </div>
  );
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const totalMs = 3200;
    const interval = 30;
    const steps = totalMs / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // ease-out: fix — multiply by 100 INSIDE Math.round
      const eased = Math.min(100, Math.round((1 - Math.pow(1 - step / steps, 2.2)) * 100));
      setProgress(eased);

      if (step >= steps && !doneRef.current) {
        doneRef.current = true;
        clearInterval(timer);
        setLaunching(true);
        setTimeout(onComplete, 900);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // bike travels from 0% → 72% of container width as progress goes 0→100
  const bikeLeft = `${(progress / 100) * 72}%`;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050816' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-32">
        <div
          className="w-[500px] h-[200px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,136,0.12) 0%, transparent 70%)' }}
        />
      </div>

      {/* Scanline sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <motion.div
          className="absolute inset-x-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,255,136,0.05), transparent)' }}
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <div
          className="font-display font-bold text-3xl md:text-4xl mb-2 tracking-tight"
          style={{ color: '#00FF88', textShadow: '0 0 30px rgba(0,255,136,0.7), 0 0 60px rgba(0,255,136,0.25)' }}
        >
          MUHAMMAD ZUHAIR ZEB
        </div>
        <div className="font-mono text-xs tracking-[0.4em]" style={{ color: 'rgba(0,255,136,0.45)' }}>
          INITIALIZING PORTFOLIO SYSTEM
        </div>
      </motion.div>

      {/* Road + bike */}
      <div className="w-full max-w-lg px-6">
        <div className="relative h-28 mb-0 overflow-hidden">
          <RoadStreaks progress={progress} />

          {/* Bicycle */}
          <div
            className="absolute bottom-6"
            style={{
              left: launching ? '130%' : bikeLeft,
              transition: launching ? 'left 0.85s cubic-bezier(0.4,0,1,1)' : 'none',
            }}
          >
            <Bicycle />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] rounded-full overflow-visible" style={{ background: 'rgba(0,255,136,0.1)' }}>
          <div
            className="h-full rounded-full relative"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #1a8a50, #00FF88)',
              transition: 'width 0.05s linear',
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                background: '#00FF88',
                boxShadow: '0 0 8px #00FF88, 0 0 16px #00FF88, 0 0 32px rgba(0,255,136,0.6)',
              }}
            />
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between items-center mt-4">
          <span className="font-mono text-xs tracking-[0.25em]" style={{ color: 'rgba(0,255,136,0.45)' }}>
            LOADING PORTFOLIO
          </span>
          <span
            className="font-display font-bold text-xl tabular-nums"
            style={{ color: '#00FF88', textShadow: '0 0 12px rgba(0,255,136,0.8)' }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* HUD footer */}
      <div className="absolute bottom-7 inset-x-0 px-8 flex justify-between">
        <span className="font-mono text-[10px]" style={{ color: 'rgba(0,255,136,0.25)' }}>SYS.BOOT_SEQ</span>
        <span className="font-mono text-[10px]" style={{ color: 'rgba(0,255,136,0.25)' }}>v1.0.0 // 2025</span>
      </div>
    </motion.div>
  );
}
