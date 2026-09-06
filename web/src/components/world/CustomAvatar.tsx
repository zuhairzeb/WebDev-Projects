import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AnimationMixer,
  Group,
  type AnimationAction,
  type Object3D,
  type Mesh,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getWorld, motion } from "../../world/store";
import { avatarConfig } from "../../world/avatarConfig";
import { TemporaryCharacter, type CharacterProps } from "./Character";
export function CustomAvatar({
  url,
  currentAnimation,
  targetPosition,
  rotation,
  movementSpeed = 1,
}: CharacterProps & { url: string }) {
  const [model, setModel] = useState<Object3D | null>(null);
  const root = useRef<Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);
  const actions = useRef<Record<string, AnimationAction>>({});
  const active = useRef("");
  useEffect(() => {
    let cancelled = false;
    let loaded: Object3D | null = null;
    const dispose = (scene: Object3D) =>
      scene.traverse((obj) => {
        const mesh = obj as Mesh;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          (Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]
          ).forEach((m) => m.dispose());
        }
      });
    new GLTFLoader().load(
      url,
      (gltf) => {
        if (cancelled) {
          dispose(gltf.scene);
          return;
        }
        loaded = gltf.scene;
        const m = new AnimationMixer(gltf.scene);
        mixer.current = m;
        gltf.animations.forEach(
          (clip) => (actions.current[clip.name] = m.clipAction(clip)),
        );
        setModel(gltf.scene);
      },
      undefined,
      () => {
        if (!cancelled) setModel(null);
      },
    );
    return () => {
      cancelled = true;
      mixer.current?.stopAllAction();
      if (loaded) {
        mixer.current?.uncacheRoot(loaded);
        dispose(loaded);
      }
      active.current = "";
    };
  }, [url]);
  useFrame((_, delta) => {
    if (root.current) {
      root.current.position.set(...(targetPosition || motion.position));
      root.current.rotation.y =
        (rotation ?? motion.rotation) + avatarConfig.rotationOffset;
    }
    const animation = currentAnimation || motion.animation;
    const name = actions.current[animation] ? animation : "Idle";
    if (active.current !== name) {
      actions.current[active.current]?.fadeOut(0.2);
      actions.current[name]?.reset().fadeIn(0.2).play();
      active.current = name;
    }
    if (!getWorld().paused && !getWorld().reduced)
      mixer.current?.update(Math.min(delta, 0.05) * movementSpeed);
  });
  return model ? (
    <group ref={root} scale={avatarConfig.scale}>
      <primitive object={model} />
    </group>
  ) : (
    <TemporaryCharacter
      currentAnimation={currentAnimation}
      targetPosition={targetPosition}
      rotation={rotation}
      movementSpeed={movementSpeed}
    />
  );
}
