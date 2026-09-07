import { useEffect, useRef } from "react";
import { getWorld } from "../../world/store";
export function WorldCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia(
      "(pointer:fine) and (hover:hover) and (prefers-reduced-motion:no-preference)",
    );
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = e.target as Element;
        const clickable = target.closest("button,a,summary");
        const label = target.closest(".world-map-panel")
          ? ""
          : target.closest(".destination-menu,.mini-map")
            ? "GO"
            : getWorld().hovered.split(" / ")[0] || (clickable ? "OPEN" : "");
        el.textContent = label;
        el.dataset.expanded = String(!!label);
        el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        el.style.opacity = "1";
      });
    };
    const hide = () => {
      el.style.opacity = "0";
    };
    const sync = () => {
      document.documentElement.classList.toggle("world-pointer", media.matches);
      window.removeEventListener("pointermove", move);
      if (media.matches)
        window.addEventListener("pointermove", move, { passive: true });
      else hide();
    };
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", sync);
      document.documentElement.classList.remove("world-pointer");
    };
  }, []);
  return <div className="world-cursor" ref={ref} aria-hidden="true" />;
}
