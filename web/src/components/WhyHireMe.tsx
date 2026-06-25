import { SectionWrapper } from './SectionWrapper';
import { GlassCard } from './GlassEffect';
import { Sparkles, ShieldCheck, Users, Code2, BarChart3 } from 'lucide-react';

const reasons = [
  '4+ Years Building WordPress Websites',
  'Founder of Sociapi Society',
  'Skilled in PHP, WooCommerce, Elementor Pro',
  'SEO and Speed Optimization Built In',
  'Organized Events with 300+ Attendees',
  'Mentored 60+ Aspiring Developers',
];

export const WhyHireMe = () => {
  return (
    <SectionWrapper id="hire" className="bg-gray-50/70 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        <div className="lg:col-span-5">
          <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-6">Why Work With Me</span>
          <h2 className="font-bebas text-6xl sm:text-8xl md:text-[10rem] tracking-tight leading-none mb-8">
            BUILT FOR <br /> <span className="text-blue-600 italic">IMPACT.</span>
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
            I combine WordPress development, performance optimization, and community leadership to deliver results fast. My work turns slow, outdated websites into fast, secure platforms that actually support business growth.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <GlassCard key={reason} className="p-8 border border-gray-100 hover:border-blue-200 transition-all">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-2xl bg-blue-600/10 text-blue-600 p-3">
                  {index % 2 === 0 ? <Sparkles size={18} /> : <ShieldCheck size={18} />}
                </div>
                <p className="text-lg font-semibold text-gray-900">{reason}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};