import { motion } from 'framer-motion';
import { SectionWrapper, MarqueeText } from './SectionWrapper';
import { GlassCard } from './GlassEffect';
import { GraduationCap, Briefcase, Globe, Users, Award } from 'lucide-react';
import { VideoPlayer, VIDEOS } from './VideoAssets';

const stats = [
  { label: 'Years Experience', value: '4+', icon: Briefcase },
  { label: 'Websites Delivered', value: '10+', icon: Globe },
  { label: 'Interns Mentored', value: '40+', icon: Users },
  { label: 'Community Members', value: '50+', icon: Award },
];

export const About = () => {
  return (
    <>
      <MarqueeText text="WordPress Developer • WooCommerce Specialist • Community Founder • " outline />
      <SectionWrapper id="about" className="overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] -z-10 rounded-full" />
              <VideoPlayer
                src={VIDEOS.about}
                className="w-full h-auto relative z-10 scale-110 drop-shadow-2xl rounded-3xl"
              />

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 -right-2 sm:-right-4 z-20 max-w-[180px] sm:max-w-none"
              >
                <GlassCard className="p-3 sm:p-6 bg-white/60">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-600 rounded-xl sm:rounded-2xl text-white shrink-0">
                      <GraduationCap size={16} className="sm:hidden" />
                      <GraduationCap size={24} className="hidden sm:block" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">Currently Studying</p>
                      <h3 className="font-bebas text-xs sm:text-xl leading-tight">BS Artificial Intelligence</h3>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <h2 className="font-bebas text-5xl md:text-8xl leading-[0.92] tracking-tight mb-10 text-gray-900">
              Crafting the <br />
              <span className="text-blue-600 italic">future</span> of web.
            </h2>

            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-12 max-w-xl">
              I'm Muhammad Zuhair Zeb, a WordPress developer with 4+ years of experience building custom websites, WooCommerce stores, and multivendor marketplaces. I also founded Sociapi Society, a community built around technology and social impact. My focus stays simple: clean code, fast load times, and sites that actually help businesses grow.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <GlassCard key={i} className="p-8 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
                  <div className="text-5xl font-bebas text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-xs font-bold tracking-wide text-gray-400">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-10 p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl"
            >
              <div className="bg-white p-8 rounded-3xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1">Current Leadership</p>
                  <h3 className="font-bebas text-3xl">Founder of Sociapi Society</h3>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};
