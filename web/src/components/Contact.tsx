import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { GlassCard } from './GlassEffect';
import { VideoPlayer } from './VideoAssets';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // ═══ WEB3FORMS CONFIG ═══
      const WEB3FORMS_ACCESS_KEY = '4889b007-7960-4444-b8f7-5f948e45a9ab';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Form error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer id="contact" className="relative bg-slate-950 text-white pt-16 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 rounded-t-3xl md:rounded-t-[5rem] overflow-hidden">

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -left-16 top-10 w-48 md:w-72 h-48 md:h-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-0 bottom-10 w-56 md:w-80 h-56 md:h-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] -z-10" />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* ── Row 1: Headline + Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-32">

          {/* Left: Headline */}
          <div className="lg:col-span-7">
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs block mb-6 md:mb-12">Contact</span>
            
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-8xl lg:text-[13rem] leading-[0.9] md:leading-[0.8] mb-8 md:mb-16 tracking-tighter">
              LET'S CREATE <br />
              <span className="text-blue-400">HISTORY.</span>
            </h2>

            {/* CTA Card - Responsive */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-linear-to-br from-slate-800 to-slate-700 rounded-2xl md:rounded-[3rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bebas text-xl md:text-3xl mb-1">Ready to Start?</h4>
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Let's build something amazing</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={20} />
              </div>
            </motion.div>
          </div>

          {/* Right: Form - Responsive */}
          <div className="lg:col-span-5 flex justify-center items-start">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm bg-linear-to-br from-blue-900/90 to-indigo-900/80 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-blue-500/30 shadow-[0_20px_80px_rgba(59,130,246,0.15)]"
            >
              <h3 className="font-bebas text-2xl md:text-3xl mb-4 md:mb-6 text-white">Quick Inquiry</h3>
              <p className="text-xs md:text-sm text-blue-200 leading-relaxed mb-4 md:mb-6">
                Looking for internships, freelance projects, collaborations, and community partnerships. Expected response time: 24 hours.
              </p>

              {/* ═══ WEB3FORMS ═══ */}
              <form
                onSubmit={handleSubmit}
                className="space-y-3 md:space-y-4"
              >
                {/* Name Input */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400 text-sm md:text-base"
                />

                {/* Email Input */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400 text-sm md:text-base"
                />

                {/* Phone Input */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number (Optional)"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400 text-sm md:text-base"
                />

                {/* Subject Input */}
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400 text-sm md:text-base"
                />

                {/* Message Textarea */}
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white resize-none placeholder-gray-400 text-sm md:text-base"
                />

                {/* Submit Button - Tap-friendly */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 md:py-4 bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  {status !== 'sending' && <ArrowRight size={16} />}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <p className="text-green-400 text-xs text-center font-bold tracking-widest uppercase">
                    ✓ Message sent successfully!
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-xs text-center font-bold tracking-widest uppercase">
                    ✗ Something went wrong. Try again.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>

        {/* ── Row 2: Video + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <VideoPlayer src="/desktop.mp4" className="w-full h-auto rounded-2xl md:rounded-[3rem] object-cover" />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <GlassCard className="p-6 md:p-12 bg-white/5 border-white/10">
              <h3 className="font-bebas text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">I'm Ready to Start Your Project</h3>
              <p className="text-base md:text-xl text-gray-400 leading-relaxed mb-6 md:mb-8">
                Whether you need a custom WordPress website, a WooCommerce store, or help speeding up and securing a site you already have, I'm here to help you turn your vision into reality. Reach out for freelance projects, internships, or community collaborations.
              </p>
              <button className="px-6 md:px-10 py-3 md:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                Book a Free Consultation
              </button>
            </GlassCard>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="pt-8 md:pt-12 border-t border-white/10">
          <div className="bg-[#020206] rounded-2xl md:rounded-[3rem] p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

              {/* Video Card */}
              <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-[3rem] border border-white/10 overflow-hidden">
                <VideoPlayer src="/idea.mp4" className="w-full h-40 md:h-56 rounded-lg md:rounded-4xl object-cover" />
              </div>

              {/* Navigation Links */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold">Home</h3>
                <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <a href="#home" className="block hover:text-blue-400 transition-colors">Home</a>
                  <a href="#services" className="block hover:text-blue-400 transition-colors">Services</a>
                  <a href="#projects" className="block hover:text-blue-400 transition-colors">Projects</a>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold">Socials</h3>
                <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <a href="https://twitter.com/zuhairzeb" className="block hover:text-blue-400 transition-colors">X (Twitter)</a>
                  <a href="https://instagram.com/zuhairzeb" className="block hover:text-blue-400 transition-colors">Instagram</a>
                  <a href="https://linkedin.com/in/zuhairzeb" className="block hover:text-blue-400 transition-colors">LinkedIn</a>
                  <a href="https://www.facebook.com/xuhairxeb" className="block hover:text-blue-400 transition-colors">Facebook</a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-[3rem] border border-white/10 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold mb-3 md:mb-4">Click to copy</p>
                  <button
                    onClick={() => navigator.clipboard.writeText('zuhairzeb@yahoo.com')}
                    className="text-sm md:text-base font-bebas text-black bg-white/90 px-3 py-2 rounded-full hover:bg-white transition-colors active:scale-95 break-all"
                  >
                    zuhairzeb@yahoo.com
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mt-4 md:mt-6">
                  © {new Date().getFullYear()} Muhammad Zuhair Zeb
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};