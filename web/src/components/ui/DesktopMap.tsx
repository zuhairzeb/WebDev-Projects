import { useState } from "react";
import { navigate, setWorld, useWorld } from "../../world/store";
import { zones, type ZoneId } from "../../world/zones";
import { getGraph, selectPath } from "../../world/WaypointSystem";
export function DesktopMap() {
  const s = useWorld();
  const [hover, setHover] = useState<ZoneId | null>(null);
  if (!s.desktopMap) return null;
  const { points, edges } = getGraph();
  const xy = (p: number[]) => `${190 + p[0] * 8},${170 + p[2] * 8}`;
  return (
    <aside className="world-map-panel" aria-label="World map destinations">
      <header>
        <h2>WORLD MAP / LIVE</h2>
        <button
          onClick={() => setWorld({ desktopMap: false })}
          aria-label="Close world map"
        >
          ×
        </button>
      </header>
      <div className="map-drawing">
        <svg viewBox="0 0 380 350" aria-hidden="true">
          {Object.entries(edges).flatMap(([a, ns]) =>
            ns
              .filter((b) => a < b)
              .map((b) => (
                <path
                  key={a + b}
                  d={`M${xy(points[a])}L${xy(points[b])}`}
                  fill="none"
                  stroke="#a7ac9f"
                  strokeWidth="2"
                />
              )),
          )}
          {hover && (
            <polyline
              points={selectPath(s.characterPosition, hover).map(xy).join(" ")}
              fill="none"
              stroke="#2357ff"
              strokeWidth="4"
            />
          )}
        </svg>
        {zones.map((z) => (
          <button
            key={z.id}
            data-map-destination={z.id}
            style={{
              left: `${((190 + z.position[0] * 8) / 380) * 100}%`,
              top: `${((170 + z.position[2] * 8) / 350) * 100}%`,
            }}
            onMouseEnter={() => setHover(z.id)}
            onFocus={() => setHover(z.id)}
            aria-current={s.currentZone === z.id ? "location" : undefined}
            onClick={() => navigate(z.id)}
          >
            {z.number}
            <strong>{z.name.toUpperCase()}</strong>
          </button>
        ))}
      </div>
      <p>
        YOU ARE AT <b>{s.currentZone.toUpperCase()}</b>
      </p>
      <small>Choose a destination. I'll walk you there.</small>
    </aside>
  );
}
