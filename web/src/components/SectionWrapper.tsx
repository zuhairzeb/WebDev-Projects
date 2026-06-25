import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

export const SectionWrapper = ({ children, id, className, dark = false }: Props) => {
  return (
    <section 
      id={id} 
      className={`relative py-16 sm:py-24 md:py-32 px-6 md:px-12 border-t border-gray-100 ${dark ? 'bg-black text-white' : 'bg-white'} ${className}`}
    >
      {/* Corner Markers */}
      <span className="marker -top-2 -left-2">+</span>
      <span className="marker -top-2 -right-2">+</span>
      <span className="marker -bottom-2 -left-2">+</span>
      <span className="marker -bottom-2 -right-2">+</span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export const MarqueeText = ({ text, outline = false }: { text: string; outline?: boolean }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-6 sm:py-10 border-y border-gray-100 flex">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`text-5xl sm:text-7xl md:text-[12rem] font-bebas leading-none flex gap-8 pr-8 uppercase ${outline ? 'text-transparent stroke-black stroke-1' : ''}`}
        style={outline ? { WebkitTextStroke: '1px #ddd' } : {}}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};