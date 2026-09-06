import { StaticWorkspace } from "./StaticWorkspace";
import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
const Hero3D = lazy(() => import("./Hero3D"));

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticWorkspace /> : this.props.children;
  }
}
export function Hero() {
  const reduced = useReducedMotion();
  const [motionPaused, setMotionPaused] = useState(false);
  const [webgl] = useState(() => {
    try {
      const context = document.createElement("canvas").getContext("webgl2");
      const available = !!context;
      context?.getExtension("WEBGL_lose_context")?.loseContext();
      return available;
    } catch {
      return false;
    }
  });
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-top mono">
          <span>INDEPENDENT DEVELOPER</span>
          <span>PORTFOLIO / {new Date().getFullYear()}</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker mono">
              <span className="blue-square" /> BASED IN PESHAWAR, PAKISTAN
            </div>
            <h1>
              <span>MUHAMMAD</span>
              <span className="blue">ZUHAIR</span>
              <span className="last-name">
                ZEB
                <span className="hero-asterisk" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <p className="hero-roles">
              WordPress Developer. Web Developer.
              <br />
              <span>AI student. Community builder.</span>
            </p>
            <p className="hero-description">
              I build fast websites, useful digital products,
              <br className="desktop-break" /> and things people actually use.
            </p>
            <div className="button-row">
              <a className="button primary" href="#projects">
                VIEW MY WORK <span>↗</span>
              </a>
              <a className="button" href="#contact">
                CONTACT ME <span>↗</span>
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-index mono">
              FIG. 001 — THE EVERYDAY WORKSPACE
            </div>
            <div className="scene" data-cursor="DRAG">
              <SceneBoundary>
                {!reduced && webgl ? (
                  <Suspense fallback={<StaticWorkspace />}>
                    <Hero3D paused={motionPaused} />
                  </Suspense>
                ) : (
                  <StaticWorkspace />
                )}
              </SceneBoundary>
            </div>
            <span className="scene-tag tag-wp">WORDPRESS ↗</span>
            <span className="scene-tag tag-react">&lt; REACT /&gt;</span>
            <span className="scene-tag tag-ai">AI, WITH CURIOSITY.</span>
            <div className="scene-foot mono">
              <span>CODE + COFFEE + CURIOSITY</span>
              <span>MOVE / DRAG TO EXPLORE ↔</span>
            </div>
            <span className="hand-note">a little bit of my world.</span>
          </div>
        </div>
        <div className="hero-bottom mono">
          <a href="#about">SCROLL TO EXPLORE ↓</a>
          <button
            className="motion-toggle mono"
            onClick={() => setMotionPaused(!motionPaused)}
            aria-pressed={motionPaused}
          >
            {motionPaused ? "RESUME MOTION ▶" : "PAUSE MOTION Ⅱ"}
          </button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            DOWNLOAD CV ↗
          </a>
        </div>
      </section>
      <div
        className={`marquee ${motionPaused ? "paused" : ""}`}
        role="img"
        aria-label="WordPress, web development, AI, ecommerce, creative development"
      >
        <div aria-hidden="true">
          {[0, 1].map((n) => (
            <span key={n}>
              WORDPRESS <b>×</b> WEB DEVELOPMENT <b>×</b> AI <b>×</b> ECOMMERCE{" "}
              <b>×</b> CREATIVE DEVELOPMENT <b>×</b>{" "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
