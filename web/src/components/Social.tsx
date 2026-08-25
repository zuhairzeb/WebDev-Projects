import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  Star,
  MessageSquareText,
  Send,
  Quote,
  StarHalf,
  Sparkles,
  ThumbsUp,
  Heart,
  Clock,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { VideoPlayer, VIDEOS } from './VideoAssets';

// ── Section Wrapper ───────────────────────────────────────────────────────────
const SectionWrapper = ({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section id={id} className={`px-6 md:px-12 lg:px-24 py-24 ${className ?? ''}`}>
    {children}
  </section>
);

// ── Glass Card ────────────────────────────────────────────────────────────────
const GlassCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 ${className ?? ''}`}
  >
    {children}
  </div>
);

// ── Star Rating Component ─────────────────────────────────────────────────────
const StarRating = ({
  rating,
  size = 20,
  animated = false,
}: {
  rating: number;
  size?: number;
  animated?: boolean;
}) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <motion.div
          key={`full-${i}`}
          initial={animated ? { opacity: 0, scale: 0, rotate: -180 } : undefined}
          whileInView={
            animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined
          }
          viewport={animated ? { once: true } : undefined}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Star size={size} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
        </motion.div>
      ))}
      {hasHalf && (
        <StarHalf
          key="half"
          size={size}
          className="fill-amber-400 text-amber-400 drop-shadow-sm"
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
};

// ── Floating Particles ────────────────────────────────────────────────────────
const Particles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-blue-400/25"
        style={{
          left: `${8 + i * 12}%`,
          top: `${15 + (i % 4) * 22}%`,
        }}
        animate={{
          y: [0, -24, 0],
          opacity: [0.1, 0.5, 0.1],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 3 + i * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.35,
        }}
      />
    ))}
  </div>
);

// ── Review Data ───────────────────────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  company?: string;
  rating: number;
  text: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Wocketpocket',
    rating: 5,
    text: "We recently had the pleasure of working with Muhammad Zuhair Zeb on our WordPress website project, and we couldn't be happier with the results. Zuhair not only designed a sleek, user-friendly website that exceeded our expectations but also contributed to our blog with well-crafted content that perfectly aligns with our brand voice. His expertise in WordPress, attention to detail, and dedication to quality are evident in every aspect of his work. The whole process was seamless, and Zuhair was always responsive, professional, and easy to work with. We highly recommend him for anyone seeking a skilled WordPress developer and content creator.",
    date: 'Oct 13, 2024',
  },
  {
    id: 2,
    name: 'TecWideBlog',
    rating: 5,
    text: "We had the pleasure of collaborating with Muhammad Zuhair Zeb on building our blog website for TecWideBlog, and we are overjoyed with the outcomes! He designed a slick, user-friendly website that fulfilled our exact specifications and wrote entertaining, well-researched posts for us. His meticulous attention to detail and commitment to producing high-quality work stand out. We truly adore his work and look forward to continuing our collaboration!",
    date: 'Oct 18, 2024',
  },
  {
    id: 3,
    name: 'Homeitems',
    rating: 5,
    text: "This is my e-commerce store I made it from Mr. Zuhair and I like his work because he always fulfills promise when he says thank you 🙏",
    date: 'Oct 12, 2024',
  },
  {
    id: 4,
    name: 'OSPHERIC Pharma',
    rating: 5,
    text: "I am thrilled to share my experience working with Muhammad Zuhair Zeb. His professionalism and creativity truly stood out throughout our project. Zuhair designed a stunning website for us that exceeded all our expectations. The aesthetic is beautiful, and the functionality is seamless, making it a joy for our users. We genuinely appreciate his hard work and dedication. Highly recommend his services to anyone looking to elevate their online presence.",
    date: 'Oct 12, 2024',
  },
];

// ── Rating Input ──────────────────────────────────────────────────────────────
const RatingInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          whileHover={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="transition-colors"
        >
          <Star
            size={30}
            className={`${
              star <= (hover || value)
                ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                : 'text-gray-300'
            } transition-all duration-200`}
          />
        </motion.button>
      ))}
    </div>
  );
};

// ── Animated Counter ──────────────────────────────────────────────────────────
const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="tabular-nums"
    >
      {value.toFixed(1)}
    </motion.span>
  );
};

// ── Testimonial Card ──────────────────────────────────────────────────────────
const TestimonialCard = ({
  review,
  index,
}: {
  review: Review;
  index: number;
}) => {
  const colors = [
    'from-blue-50 to-indigo-100/60 border-blue-200',
    'from-violet-50 to-purple-100/60 border-violet-200',
    'from-emerald-50 to-teal-100/60 border-emerald-200',
    'from-amber-50 to-orange-100/60 border-amber-200',
    'from-rose-50 to-pink-100/60 border-rose-200',
  ];
  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 24px 48px -12px rgba(37,99,235,0.18)' }}
      className={`p-7 md:p-8 rounded-3xl bg-gradient-to-br ${colorClass} border hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden group`}
    >
      {/* Glow effect on hover */}
      <motion.div className="absolute -top-20 -right-20 w-40 h-40 bg-white/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Shimmer sweep on hover */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Quote icon */}
      <motion.div
        initial={{ rotate: -10, opacity: 0.9 }}
        whileHover={{ rotate: 0, scale: 1.15 }}
        className="mb-4 shrink-0"
      >
        <Quote size={28} className="text-blue-500/70 fill-blue-100" />
      </motion.div>

      {/* Stars */}
      <div className="mb-4 shrink-0">
        <StarRating rating={review.rating} animated />
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1 relative z-10">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Divider */}
      <motion.div
        className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mb-4 shrink-0"
        whileHover={{ width: 64 }}
      />

      {/* Author */}
      <div className="shrink-0 relative z-10 flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3, type: 'spring' }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md"
        >
          {review.name.charAt(0)}
        </motion.div>
        <div>
          <p className="font-bold text-gray-900 text-base">{review.name}</p>
          {review.company && (
            <p className="text-xs text-gray-500">{review.company}</p>
          )}
          <div className="flex items-center gap-1.5 mt-0.5">
            <Clock size={11} className="text-gray-400" />
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Section Divider ───────────────────────────────────────────────────────────
const SectionDivider = () => (
  <div className="flex items-center gap-4 my-16">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-200 shrink-0"
    />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
  </div>
);

// ── Main Reviews Component ────────────────────────────────────────────────────
export const Reviews = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    text: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      q: 'What services do you provide?',
      a: 'I specialize in WordPress development, Data Analysis, and AI solutions including prompt engineering and automation.',
    },
    {
      q: 'Do you build ecommerce websites?',
      a: 'Yes, I build robust multivendor and single-vendor ecommerce platforms using WooCommerce and custom PHP solutions.',
    },
    {
      q: 'Can you create custom WordPress plugins?',
      a: 'Absolutely. I develop custom plugins to extend WordPress functionality tailored to specific business needs.',
    },
    {
      q: 'Do you provide SEO optimization?',
      a: 'Yes, performance and SEO are integral parts of my web development process.',
    },
    {
      q: 'Can you create Power BI dashboards?',
      a: 'Yes, I create interactive Power BI dashboards for data-driven decision making.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      name: formData.name.trim(),
      company: formData.company.trim() || undefined,
      rating: formData.rating,
      text: formData.text.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setReviews((prev) => [newReview, ...prev]);
    setFormData({ name: '', company: '', rating: 5, text: '' });
    setFormSubmitted(true);
    setShowForm(false);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <SectionWrapper id="social" className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden scroll-mt-24">
      <Particles />

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="flex flex-col items-center text-center mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-6 inline-flex items-center gap-2"
        >
          <Sparkles size={14} className="text-blue-400" />
          Client Reviews
          <Sparkles size={14} className="text-blue-400" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bebas text-7xl md:text-8xl tracking-tight leading-none"
        >
          WHAT{' '}
          <motion.span
            className="text-blue-600 italic inline-block"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            CLIENTS
          </motion.span>{' '}
          SAY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-4 max-w-lg"
        >
          Real feedback from real clients I&apos;ve had the pleasure of working
          with.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6 mt-8 flex-wrap justify-center"
        >
          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100"
            whileHover={{ scale: 1.03 }}
          >
            <StarRating rating={avgRating} size={16} />
            <span className="text-gray-700 font-bold">
              <AnimatedNumber value={avgRating} />
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100"
            whileHover={{ scale: 1.03 }}
          >
            <ThumbsUp size={16} className="text-blue-500" />
            <span className="text-gray-700">
              <span className="font-bold">{reviews.length}</span> Reviews
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════ VIDEO + REVIEWS GRID ═══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10">
        {/* Video Column */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <VideoPlayer
              src={VIDEOS.testimonials}
              className="w-full h-auto rounded-3xl object-cover drop-shadow-2xl aspect-video"
            />

            {/* Floating average rating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-xl z-20"
            >
              ⭐ 5.0 Average
            </motion.div>

            {/* Bold CTA button anchored on the video */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 18 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-700 font-bold rounded-full shadow-2xl border border-blue-100 text-xs sm:text-base whitespace-nowrap max-w-[90%]"
            >
              <motion.span
                animate={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={14} className="fill-red-500 text-red-500 sm:w-[18px] sm:h-[18px]" />
              </motion.span>
              What Clients Say
            </motion.div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, 4).map((review, i) => (
            <TestimonialCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* ═══════════════════ LEAVE A REVIEW ═══════════════════ */}
      <div id="leave-a-review" className="mb-24 text-center relative z-10">
        {!showForm && !formSubmitted && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -12px rgba(37,99,235,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <MessageSquareText size={20} />
            Leave a Review
            <motion.span
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.button>
        )}

        <AnimatePresence>
          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold rounded-full border border-green-200 shadow-lg"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
              >
                ✅
              </motion.span>
              Thank you! Your review has been submitted.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden max-w-2xl mx-auto"
            >
              <GlassCard className="p-10 mt-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bebas text-4xl mb-2 relative"
                >
                  Share Your{' '}
                  <span className="text-blue-600 italic">Experience</span>
                </motion.h3>
                <p className="text-gray-500 text-sm mb-8 relative">
                  Your feedback helps others know what to expect!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white/80"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company / Website{' '}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. My Company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, company: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white/80"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating
                    </label>
                    <RatingInput
                      value={formData.rating}
                      onChange={(v) =>
                        setFormData((p) => ({ ...p, rating: v }))
                      }
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your experience working with Muhammad Zuhair Zeb..."
                      value={formData.text}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, text: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white/80 resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:shadow-xl transition-all shadow-lg"
                    >
                      <Send size={16} />
                      Submit Review
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 text-gray-600 font-semibold rounded-full hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                  </motion.div>
                </form>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SectionDivider />

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 relative z-10 scroll-mt-24">
        {/* FAQ Left */}
        <div className="lg:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold tracking-wider uppercase text-xs block mb-8"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bebas text-7xl md:text-8xl tracking-tight leading-none mb-8"
          >
            COMMON <br />
            <span className="text-blue-600 italic">QUESTIONS</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-gray-500 mb-8"
          >
            Everything you need to know before reaching out.
          </motion.p>

          {/* Video on left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mt-4"
          >
            <VideoPlayer
              src={VIDEOS.faqs}
              className="w-full h-auto rounded-3xl object-cover aspect-video drop-shadow-xl"
              overlay
              overlayText="Got Questions?"
              icon={
                <svg
                  className="w-3 h-3 inline"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              }
            />
          </motion.div>
        </div>

        {/* FAQ Right - Accordion */}
        {/*
          NOTE: these rows used to fade in with whileInView. On fast scroll or
          slower phones that animation could get stuck partway through,
          leaving a question looking greyed out and broken (this is what was
          happening with the SEO question). FAQ rows don't need a scroll
          reveal since the user is already looking right at this section, so
          they now render fully visible immediately. Only the open/close
          animation (height + fade of the answer) is kept.
        */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, i) => (
            <GlassCard key={i} className="p-8 group hover:shadow-2xl transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 ml-4"
                >
                  {openFaq === i ? (
                    <Minus className="text-blue-600" />
                  ) : (
                    <Plus className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  )}
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      className="pt-6"
                    >
                      <p className="text-gray-600 text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Reviews;