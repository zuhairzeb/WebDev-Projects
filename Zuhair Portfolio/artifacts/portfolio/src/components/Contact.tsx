import { motion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card/80 border border-primary/20 backdrop-blur-md p-6 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(0,255,136,0.05)]"
        >
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              ESTABLISH_CONNECTION
            </h2>
            <p className="font-mono text-muted-foreground text-sm">Secure channel ready for transmission.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Form */}
            <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border-b-2 border-border py-3 text-foreground font-sans focus:outline-none focus:border-primary transition-colors peer placeholder-transparent text-sm md:text-base"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 text-muted-foreground font-mono text-xs md:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary"
                >
                  [ IDENTIFIER ]
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b-2 border-border py-3 text-foreground font-sans focus:outline-none focus:border-primary transition-colors peer placeholder-transparent text-sm md:text-base"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-muted-foreground font-mono text-xs md:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary"
                >
                  [ RETURN_ADDRESS ]
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-border py-3 text-foreground font-sans focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none text-sm md:text-base"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-muted-foreground font-mono text-xs md:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary"
                >
                  [ PAYLOAD ]
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 md:py-4 bg-primary/10 border border-primary text-primary font-mono font-bold tracking-widest hover:bg-primary hover:text-background transition-all duration-300 flex items-center justify-center gap-2 group text-xs md:text-sm"
              >
                <span>TRANSMIT</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            {/* Contact info */}
            <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs md:text-sm text-muted-foreground mb-1">LOCATION</h4>
                  <p className="text-foreground font-sans text-base md:text-lg">Peshawar, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs md:text-sm text-muted-foreground mb-1">SECURE_COMMS</h4>
                  <a href="mailto:zebzuhair71@gmail.com" className="text-foreground font-sans text-sm md:text-lg hover:text-secondary transition-colors break-all">
                    zebzuhair71@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs md:text-sm text-muted-foreground mb-1">VOICE_UPLINK</h4>
                  <a href="tel:+923495839198" className="text-foreground font-sans text-base md:text-lg hover:text-accent transition-colors">
                    +92 349 5839198
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.linkedin.com/in/zuhairzeb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href="/muhammad-zuhair-zeb.pdf"
                  download="Muhammad-Zuhair-Zeb-CV.pdf"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-sm border border-secondary/60 text-secondary text-xs md:text-sm font-mono tracking-widest hover:bg-secondary/10 hover:text-secondary transition-colors duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
