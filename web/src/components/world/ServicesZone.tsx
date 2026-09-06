import { ZoneBase } from "./ZoneBase";
import { Sign, Block, HoverObject } from "./Objects";
import { services } from "../../data/site";
import { getWorld, navigate, setWorld, interact } from "../../world/store";
import type { Zone } from "../../world/zones";
export function ServicesZone({ zone }: { zone: Zone }) {
  return (
    <ZoneBase zone={zone}>
      <Sign
        text="THE DEVELOPER WORKSHOP"
        width={6.5}
        height={0.75}
        position={[0, 4, -3.5]}
      />
      {services.map(([name], i) => (
        <group
          key={name}
          position={[((i % 3) - 1) * 2.3, 0.1, -Math.floor(i / 3) * 2.1]}
        >
          <HoverObject
            label={`OPEN / ${name}`}
            onClick={() => {
              setWorld({ selectedService: i });
              if (getWorld().currentZone !== "services") navigate("services");
              else {
                setWorld({ panelOpen: true });
                interact("Typing");
              }
            }}
          >
            <Block
              size={[1.75, 0.7, 1.3]}
              position={[0, 0.35, 0]}
              color="#111111"
            />
            <Block
              size={[1.55, 0.08, 1.25]}
              position={[0, 0.75, 0]}
              color="#2357ff"
            />
            <Sign
              text={["W", "SHOP", "WWW", "↗", "FAST", "SEO"][i]}
              width={1.3}
              height={0.8}
              position={[0, 1.6, -0.3]}
              background={i === 4 ? "#c6f36a" : "#f4f1e8"}
            />
            <Sign
              text={name}
              width={1.9}
              height={0.4}
              position={[0, 0.3, 0.68]}
            />
          </HoverObject>
        </group>
      ))}
    </ZoneBase>
  );
}
