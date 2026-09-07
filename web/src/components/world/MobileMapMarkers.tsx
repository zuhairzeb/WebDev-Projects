import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { getWorld } from "../../world/store";
import { zones } from "../../world/zones";
const projected = new Vector3();
export function MobileMapMarkers() {
  useFrame(({ camera, size }) => {
    if (!(size.width <= 760 ? getWorld().mobileMap : getWorld().desktopMap)) return;
    for (const z of zones) {
      const el = document.querySelector<HTMLElement>(
        `[data-world-marker="${z.id}"]`,
      );
      if (!el) continue;
      projected.set(z.position[0], 2, z.position[2]).project(camera);
      el.style.left = `${Math.max(el.offsetWidth/2+6,Math.min(size.width-el.offsetWidth/2-6,(projected.x*.5+.5)*size.width))}px`;
      el.style.top = `${(-projected.y * 0.5 + 0.5) * size.height}px`;
    }
  });
  return null;
}
