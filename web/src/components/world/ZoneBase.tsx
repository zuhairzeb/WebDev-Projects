import { Block, Sign, HoverObject } from "./Objects";
import { navigate } from "../../world/store";
import type { Zone } from "../../world/zones";
import type { ReactNode } from "react";
export function ZoneBase({
  zone,
  children,
}: {
  zone: Zone;
  children: ReactNode;
}) {
  return (
    <group position={zone.position}>
      <Block
        size={[7.6, 0.25, 5.3]}
        position={[0, -0.18, -1.5]}
        color="#111111"
      />
      <Block
        size={[7.6, 0.1, 5.3]}
        position={[0, 0, -1.5]}
        color={zone.id === "projects" ? "#e4e5df" : "#f4f1e8"}
      />
      <Block
        size={[7.6, 0.035, 0.13]}
        position={[0, 0.07, 1.15]}
        color={zone.color}
      />
      <HoverObject
        label={`GO / ${zone.name.toUpperCase()}`}
        onClick={() => navigate(zone.id)}
      >
        <Sign
          text={`${zone.number} / ${zone.name.toUpperCase()}`}
          position={[-1.4, 0.35, 1.18]}
          width={3.3}
          height={0.55}
          background={zone.color}
          color={zone.id === "sociapi" ? "#111111" : "#ffffff"}
        />
      </HoverObject>
      {children}
    </group>
  );
}
