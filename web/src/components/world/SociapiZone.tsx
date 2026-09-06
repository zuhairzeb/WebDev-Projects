import { ZoneBase } from "./ZoneBase";
import { Sign, Block, Screen, HoverObject } from "./Objects";
import { navigate, interact, getWorld, setWorld } from "../../world/store";
import type { Zone } from "../../world/zones";
export function SociapiZone({ zone }: { zone: Zone }) {
  const mobile = matchMedia("(max-width:760px)").matches;
  return (
    <ZoneBase zone={zone}>
      <Block size={[7, 0.5, 3.7]} position={[0, 0.3, -2]} color="#111111" />
      <Sign
        text={"SOCIAPI SOCIETY\nFROM IDEAS TO INTELLIGENCE."}
        width={6.7}
        height={1.35}
        position={[0, 4.2, -3.7]}
        background="#111111"
        color="#c6f36a"
      />
      <HoverObject
        label="OPEN / SOCIAPI SOCIETY"
        onClick={() => {
          if (getWorld().currentZone !== "sociapi") navigate("sociapi");
          else {
            setWorld({ panelOpen: true });
            interact();
          }
        }}
      >
        <Screen
          image="/optimized/New verion of sociapi.webp"
          position={[0, 2.25, -3.1]}
          width={4.2}
          height={2.2}
        />
      </HoverObject>
      <Block
        size={[0.8, 1.2, 0.65]}
        position={[-2.3, 1.1, -1.3]}
        color="#c6f36a"
      />
      {Array.from({ length: mobile ? 4 : 8 }, (_, i) => (
        <group
          key={i}
          position={[
            ((i % 4) - 1.5) * 1.2,
            0.1,
            0.15 + Math.floor(i / 4) * 0.7,
          ]}
        >
          <Block
            size={[0.32, 0.52, 0.25]}
            position={[0, 0.37, 0]}
            color={i % 3 === 0 ? "#2357ff" : "#343936"}
          />
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.17, 8, 6]} />
            <meshStandardMaterial color="#bfc3b9" />
          </mesh>
        </group>
      ))}
      <Sign
        text="340+ PARTICIPANTS"
        width={2.6}
        height={0.5}
        position={[2.1, 1.2, -0.3]}
        color="#111111"
        background="#c6f36a"
      />
    </ZoneBase>
  );
}
