import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { getWorld, motion } from "../../world/store";
import { zoneById } from "../../world/zones";
export function CameraRig() {
  const look = useRef(new Vector3(0, 0, 2));
  const position = useRef(new Vector3());
  const target = useRef(new Vector3());
  const intro = useRef(0);
  useFrame(({ camera, size, scene }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = getWorld();
    if (s.paused || s.menuOpen) return;
    intro.current += dt;
    const z = zoneById(s.currentZone);
    const mobile = size.width < 760;
    const p = motion.position;
    if (scene.fog && "near" in scene.fog) {
      scene.fog.near = mobile || s.desktopMap ? 60 : 18;
      scene.fog.far = mobile || s.desktopMap ? 110 : 65;
    }
    if (mobile) {
      if (s.mobileMap) {
        const fit = Math.max(1, (size.height / size.width) * 1.08);
        position.current.set(18 * fit, 39 * fit, 29 * fit);
        target.current.set(0, 0, 3);
      } else {
        const offsets = {
          home: [3.6, 3.3, 6.4],
          about: [3.7, 3.8, 6.7],
          projects: [4.2, 4.1, 7.5],
          skills: [4, 4.3, 7],
          experience: [4, 3.8, 7],
          sociapi: [4.2, 4.4, 8],
          services: [4, 3.9, 7],
          contact: [3.4, 3.6, 6.6],
        };
        const o = offsets[s.currentZone];
        const aspect = size.height / size.width;
        const proximity =
          s.mobileEntered || s.mobileEntering
            ? 1.28
            : aspect < 1.65
              ? 1.45
              : 1.35;
        position.current.set(
          p[0] + o[0] * proximity,
          o[1] * proximity,
          p[2] + o[2] * proximity,
        );
        target.current.set(
          p[0] - (!s.mobileEntered ? 0.5 : 0),
          !s.mobileEntered ? 1.65 : 1.2,
          p[2] - 0.5,
        );
        if (s.localExplore) {
          const x = position.current.x - p[0],
            zz = position.current.z - p[2];
          position.current.x =
            p[0] + x * Math.cos(motion.orbit) - zz * Math.sin(motion.orbit);
          position.current.z =
            p[2] + x * Math.sin(motion.orbit) + zz * Math.cos(motion.orbit);
        }
      }
    } else if (s.desktopMap) {
      position.current.set(25, 34, 34);
      target.current.set(0, 0, 3);
    } else if (s.isMoving) {
      const dx = Math.sin(motion.rotation),
        dz = Math.cos(motion.rotation);
      position.current.set(p[0] + 7 - dx * 2, 7, p[2] + 11 - dz * 2);
      target.current.set(p[0] + dx * 1.5, 1, p[2] + dz * 1.5);
    } else if (s.currentZone === "home") {
      position.current.set(p[0] + 6.4, 5.3, p[2] + 11.7);
      target.current.set(p[0] - 1.4, 1.35, p[2] - 0.5);
    } else {
      const offset = z.camera;
      position.current.set(
        p[0] + offset[0] * (mobile ? 1.1 : 1),
        offset[1] + (mobile ? 4 : 0),
        p[2] + offset[2],
      );
      target.current.set(p[0] + (mobile ? 0 : 2.5), 1, p[2] - 2);
      if (s.cameraMode === "project") {
        position.current.add(new Vector3(-1, -1, -2));
      }
    }
    if (!mobile && !s.reduced && intro.current < 2) {
      position.current.y += Math.pow(1 - intro.current / 2, 3) * 16;
    }
    const alpha = s.reduced ? 1 : 1 - Math.exp(-dt * (s.isMoving ? 3.6 : 2.4));
    camera.position.lerp(position.current, alpha);
    look.current.lerp(target.current, alpha);
    camera.lookAt(look.current);
    if ("fov" in camera) {
      const cam = camera as import("three").PerspectiveCamera;
      cam.fov = MathUtils.damp(cam.fov, mobile ? 48 : 42, 3, dt);
      cam.setViewOffset(
        size.width,
        size.height,
        0,
        mobile &&
          !s.mobileMap &&
          s.currentZone !== "home" &&
          s.panelOpen &&
          s.mobileDetails
          ? size.height * 0.18
          : 0,
        size.width,
        size.height,
      );
      cam.updateProjectionMatrix();
    }
    motion.cameraPosition = [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ];
  });
  return null;
}
