import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { ZoneBase } from "./ZoneBase";
import { Sign, Screen, HoverObject } from "./Objects";
import {
  getWorld,
  navigate,
  setProject,
  setWorld,
  useWorld,
} from "../../world/store";
import { projects } from "../../data/site";
import type { Zone } from "../../world/zones";
function Exhibit({ index, slot }: { index: number; slot: number }) {
  const ref = useRef<Group>(null);
  const project = projects[index];
  useFrame((_, dt) => {
    if (!ref.current || getWorld().paused) return;
    const s = getWorld();
    const active =
      s.currentZone === "projects" &&
      s.selectedProject === index &&
      !s.isMoving;
    ref.current.position.z = MathUtils.damp(
      ref.current.position.z,
      (slot === 1 ? -2.5 : -1.3) + (active ? 0.7 : 0),
      5,
      Math.min(dt, 0.05),
    );
    ref.current.scale.setScalar(
      MathUtils.damp(
        ref.current.scale.x,
        active ? 1.07 : 1,
        5,
        Math.min(dt, 0.05),
      ),
    );
  });
  return (
    <group
      ref={ref}
      position={[(slot - 1) * 2.7, 0, slot === 1 ? -2.5 : -1.3]}
      rotation={[0, (1 - slot) * 0.2, 0]}
    >
      <HoverObject
        label={`VIEW / ${project.title}`}
        onClick={() => {
          if (getWorld().currentZone !== "projects") {
            setWorld({ selectedProject: index });
            navigate("projects");
          } else setProject(index);
        }}
      >
        {project.image ? (
          <Screen
            image={
              "/optimized/" + project.image.replace(/\.(png|jpg)$/i, ".webp")
            }
            width={2.5}
            height={1.65}
            position={[0, 2.2, 0]}
          />
        ) : (
          <Sign
            text={"WHATSAPP / AUTOMATION\nFAQ → RESPONSE → ACTION"}
            width={2.5}
            height={1.65}
            position={[0, 2.2, 0]}
            background="#111111"
            color="#c6f36a"
          />
        )}
        <Sign
          text={project.title}
          width={2.5}
          height={0.38}
          position={[0, 0.7, 0.15]}
        />
      </HoverObject>
    </group>
  );
}
export function ProjectsZone({ zone }: { zone: Zone }) {
  const s = useWorld();
  const featured = [
    6,
    [6, 4, 7].includes(s.selectedProject) ? 4 : s.selectedProject,
    7,
  ];
  return (
    <ZoneBase zone={zone}>
      <Sign
        text="SELECTED WORK / EXHIBITION"
        width={6.6}
        height={0.7}
        position={[0, 4.6, -3.1]}
      />
      {featured.map((index, i) => (
        <Exhibit key={`${i}-${index}`} index={index} slot={i} />
      ))}
    </ZoneBase>
  );
}
