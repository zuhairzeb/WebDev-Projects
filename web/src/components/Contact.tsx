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
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="relative bg-slate-950 text-white pt-32 pb-12 px-6 md:px-12 rounded-t-[5rem] overflow-hidden">

      {/* Hidden form for Netlify bot detection */}
      <form name="contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="subject" />
        <textarea name="message" />
      </form>

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -left-16 top-10 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-0 bottom-10 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] -z-10" />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* ── Row 1: Headline + Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">

          {/* Left */}
          <div className="lg:col-span-7">
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs block mb-12">Contact</span>
            <h2 className="font-bebas text-8xl md:text-[13rem] leading-[0.8] mb-16 tracking-tighter">
              LET'S CREATE <br />
              <span className="text-blue-400">HISTORY.</span>
            </h2>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-8 bg-linear-to-br from-slate-800 to-slate-700 rounded-[3rem] flex items-center justify-between"
            >
              <div>
                <h4 className="font-bebas text-3xl mb-1">Ready to Start?</h4>
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Let's build something amazing</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-5 flex justify-center items-start">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm bg-linear-to-br from-blue-900/90 to-indigo-900/80 p-8 rounded-[2.5rem] border border-blue-500/30 shadow-[0_20px_80px_rgba(59,130,246,0.15)]"
            >
              <h3 className="font-bebas text-3xl mb-6 text-white">Quick Inquiry</h3>
            <p className="text-sm text-blue-200 leading-relaxed mb-6">
              Looking for internships, freelance projects, collaborations, and community partnerships. Expected response time: 24 hours.
            </p>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400"
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white placeholder-gray-400"
                />

                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project"
                  className="w-full bg-slate-950 border border-blue-500/40 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-white resize-none placeholder-gray-400"
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  {status !== 'sending' && <ArrowRight size={16} />}
                </button>

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
          <div className="lg:col-span-5">
            <VideoPlayer src="/desktop.mp4" className="w-full h-auto rounded-[3rem] object-cover" />
          </div>
          <div className="lg:col-span-7">
            <GlassCard className="p-12 bg-white/5 border-white/10">
              <h3 className="font-bebas text-5xl mb-6">I'm Ready to Start Your Project</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Whether you need a WordPress website, data analysis, or AI-powered solution, I'm here to help you turn your vision into reality. Reach out for internships, freelance partnerships, or community collaborations.
              </p>
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all">
                Book a Free Consultation
              </button>
            </GlassCard>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="pt-12 border-t border-white/10">
          <div className="bg-[#020206] rounded-[3rem] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

              <div className="bg-white/5 p-6 rounded-[3rem] border border-white/10 overflow-hidden">
                <VideoPlayer src="/idea.mp4" className="w-full h-56 rounded-4xl object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold">Home</h3>
                <div className="space-y-3 text-sm">
                  <a href="#home" className="block hover:text-blue-400 transition-colors">Home</a>
                  <a href="#services" className="block hover:text-blue-400 transition-colors">Services</a>
                  <a href="#projects" className="block hover:text-blue-400 transition-colors">Projects</a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold">Socials</h3>
                <div className="space-y-3 text-sm">
                  <a href="https://twitter.com/zuhairzeb" className="block hover:text-blue-400 transition-colors">X (Twitter)</a>
                  <a href="https://instagram.com/zuhairzeb" className="block hover:text-blue-400 transition-colors">Instagram</a>
                  <a href="https://linkedin.com/in/zuhairzeb" className="block hover:text-blue-400 transition-colors">Linkedin</a>
                  <a href="https://www.facebook.com/xuhairxeb" className="block hover:text-blue-400 transition-colors">Facebook</a>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-[3rem] border border-white/10 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-bold mb-4">Click to copy</p>
                  <button
                    onClick={() => navigator.clipboard.writeText('zuhairzeb@yahoo.com')}
                    className="text-base font-bebas text-black bg-white/90 px-3 py-2 rounded-full hover:bg-white transition-colors"
                  >
                    zuhairzeb@yahoo.com
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mt-6">
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