import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, getWorld, type AnimationName } from "../../world/store";
import { Block } from "./Objects";
import type { Point } from "../../world/zones";
import { avatarConfig } from "../../world/avatarConfig";
import { CustomAvatar } from "./CustomAvatar";
function track(name: string, values: number[], duration = 1) {
  return new THREE.NumberKeyframeTrack(
    name,
    values.map((_, i) => (i * duration) / (values.length - 1)),
    values,
  );
}
function clips() {
  return [
    new THREE.AnimationClip("Idle", 3, [
      track("Torso.scale[y]", [1, 1.025, 1], 3),
      track("Head.rotation[y]", [-0.08, 0.08, -0.08], 3),
      track("Torso.rotation[z]", [-.025,.025,-.025],3),
    ]),
    new THREE.AnimationClip("Walk", 0.7, [
      track("LeftLeg.rotation[x]", [-0.7, 0.7, -0.7], 0.7),
      track("RightLeg.rotation[x]", [0.7, -0.7, 0.7], 0.7),
      track("LeftArm.rotation[x]", [0.6, -0.6, 0.6], 0.7),
      track("RightArm.rotation[x]", [-0.6, 0.6, -0.6], 0.7),
      track("LeftKnee.rotation[x]", [0, 0.6, 0], 0.7),
      track("RightKnee.rotation[x]", [0.6, 0, 0.6], 0.7),
      track("Torso.position[y]", [1.08, 1.13, 1.08, 1.13, 1.08], 0.7),
    ]),
    new THREE.AnimationClip("Interact", 1.8, [
      track("RightArm.rotation[z]", [0, -1.9, -1.65, -1.9, 0], 1.8),
      track("Head.rotation[y]", [0, 0.25, 0], 1.8),
    ]),
    new THREE.AnimationClip("Typing", 1, [
      track("LeftArm.rotation[x]", [-1, -1.2, -1], 1),
      track("RightArm.rotation[x]", [-1.2, -1, -1.2], 1),
      track("Head.rotation[x]", [0.2, 0.25, 0.2], 1),
    ]),
    new THREE.AnimationClip("Celebrate", 1.2, [
      track("LeftArm.rotation[z]", [0, 2.5, 2.2, 0], 1.2),
      track("RightArm.rotation[z]", [0, -2.5, -2.2, 0], 1.2),
      track("Torso.position[y]", [1.08, 1.4, 1.08, 1.35, 1.08], 1.2),
    ]),
  ];
}
export type CharacterProps = {
  currentAnimation?: AnimationName;
  targetPosition?: Point;
  rotation?: number;
  movementSpeed?: number;
};
export function Character(props: CharacterProps) {
  return avatarConfig.modelUrl ? (
    <CustomAvatar {...props} url={avatarConfig.modelUrl} />
  ) : (
    <TemporaryCharacter {...props} />
  );
}
export function TemporaryCharacter({
  currentAnimation,
  targetPosition,
  rotation,
  movementSpeed = 1,
}: CharacterProps) {
  const root = useRef<THREE.Group>(null);
  const rig = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const actions = useRef<Record<string, THREE.AnimationAction>>({});
  const active = useRef("");
  useEffect(() => {
    if (!rig.current) return;
    const m = new THREE.AnimationMixer(rig.current);
    mixer.current = m;
    const animations = clips();
    animations.forEach(
      (clip) => (actions.current[clip.name] = m.clipAction(clip)),
    );
    return () => {
      m.stopAllAction();
      m.uncacheRoot(m.getRoot());
      mixer.current = null;
      active.current = "";
    };
  }, []);
  useFrame((_, rawDt) => {
    if (!root.current) return;
    const dt = Math.min(rawDt, 0.05);
    const s = getWorld();
    root.current.position.set(...(targetPosition || motion.position));
    const target = rotation ?? motion.rotation;
    const diff = Math.atan2(
      Math.sin(target - root.current.rotation.y),
      Math.cos(target - root.current.rotation.y),
    );
    root.current.rotation.y += diff * (1 - Math.exp(-dt * 12));
    const animation = currentAnimation || motion.animation;
    if (active.current !== animation) {
      actions.current[active.current]?.fadeOut(0.16);
      actions.current[animation]?.reset().fadeIn(0.16).play();
      active.current = animation;
    }
    if (!s.paused && !s.reduced) mixer.current?.update(dt * movementSpeed);
    motion.pose = [
      rig.current?.getObjectByName("LeftLeg")?.rotation.x || 0,
      rig.current?.getObjectByName("RightLeg")?.rotation.x || 0,
    ];
  });
  return (
    <group ref={root}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <circleGeometry args={[0.45, 20]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
      <group ref={rig}>
        <group name="Torso" position={[0, 1.08, 0]}>
          <Block size={[0.65, 0.67, 0.37]} color="#2357ff" />
          <Block
            size={[0.2, 0.11, 0.03]}
            position={[0.12, 0.17, 0.2]}
            color="#c6f36a"
          />
          <group name="Head" position={[0, 0.65, 0]}>
            <Block size={[0.5, 0.53, 0.45]} color="#bd8d6b" />
            <Block
              size={[0.53, 0.18, 0.47]}
              position={[0, 0.25, -0.02]}
              color="#171719"
            />
            <Block
              size={[0.1, 0.29, 0.43]}
              position={[-0.24, 0.12, -0.025]}
              color="#171719"
            />
            {[-0.13, 0.13].map((x) => (
              <Block
                key={x}
                size={[0.14, 0.09, 0.04]}
                position={[x, 0.03, 0.24]}
                color="#111111"
              />
            ))}
            <Block
              size={[0.1, 0.025, 0.045]}
              position={[0, 0.035, 0.24]}
              color="#111111"
            />
            <Block
              size={[0.15, 0.025, 0.02]}
              position={[0, -0.13, 0.237]}
              color="#352d2a"
            />
          </group>
          {[-1, 1].map((side) => (
            <group
              key={side}
              name={side === -1 ? "LeftArm" : "RightArm"}
              position={[side * 0.42, 0.2, 0]}
            >
              <Block
                size={[0.22, 0.46, 0.27]}
                position={[0, -0.19, 0]}
                color="#2357ff"
              />
              <Block
                size={[0.18, 0.3, 0.22]}
                position={[0, -0.53, 0]}
                color="#bd8d6b"
              />
            </group>
          ))}
        </group>
        {[-1, 1].map((side) => (
          <group
            key={side}
            name={side === -1 ? "LeftLeg" : "RightLeg"}
            position={[side * 0.18, 0.82, 0]}
          >
            <Block
              size={[0.27, 0.4, 0.3]}
              position={[0, -0.18, 0]}
              color="#24272d"
            />
            <group
              name={side === -1 ? "LeftKnee" : "RightKnee"}
              position={[0, -0.36, 0]}
            >
              <Block
                size={[0.24, 0.32, 0.28]}
                position={[0, -0.14, 0]}
                color="#24272d"
              />
              <Block
                size={[0.3, 0.14, 0.46]}
                position={[0, -0.36, 0.075]}
                color="#f4f1e8"
              />
              <Block
                size={[0.31, 0.035, 0.47]}
                position={[0, -0.42, 0.075]}
                color="#111111"
              />
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
