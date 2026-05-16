import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from '@/components/LoadingScreen';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Awards from '@/components/Awards';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-foreground">
        <Cursor />

        <AnimatePresence mode="wait">
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Timeline />
              <Awards />
              <Certificates />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
