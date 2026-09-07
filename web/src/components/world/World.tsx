import { LocalExplore } from "./LocalExplore";
import { MobileMapMarkers } from "./MobileMapMarkers";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { NavigationSystem } from "./NavigationSystem";
import { WorldEnvironment } from "./WorldEnvironment";
import { setWorld, useWorld } from "../../world/store";
function FirstFrame() {
  const frames = useRef(0);
  useFrame(() => {
    if (++frames.current === 2) setWorld({ worldLoaded: true });
  });
  return null;
}
export default function World() {
  const state = useWorld();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(!document.hidden);
  const mobile = matchMedia("(max-width:760px)").matches;
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  useEffect(() => {
    if (!canvas) return;
    const loss = (e: Event) => {
      e.preventDefault();
      setWorld({ simpleMode: true, worldLoaded: true, isMoving: false });
    };
    canvas.addEventListener("webglcontextlost", loss);
    return () => canvas.removeEventListener("webglcontextlost", loss);
  }, [canvas]);
  return (
    <Canvas
      className="world-canvas"
      shadows={!mobile}
      dpr={[1, mobile ? 1.5 : 2]}
      frameloop={
        state.paused || state.menuOpen || !visible ? "never" : "always"
      }
      camera={{
        position: mobile ? [5, 5, 14] : [8, 17, 18],
        fov: mobile ? 48 : 42,
        near: 0.1,
        far: 160,
      }}
      gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute(
          "aria-label",
          "MZZ interactive world with a walking character and connected portfolio destinations",
        );
        setCanvas(gl.domElement);
      }}
    >
      <WorldEnvironment />
      <FirstFrame />
      <NavigationSystem />
      <Character />
      <CameraRig />
      <LocalExplore />
      <MobileMapMarkers />
    </Canvas>
  );
}
