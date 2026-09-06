import { LoadingScreen } from "./components/ui/LoadingScreen";
import { WorldCursor } from "./components/ui/WorldCursor";
import {
  lazy,
  Suspense,
  Component,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DestinationMenu } from "./components/ui/DestinationMenu";
import { MiniMap } from "./components/ui/MiniMap";
import { DestinationPanel } from "./components/ui/DestinationPanel";
import { SimpleWorld } from "./components/ui/SimpleWorld";
import { SemanticPortfolio } from "./components/ui/SemanticPortfolio";
import { WorldAudio, toggleWorldSound } from "./components/ui/WorldAudio";
import { useWorld, setWorld, motion, arrive, navigate } from "./world/store";
import { zones, zoneById, type ZoneId } from "./world/zones";
import { useReducedMotion } from "./hooks/useReducedMotion";
import "./world.css";
const World = lazy(() => import("./components/world/World"));
class WorldBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    setWorld({ simpleMode: true, worldLoaded: true, isMoving: false });
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function App() {
  const s = useWorld();
  const reduced = useReducedMotion();
  useEffect(() => {
    const syncViewport = () =>
      document.documentElement.style.setProperty(
        "--world-height",
        (window.visualViewport?.height ?? window.innerHeight) + "px",
      );
    syncViewport();
    window.visualViewport?.addEventListener("resize", syncViewport);
    window.addEventListener("resize", syncViewport);
    return () => {
      window.visualViewport?.removeEventListener("resize", syncViewport);
      window.removeEventListener("resize", syncViewport);
      document.documentElement.style.removeProperty("--world-height");
    };
  }, []);
  const [supported] = useState(() => {
    try {
      const ctx = document.createElement("canvas").getContext("webgl2");
      const supported = !!ctx;
      ctx?.getExtension("WEBGL_lose_context")?.loseContext();
      return supported;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    setWorld({ reduced });
    if (reduced && s.isMoving) arrive();
  }, [reduced]);
  useEffect(() => {
    if (!supported) setWorld({ simpleMode: true, worldLoaded: true });
  }, [supported]);
  useEffect(() => {
    const route = () => {
      const id = location.hash.replace("#", "");
      if (zones.some((z) => z.id === id)) navigate(id as ZoneId);
    };
    route();
    window.addEventListener("hashchange", route);
    return () => window.removeEventListener("hashchange", route);
  }, []);
  const lite = s.simpleMode || !supported || reduced;
  return (
    <main
      className={`world-app ${lite ? "lite-mode" : ""} ${s.currentZone !== "home" && s.panelOpen && !s.isMoving ? "has-panel" : ""}`}
      data-zone={s.currentZone}
      data-target={s.targetZone}
      data-moving={s.isMoving}
      data-animation={motion.animation}
      data-pose={motion.pose.join(",")}
      data-position={s.characterPosition.join(",")}
      data-camera={motion.cameraPosition.join(",")}
    >
      <a
        className="world-skip"
        href="#destination-content"
        onClick={(e) => {
          e.preventDefault();
          setWorld({ panelOpen: true });
          requestAnimationFrame(() =>
            document.querySelector<HTMLElement>(".destination-panel")?.focus(),
          );
        }}
      >
        Skip to destination information
      </a>
      <header className="world-header">
        <button
          onClick={() => navigate("home")}
          className="world-logo"
          aria-label="MZZ World home"
        >
          MZZ<span>®</span>
          <small>WORLD</small>
        </button>
        <span className="world-edition w-mono">
          A SMALL WORLD. A LOT OF POSSIBILITIES.
        </span>
        <div className="world-controls">
          <button
            aria-pressed={s.sound}
            onClick={toggleWorldSound}
            className="w-mono sound-control"
          >
            SOUND {s.sound ? "ON" : "OFF"}
          </button>
          <button
            aria-pressed={s.paused}
            onClick={() => setWorld({ paused: !s.paused })}
            className="w-mono pause-control"
          >
            {s.paused ? "RESUME ▶" : "PAUSE Ⅱ"}
          </button>
          <button
            disabled={!supported || reduced}
            onClick={() => {
              if (s.isMoving) arrive();
              setWorld({
                simpleMode: !s.simpleMode,
                worldLoaded: s.simpleMode ? false : true,
              });
            }}
            className="w-mono mode-button"
          >
            {lite ? "BACK TO 3D ↗" : "SIMPLE VIEW ↗"}
          </button>
        </div>
      </header>
      <div className="world-stage">
        {!lite ? (
          <WorldBoundary>
            <Suspense fallback={null}>
              <World />
            </Suspense>
          </WorldBoundary>
        ) : (
          <SimpleWorld />
        )}
      </div>
      {!lite && !s.worldLoaded && <LoadingScreen />}
      <DestinationPanel />
      <MiniMap />
      {s.isMoving && (
        <div className="travel-status" role="status">
          <span className="w-mono">
            ON THE WAY TO {zoneById(s.targetZone).name.toUpperCase()}
          </span>
          <strong>
            {Math.round(s.travelProgress * 100)}
            <small>%</small>
          </strong>
          <div>
            <i style={{ width: `${s.travelProgress * 100}%` }} />
          </div>
          <span className="travel-note">FOLLOW THE CURIOSITY.</span>
        </div>
      )}
      {!s.panelOpen && !s.isMoving && (
        <button
          className="reopen-panel world-button"
          onClick={() => setWorld({ panelOpen: true })}
        >
          OPEN {zoneById(s.currentZone).name.toUpperCase()} ↗
        </button>
      )}
      <div className="world-hint w-mono">
        <span className="desktop-hint">
          {s.hovered || "WASD / ARROWS TO EXPLORE"}
        </span>
        <span className="touch-hint">YOUR NEXT STOP?</span>
        <span>CHOOSE A DESTINATION. I'LL TAKE YOU THERE. ↓</span>
      </div>
      <DestinationMenu />
      <div className="world-coordinate w-mono">
        PESHAWAR, PK · {new Date().getFullYear()}
        <span>
          {s.visited.length} / {zones.length} PLACES DISCOVERED
        </span>
      </div>
      <WorldAudio />
      <WorldCursor />
      <SemanticPortfolio />
    </main>
  );
}
