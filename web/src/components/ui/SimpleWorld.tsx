import { useEffect } from "react";
import { zones } from "../../world/zones";
import {
  useWorld,
  motion,
  getWorld,
  setWorld,
  arrive,
  navigate,
} from "../../world/store";
import { getGraph, distance } from "../../world/WaypointSystem";
export function SimpleWorld() {
  const s = useWorld();
  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const state = getWorld();
      if (state.isMoving && !state.paused && !state.reduced) {
        motion.elapsed += dt;
        const t = Math.min(motion.elapsed / motion.duration, 1);
        const eased = t * t * (3 - 2 * t);
        const lengths = motion.path
          .slice(1)
          .map((p, i) => distance(motion.path[i], p));
        const total = lengths.reduce((a, b) => a + b, 0);
        let d = eased * total;
        let index = 0;
        while (index < lengths.length - 1 && d > lengths[index])
          d -= lengths[index++];
        const start = motion.path[index],
          end = motion.path[index + 1];
        if (start && end) {
          const mix = lengths[index] ? Math.min(d / lengths[index], 1) : 1;
          motion.position = [
            start[0] + (end[0] - start[0]) * mix,
            0,
            start[2] + (end[2] - start[2]) * mix,
          ];
        }
        setWorld({
          characterPosition: [...motion.position],
          travelProgress: t,
        });
        if (t >= 1) arrive();
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);
  const graph = getGraph();
  return (
    <div className="simple-world">
      <svg
        viewBox="0 0 1000 800"
        aria-label="Simplified navigable map of MZZ World"
        role="img"
      >
        <defs>
          <pattern
            id="world-grid"
            width="25"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25 0H0V25"
              fill="none"
              stroke="#cbd0c3"
              strokeWidth=".6"
            />
          </pattern>
        </defs>
        <rect width="1000" height="800" fill="url(#world-grid)" />
        {Object.entries(graph.edges).flatMap(([id, neighbors]) =>
          neighbors
            .filter((next) => id < next)
            .map((next) => (
              <path
                key={id + next}
                d={`M${500 + graph.points[id][0] * 16} ${350 + graph.points[id][2] * 16}L${500 + graph.points[next][0] * 16} ${350 + graph.points[next][2] * 16}`}
                fill="none"
                stroke="#8c9688"
                strokeWidth="5"
              />
            )),
        )}
        {zones.map((zone) => (
          <g key={zone.id}>
            <g
              className="simple-location"
              onClick={() => navigate(zone.id)}
              transform={`translate(${500 + zone.position[0] * 16},${350 + zone.position[2] * 16})`}
            >
              <rect
                x="-59"
                y="-65"
                width="118"
                height="70"
                fill={s.currentZone === zone.id ? "#2357ff" : "#f4f1e8"}
                stroke="#111"
                strokeWidth="2"
              />
              <text
                y="-35"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={s.currentZone === zone.id ? "white" : "#111"}
              >
                {zone.name.toUpperCase()}
              </text>
              <text
                y="-12"
                textAnchor="middle"
                fontSize="12"
                fill={s.currentZone === zone.id ? "#c6f36a" : "#2357ff"}
              >
                {zone.number} ↗
              </text>
            </g>
          </g>
        ))}
        <g
          transform={`translate(${500 + s.characterPosition[0] * 16},${350 + s.characterPosition[2] * 16})`}
          className={s.isMoving ? "map-character walking" : "map-character"}
        >
          <ellipse cy="5" rx="13" ry="5" fill="#1113" />
          <path
            className="map-leg left"
            d="M-4-10V2"
            stroke="#111"
            strokeWidth="5"
          />
          <path
            className="map-leg right"
            d="M4-10V2"
            stroke="#111"
            strokeWidth="5"
          />
          <rect
            x="-8"
            y="-27"
            width="16"
            height="18"
            fill="#2357ff"
            stroke="#111"
          />
          <circle cy="-35" r="9" fill="#bd8d6b" stroke="#111" />
          <path d="M-9-39Q0-50 9-39" fill="#111" />
          <path
            className="map-arm"
            d="M-9-25L-15-12M9-25L15-12"
            stroke="#2357ff"
            strokeWidth="5"
          />
        </g>
      </svg>
      <span className="simple-mode-label w-mono">
        {s.reduced
          ? "REDUCED MOTION / ALL CONTENT AVAILABLE"
          : "LIGHTWEIGHT WORLD / CHOOSE A DESTINATION"}
      </span>
    </div>
  );
}
