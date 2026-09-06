import { ZoneBase } from "./ZoneBase";
import { Float, Sign, Workstation, HoverObject, Block } from "./Objects";
import { navigate } from "../../world/store";
import type { Zone } from "../../world/zones";
export function HomeZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <HoverObject label="VIEW / PROJECTS" onClick={() => navigate("projects")}>
        <Workstation />
      </HoverObject>
      <Float position={[-2.8, 2.7, -2]}>
        <HoverObject label="GO / THE STUDIO" onClick={() => navigate("about")}>
          <Sign
            text="W"
            width={1.05}
            height={1.05}
            background="#2357ff"
            color="#ffffff"
          />
        </HoverObject>
      </Float>
      <Sign
        text="MZZ. WORLD"
        position={[0, 4, -2.7]}
        width={5.5}
        height={1}
        color="#2357ff"
      />
      <Block
        size={[0.15, 3, 0.15]}
        position={[-2.7, 1.6, -2.7]}
        color="#111111"
      />
      <Block
        size={[0.15, 3, 0.15]}
        position={[2.7, 1.6, -2.7]}
        color="#111111"
      />
    </ZoneBase>
  );
}
