import { ZoneBase } from "./ZoneBase";
import { Sign, Block, HoverObject } from "./Objects";
import { getWorld, navigate, setWorld, interact } from "../../world/store";
import { experiences } from "../../data/site";
import { experienceStops } from "../../world/interactionPoints";
import type { Zone } from "../../world/zones";
export function ExperienceZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <Sign
        text="THE PATH SO FAR"
        width={6}
        height={0.75}
        position={[0, 4.3, -3.7]}
      />
      {experiences.map((exp, i) => (
        <group key={exp.role} position={experienceStops[i]}>
          <Block
            size={[1.85, 0.12, 1.3]}
            position={[0, 0.1, 0]}
            color={i === 0 ? "#2357ff" : "#d2d5ce"}
          />
          <HoverObject
            label={`OPEN / ${exp.role}`}
            onClick={() => {
              setWorld({ selectedExperience: i });
              if (getWorld().currentZone !== "experience")
                navigate("experience");
              else {
                setWorld({ panelOpen: true });
                interact();
              }
            }}
          >
            <Block
              size={[0.1, 1.7, 0.1]}
              position={[0, 1, -0.5]}
              color="#111111"
            />
            <Sign
              text={exp.period}
              width={1.95}
              height={0.6}
              position={[0, 2, -0.5]}
              background="#111111"
              color="#f4f1e8"
            />
            <Sign
              text={exp.company}
              width={1.95}
              height={0.4}
              position={[0, 1.45, -0.49]}
            />
          </HoverObject>
        </group>
      ))}
    </ZoneBase>
  );
}
