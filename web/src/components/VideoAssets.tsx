import { motion } from "framer-motion";

interface VideoProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
}

export const VideoPlayer = ({
  src,
  className = "",
  loop = true,
  muted = true,
  autoPlay = true,
}: VideoProps) => {
  return (
    <motion.video
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
};

export const VIDEOS = {
  hero: "hero.mp4",
  about: "about avator.mp4",
  faqs: "https://framerusercontent.com/assets/2pJZUnx8CCykmeDNfmBwxlRHgI.mp4",
  testimonials:
    "https://framerusercontent.com/assets/QpSh5ePt6LJ9h3sDWXuemKzE.mp4",
  cta: "https://framerusercontent.com/assets/fiyZJo4xOiwxKrM3t8QYZ5LNYnk.mp4",
  footer: "https://framerusercontent.com/assets/YPFx7qAc2UGdUn03CPT6hmYY.mp4",
};
