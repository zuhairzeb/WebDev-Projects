import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { ZoneBase } from "./ZoneBase";
import { Sign, Block, HoverObject } from "./Objects";
import { getWorld, navigate, interact, setWorld } from "../../world/store";
import type { Zone } from "../../world/zones";
export function ContactZone({ zone }: { zone: Zone }) {
  const beacon = useRef<Group>(null);
  useFrame((_, dt) => {
    if (beacon.current && !getWorld().paused && !getWorld().reduced)
      beacon.current.rotation.y += Math.min(dt, 0.05) * 0.45;
  });
  return (
    <ZoneBase zone={zone}>
      <Block
        size={[1.15, 5.5, 1.15]}
        position={[-2.3, 2.8, -2.7]}
        color="#2357ff"
      />
      <group ref={beacon} position={[-2.3, 5.7, -2.7]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1, 0.07, 8, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.36, 12, 8]} />
          <meshStandardMaterial color="#c6f36a" />
        </mesh>
      </group>
      <Sign
        text={"LET'S BUILD\nSOMETHING USEFUL."}
        position={[1.1, 3.6, -2.8]}
        width={4.6}
        height={1.5}
        background="#111111"
        color="#c6f36a"
      />
      <HoverObject
        label="OPEN / CONTACT TERMINAL"
        onClick={() => {
          if (getWorld().currentZone !== "contact") navigate("contact");
          else {
            setWorld({ panelOpen: true });
            interact();
          }
        }}
      >
        <Block
          size={[2.5, 1.15, 1.3]}
          position={[0.8, 0.65, -0.8]}
          color="#111111"
        />
        <Sign
          text="SEND A MESSAGE ↗"
          width={2.3}
          height={0.8}
          position={[0.8, 1.4, -0.8]}
          background="#2357ff"
          color="#ffffff"
        />
      </HoverObject>
    </ZoneBase>
  );
}
