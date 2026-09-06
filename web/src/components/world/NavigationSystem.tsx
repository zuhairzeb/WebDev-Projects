import { experienceStops } from "../../world/interactionPoints";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, MathUtils } from "three";
import { arrive, getWorld, motion, setWorld } from "../../world/store";
import { zones, worldBounds } from "../../world/zones";
import { distance } from "../../world/WaypointSystem";
export function NavigationSystem() {
  const route = useRef<CatmullRomCurve3 | null>(null);
  const revision = useRef(-1);
  const report = useRef(0);
  const direction = useRef(new Vector3());
  useEffect(() => {
    const valid = new Set([
      "w",
      "a",
      "s",
      "d",
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright",
    ]);
    const down = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest(
          'input,textarea,select,[contenteditable=true],[role="dialog"]',
        ) ||
        !valid.has(e.key.toLowerCase()) ||
        getWorld().simpleMode ||
        getWorld().reduced
      )
        return;
      e.preventDefault();
      motion.keys.add(e.key.toLowerCase());
    };
    const up = (e: KeyboardEvent) => motion.keys.delete(e.key.toLowerCase());
    const clear = () => motion.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, []);
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const state = getWorld();
    if (state.paused || document.hidden) return;
    motion.animationTime += dt;
    if (motion.keys.size) {
      if (!motion.manual) {
        motion.manual = true;
        route.current = null;
        setWorld({ isMoving: true, panelOpen: false, cameraMode: "follow" });
      }
      const k = motion.keys;
      const dx =
        Number(k.has("d") || k.has("arrowright")) -
        Number(k.has("a") || k.has("arrowleft"));
      const dz =
        Number(k.has("s") || k.has("arrowdown")) -
        Number(k.has("w") || k.has("arrowup"));
      direction.current.set(dx, 0, dz).normalize();
      motion.position[0] = MathUtils.clamp(
        motion.position[0] + direction.current.x * dt * 4.8,
        worldBounds.minX,
        worldBounds.maxX,
      );
      motion.position[2] = MathUtils.clamp(
        motion.position[2] + direction.current.z * dt * 4.8,
        worldBounds.minZ,
        worldBounds.maxZ,
      );
      if (dx || dz) motion.rotation = Math.atan2(dx, dz);
      motion.animation = "Walk";
      motion.idleTime = 0;
    } else if (motion.manual) {
      motion.animation = "Idle";
      motion.manual = false;
      const near = zones.find(
        (z) => distance(z.position, motion.position) < 2.7,
      );
      setWorld({
        isMoving: false,
        cameraMode: "destination",
        ...(near
          ? {
              currentZone: near.id,
              targetZone: near.id,
              panelOpen: true,
              visited: [...new Set([...state.visited, near.id])],
            }
          : { panelOpen: false }),
      });
    } else if (state.isMoving) {
      if (revision.current !== motion.revision) {
        revision.current = motion.revision;
        route.current = new CatmullRomCurve3(
          motion.path.map((p) => new Vector3(...p)),
          false,
          "centripetal",
        );
      }
      motion.elapsed += dt;
      const t = Math.min(motion.elapsed / motion.duration, 1);
      const eased = t * t * (3 - 2 * t);
      const curve = route.current;
      if (curve) {
        const p = curve.getPointAt(eased);
        const tangent = curve.getTangentAt(Math.min(eased, 0.999));
        motion.position = [p.x, 0, p.z];
        motion.rotation = Math.atan2(tangent.x, tangent.z);
      }
      motion.animation = "Walk";
      if (t >= 1) arrive();
    } else {
      motion.idleTime += dt;
      if (performance.now() > motion.interactionUntil)
        motion.animation =
          motion.idleTime > 15 && motion.idleTime < 18 ? "Interact" : "Idle";
      if (motion.idleTime > 21) motion.idleTime = 0;
    }
    if (motion.manual) {
      const zone = zones.find((z) => z.id === "experience");
      if (zone) {
        const near = experienceStops.findIndex(
          (point) =>
            distance(
              [point[0] + zone.position[0], 0, point[2] + zone.position[2]],
              motion.position,
            ) < 1.4,
        );
        if (near >= 0 && near !== getWorld().selectedExperience)
          setWorld({
            selectedExperience: near,
            currentZone: "experience",
            targetZone: "experience",
            panelOpen: true,
          });
      }
    }
    report.current += dt;
    if (report.current > 0.12) {
      report.current = 0;
      setWorld({
        characterPosition: [...motion.position],
        travelProgress: getWorld().isMoving
          ? Math.min(motion.elapsed / motion.duration, 1)
          : 1,
      });
    }
  });
  return null;
}
