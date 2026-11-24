import { ZoneBase } from "./ZoneBase";
import { Block, Sign } from "./Objects";
import type { Zone } from "../../world/zones";

export function ReviewsZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <Block size={[7, 0.2, 0.15]} position={[0, 4.4, -3.6]} color="#c6f36a" />
      {[-3.4, 3.4].map((x) => (
        <Block key={x} size={[0.16, 4.4, 0.16]} position={[x, 2.2, -3.6]} color="#111111" />
      ))}
      <Sign text="CLIENT REVIEWS" position={[0, 3.7, -3.5]} width={5.6} height={0.8} />
      <Sign
        text="REAL WORDS\nFROM REAL PROJECTS"
        position={[0, 2.4, -3.45]}
        width={5.4}
        height={1.25}
        background="#111111"
        color="#c6f36a"
      />
      <Sign text="THANK YOU." position={[0, 0.7, -3.1]} width={4.5} height={0.5} background="#2357ff" color="#ffffff" />
      <Block size={[1.2, 1.2, 1.2]} position={[-2.7, 0.7, -0.5]} color="#c6f36a" />
      <Block size={[1.2, 1.2, 1.2]} position={[2.7, 0.7, -0.5]} color="#2357ff" />
    </ZoneBase>
  );
}
