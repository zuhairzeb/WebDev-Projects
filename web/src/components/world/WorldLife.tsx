import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3, CatmullRomCurve3 } from "three";
import { Block, Sign, HoverObject } from "./Objects";
import { getWorld, interact, motion, useWorld } from "../../world/store";
export function WorldLife() {
  const s = useWorld(),
    robot = useRef<Group>(null);
  const [debug, setDebug] = useState(false);
  const route = useMemo(() => {
    if (!s.isMoving || motion.path.length < 2) return [];
    const curve = new CatmullRomCurve3(
      motion.path.map((p) => new Vector3(...p)),
    );
    return curve.getSpacedPoints(24);
  }, [s.isMoving, s.targetZone]);
  useFrame(({ clock }) => {
    if (robot.current && !getWorld().paused && !getWorld().reduced) {
      robot.current.position.y =
        0.65 + Math.sin(clock.elapsedTime * 1.6) * 0.07;
      robot.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.3;
    }
  });
  return (
    <>
      {route.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, -0.1, p.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.2, 0.38]} />
          <meshBasicMaterial
            color={i / 24 < s.travelProgress ? "#111" : "#2357ff"}
          />
        </mesh>
      ))}
      <group ref={robot} position={[3, 0.65, 5]}>
        <HoverObject
          label="HELLO / DEBUG BOT"
          onClick={() => {
            setDebug(!debug);
            interact();
          }}
        >
          <Block size={[0.65, 0.55, 0.5]} color="#c6f36a" />
          <Block
            size={[0.4, 0.16, 0.05]}
            position={[0, 0.04, 0.28]}
            color="#111"
          />
          <Block
            size={[0.16, 0.25, 0.25]}
            position={[0, -0.4, 0]}
            color="#111"
          />
        </HoverObject>
        {debug && (
          <Sign
            text="YOU FOUND THE DEBUG ZONE."
            width={2.8}
            height={0.45}
            position={[0, 1, 0]}
          />
        )}
      </group>
      {[
        [6, 0, 2],
        [-5, 0, 9],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <Block size={[1.7, 0.18, 0.55]} position={[0, 0.5, 0]} color="#111" />
          <Block size={[0.15, 0.5, 0.45]} position={[-0.6, 0.2, 0]} />
          <Block size={[0.15, 0.5, 0.45]} position={[0.6, 0.2, 0]} />
        </group>
      ))}
    </>
  );
}
