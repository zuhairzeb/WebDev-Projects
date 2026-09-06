import { useEffect, useRef } from "react";
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        el.style.opacity = "1";
        const target = e.target as Element;
        const control = target.closest("[data-cursor],a,button,summary");
        const label =
          control?.getAttribute("data-cursor") || (control ? "OPEN ↗" : "");
        el.dataset.expanded = String(!!label);
        el.textContent = label;
      });
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    const sync = () => {
      document.documentElement.classList.toggle(
        "custom-pointer",
        query.matches,
      );
      window.removeEventListener("pointermove", move);
      if (query.matches)
        window.addEventListener("pointermove", move, { passive: true });
      else leave();
    };
    sync();
    query.addEventListener("change", sync);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      query.removeEventListener("change", sync);
      document.documentElement.classList.remove("custom-pointer");
    };
  }, []);
  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
