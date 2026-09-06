import { useEffect, useState } from "react";
import { navigate, useWorld, motion } from "../../world/store";
import { zones } from "../../world/zones";
import { getGraph } from "../../world/WaypointSystem";
export function MiniMap() {
  const s = useWorld();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [s.targetZone]);
  const { points, edges } = getGraph();
  const xy = (p: number[]) => `${125 + p[0] * 5},${108 + p[2] * 5}`;
  return (
    <>
      <button
        className="map-toggle w-mono"
        aria-expanded={open}
        aria-controls="world-route-map"
        onClick={() => setOpen(!open)}
      >
        {open ? "CLOSE MAP ×" : "WORLD MAP ↗"}
      </button>
      <aside
        id="world-route-map"
        className={`mini-map ${open ? "map-expanded" : ""}`}
        aria-label="World route map"
      >
        <span className="w-mono">WORLD MAP / LIVE</span>
        <svg
          viewBox="0 0 250 235"
          aria-label="Eight destinations connected by the world's walking paths"
        >
          <defs>
            <pattern
              id="mini-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0H0V20"
                fill="none"
                stroke="#d7d9ce"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect width="250" height="235" fill="url(#mini-grid)" />
          {Object.entries(edges).flatMap(([id, next]) =>
            next
              .filter((n) => id < n)
              .map((n) => (
                <path
                  key={id + n}
                  d={`M${xy(points[id])}L${xy(points[n])}`}
                  stroke="#a4aa9e"
                  strokeWidth="2"
                  fill="none"
                />
              )),
          )}
          {s.isMoving && (
            <polyline
              points={motion.path.map(xy).join(" ")}
              fill="none"
              stroke="#2357ff"
              strokeWidth="3"
            />
          )}
          {zones.map((z) => (
            <g
              key={z.id}
              className="map-point"
              role="button"
              tabIndex={0}
              aria-label={`Go to ${z.name}`}
              onClick={() => navigate(z.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(z.id);
                }
              }}
              transform={`translate(${xy(z.position)})`}
            >
              <rect
                x="-27"
                y="-13"
                width="54"
                height="26"
                fill={s.targetZone === z.id ? "#2357ff" : "#f4f1e8"}
                stroke="#111"
              />
              <text
                textAnchor="middle"
                y="3"
                fontSize="6.8"
                fontFamily="monospace"
                fill={s.targetZone === z.id ? "#fff" : "#111"}
              >
                {z.name.toUpperCase()}
              </text>
            </g>
          ))}
          <circle
            cx={125 + s.characterPosition[0] * 5}
            cy={108 + s.characterPosition[2] * 5}
            r="4"
            fill="#c6f36a"
            stroke="#111"
            strokeWidth="1.5"
            pointerEvents="none"
          />
        </svg>
        <span className="map-caption">
          ● YOU / {s.currentZone.toUpperCase()}
        </span>
      </aside>
    </>
  );
}
