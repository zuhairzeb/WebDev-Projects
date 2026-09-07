import { WorldLife } from "./WorldLife";
import { SkillsZone } from "./SkillsZone";
import { ExperienceZone } from "./ExperienceZone";
import { SociapiZone } from "./SociapiZone";
import { ServicesZone } from "./ServicesZone";
import { ContactZone } from "./ContactZone";
import { useMemo } from "react";
import { Vector3 } from "three";
import { getGraph } from "../../world/WaypointSystem";
import { zones } from "../../world/zones";
import { Block } from "./Objects";
import { HomeZone } from "./HomeZone";
import { AboutZone } from "./AboutZone";
import { ProjectsZone } from "./ProjectsZone";
export function WorldEnvironment() {
  const paths = useMemo(() => {
    const { points, edges } = getGraph();
    return Object.entries(edges).flatMap(([a, list]) =>
      list
        .filter((b) => a < b)
        .map((b) => ({
          a: new Vector3(...points[a]),
          b: new Vector3(...points[b]),
        })),
    );
  }, []);
  return (
    <>
      <color attach="background" args={["#e9e9e2"]} />
      <fog attach="fog" args={["#e9e9e2", 60, 110]} />
      <ambientLight intensity={1.7} />
      <directionalLight
        position={[8, 22, 12]}
        intensity={2.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.001}
      />
      <Block size={[46, 0.6, 46]} position={[0, -0.6, 0]} color="#deded5" />
      <gridHelper
        args={[46, 46, "#c9cbc1", "#d1d3c9"]}
        position={[0, -0.28, 0]}
      />
      {paths.map(({ a, b }, i) => {
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const length = a.distanceTo(b);
        return (
          <group
            key={i}
            position={[mid.x, -0.19, mid.z]}
            rotation={[0, Math.atan2(b.x - a.x, b.z - a.z), 0]}
          >
            <Block size={[1.5, 0.06, length]} color="#f4f1e8" />
            <Block
              size={[0.06, 0.015, length]}
              position={[0, 0.04, 0]}
              color="#a9b5eb"
            />
          </group>
        );
      })}
      <WorldLife />
      {zones.map((zone) =>
        zone.id === "home" ? (
          <HomeZone key={zone.id} zone={zone} />
        ) : zone.id === "about" ? (
          <AboutZone key={zone.id} zone={zone} />
        ) : zone.id === "projects" ? (
          <ProjectsZone key={zone.id} zone={zone} />
        ) : zone.id === "skills" ? (
          <SkillsZone key={zone.id} zone={zone} />
        ) : zone.id === "experience" ? (
          <ExperienceZone key={zone.id} zone={zone} />
        ) : zone.id === "sociapi" ? (
          <SociapiZone key={zone.id} zone={zone} />
        ) : zone.id === "services" ? (
          <ServicesZone key={zone.id} zone={zone} />
        ) : (
          <ContactZone key={zone.id} zone={zone} />
        ),
      )}
    </>
  );
}
