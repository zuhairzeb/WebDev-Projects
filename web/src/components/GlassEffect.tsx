import { motion } from "framer-motion";
import { ReactNode } from "react";

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-400/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -150, 0],
          y: [0, 100, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-400/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-purple-400/10 rounded-full blur-[80px]"
      />
    </div>
  );
};

export const GlassCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={`backdrop-blur-xl bg-white/40 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const RevealText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </div>
  );
};
