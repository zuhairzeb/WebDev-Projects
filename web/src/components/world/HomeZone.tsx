import { useThree } from "@react-three/fiber";
import { ZoneBase } from "./ZoneBase";
import { Float, Sign, Workstation, HoverObject, Block } from "./Objects";
import { navigate, useWorld } from "../../world/store";
import type { Zone } from "../../world/zones";
export function HomeZone({ zone }: { zone: Zone }) {
  const state = useWorld();
  const mobile = useThree((s) => s.size.width <= 760);
  return (
    <ZoneBase zone={zone}>
      <HoverObject label="VIEW / PROJECTS" onClick={() => navigate("projects")}>
        <Workstation />
      </HoverObject>
      <group visible={!mobile || state.mobileEntered}>
        <Float position={[-2.8, 2.7, -2]}>
          <HoverObject
            label="GO / THE STUDIO"
            onClick={() => navigate("about")}
          >
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
          position={
            !mobile && !state.desktopMap ? [0, 3.8, -3.1] : [0, 4, -2.7]
          }
          width={!mobile && !state.desktopMap ? 4.2 : 5.5}
          height={!mobile && !state.desktopMap ? 0.75 : 1}
          color={!mobile && !state.desktopMap ? "#5369a3" : "#2357ff"}
        />
      </group>
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
