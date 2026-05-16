import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Awards', href: '#awards' },
  { name: 'Certs', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 120;
      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].href.substring(1));
        if (section && section.offsetTop <= scrollPosition) {
          setActive(links[i].name);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActive(name);
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-background/85 backdrop-blur-md border-b border-primary/15 shadow-[0_0_20px_rgba(0,200,83,0.1)]' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home', 'Home')}
            className="text-lg md:text-xl font-bold font-display text-foreground tracking-wider group"
          >
            <span className="text-primary group-hover:text-foreground transition-colors">M</span>ZZ
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex space-x-0.5 relative items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href, link.name)}
                className={`relative px-3 py-2 text-xs font-mono tracking-wide transition-colors ${
                  active === link.name ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {active === link.name && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 border-b-2 border-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-3 relative p-2 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full border border-primary/30 bg-primary/5 text-primary"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              className="text-foreground/70 hover:text-foreground p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/96 backdrop-blur-lg border-b border-primary/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 grid grid-cols-2 gap-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href, link.name)}
                  className={`px-4 py-3 text-sm font-mono border-l-2 ${
                    active === link.name
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-foreground/60 border-transparent hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
