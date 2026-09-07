import { ZoneBase } from "./ZoneBase";
import { Sign, Block, Float, HoverObject } from "./Objects";
import { getWorld, navigate, setWorld, interact } from "../../world/store";
import type { Zone } from "../../world/zones";
const objects = [
  ["WordPress", "W"],
  ["React", "⚛"],
  ["PHP", "PHP"],
  ["JavaScript", "JS"],
  ["TypeScript", "TS"],
  ["Artificial Intelligence", "AI"],
];
export function SkillsZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <Sign
        text="THE TECHNOLOGY LAB"
        width={6.2}
        height={0.65}
        position={[0, 4.2, -3.4]}
      />
      {objects.map(([name, label], i) => (
        <group
          key={name}
          position={[((i % 3) - 1) * 2.2, 0, -0.9 - Math.floor(i / 3) * 2.1]}
        >
          <Block
            size={[1.45, 0.5, 1.3]}
            position={[0, 0.3, 0]}
            color="#111111"
          />
          <Sign
            text={name.toUpperCase()}
            position={[0, 0.85, 0.7]}
            width={1.9}
            height={0.4}
          />
          <Float position={[0, 1.7, 0]} speed={0.7 + i * 0.1}>
            <HoverObject
              label={`OPEN / ${name}`}
              onClick={() => {
                setWorld({ selectedSkill: name });
                if (getWorld().currentZone !== "skills") navigate("skills");
                else {
                  setWorld({ panelOpen: true });
                  interact();
                }
              }}
            >
              <Block
                size={[1.1, 1.1, 0.65]}
                color={i === 5 ? "#c6f36a" : "#2357ff"}
              />
              <Sign
                text={label}
                width={0.9}
                height={0.8}
                position={[0, 0, 0.35]}
                background={i === 5 ? "#c6f36a" : "#2357ff"}
                color={i === 5 ? "#111111" : "#ffffff"}
              />
            </HoverObject>
          </Float>
        </group>
      ))}
    </ZoneBase>
  );
}
