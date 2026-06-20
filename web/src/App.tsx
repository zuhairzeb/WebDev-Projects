import { useEffect } from 'react';
import Lenis from 'lenis';
import { LiquidBackground } from './components/GlassEffect';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyHireMe } from './components/WhyHireMe';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
// ResumeTimeline removed per request
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Career } from './components/Career';
import Reviews from './components/Social';
import { Contact } from './components/Contact';


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    <div className="font-inter text-gray-900 selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      <LiquidBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <WhyHireMe />
        <Skills />
        <Projects />
        <Services />
        <Process />
        <Career />
        <Reviews />
        <Contact />
      </main>
    </div>
  );
}

export default App;
