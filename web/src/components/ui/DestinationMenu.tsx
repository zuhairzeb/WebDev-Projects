import { zones } from "../../world/zones";
import { navigate, useWorld } from "../../world/store";
export function DestinationMenu() {
  const s = useWorld();
  return (
    <nav className="destination-menu" aria-label="World destinations">
      {zones.map((zone) => (
        <button
          key={zone.id}
          aria-current={
            s.currentZone === zone.id && !s.isMoving ? "location" : undefined
          }
          data-target={s.targetZone === zone.id}
          onClick={() => navigate(zone.id)}
        >
          <span>{zone.number}</span>
          {zone.name.toUpperCase()}
          <i>{s.visited.includes(zone.id) ? "•" : "↗"}</i>
        </button>
      ))}
    </nav>
  );
}
