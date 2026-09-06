import { useEffect, useState } from "react";
import { setWorld } from "../../world/store";
export function LoadingScreen() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className="world-loading world-preloader"
      role="status"
      aria-live="polite"
    >
      <span className="loader-edition">MZZ WORLD / EST. PESHAWAR</span>
      <div className="loader-scene" aria-hidden="true">
        <div className="loader-platform" />
        <div className="loader-block block-one" />
        <div className="loader-block block-two" />
        <div className="loader-person">
          <i />
          <b />
        </div>
        <span className="loader-orbit">↗</span>
      </div>
      <h2>
        A SMALL WORLD.
        <br />
        <em>WORTH EXPLORING.</em>
      </h2>
      <div className="loader-track">
        <i />
      </div>
      <p>{slow ? "Still preparing the scene…" : "BUILDING YOUR FIRST VIEW…"}</p>
      <button onClick={() => setWorld({ simpleMode: true, worldLoaded: true })}>
        ENTER LIGHTWEIGHT MAP ↗
      </button>
    </div>
  );
}
