import { ZoneBase } from "./ZoneBase";
import { Sign, Workstation, Block } from "./Objects";
import type { Zone } from "../../world/zones";
export function AboutZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <Block size={[7, 0.2, 0.15]} position={[0, 4.4, -3.6]} color="#2357ff" />
      {[-3.4, 3.4].map((x) => (
        <Block
          key={x}
          size={[0.16, 4.4, 0.16]}
          position={[x, 2.2, -3.6]}
          color="#2357ff"
        />
      ))}
      <Sign
        text="THE STUDIO"
        position={[0, 3.7, -3.5]}
        width={5.6}
        height={0.8}
      />
      <Workstation />
      <Sign
        text="CURIOUS BY DEFAULT."
        position={[0, 0.6, -3.1]}
        width={4.5}
        height={0.5}
        background="#111111"
        color="#c6f36a"
      />
      <Block
        size={[0.8, 1.7, 0.8]}
        position={[-2.7, 0.9, -1]}
        color="#c6f36a"
      />
    </ZoneBase>
  );
}
