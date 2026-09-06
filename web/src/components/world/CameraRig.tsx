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
  useFrame(({ camera, size }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = getWorld();
    if (s.paused) return;
    intro.current += dt;
    const z = zoneById(s.currentZone);
    const mobile = size.width < 760;
    const p = motion.position;
    if (s.isMoving) {
      position.current.set(p[0] + (mobile ? 10 : 9), 12, p[2] + 15);
      target.current.set(p[0], 1, p[2] - 1);
    } else if (s.currentZone === "home") {
      position.current.set(
        mobile ? 30 : 22,
        mobile ? 40 : 27,
        mobile ? 38 : 30,
      );
      target.current.set(mobile ? 0 : 1, 0, 1);
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
    if (!s.reduced && intro.current < 2) {
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
        mobile && s.currentZone !== "home" && s.panelOpen
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
