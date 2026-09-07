import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { getWorld, motion } from "../../world/store";
export function LocalExplore() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    let start: number | null = null,
      base = 0;
    const down = (e: PointerEvent) => {
      if (!getWorld().localExplore || innerWidth > 760) return;
      start = e.clientX;
      base = motion.orbit;
    };
    const move = (e: PointerEvent) => {
      if (start !== null)
        motion.orbit = Math.max(
          -0.55,
          Math.min(0.55, base + (e.clientX - start) * 0.004),
        );
    };
    const end = () => {
      start = null;
    };
    gl.domElement.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      gl.domElement.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [gl]);
  return null;
}
