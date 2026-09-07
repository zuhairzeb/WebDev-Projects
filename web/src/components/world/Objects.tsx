import { ZoneContext } from "./ZoneContext";
import { useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getWorld, setWorld } from "../../world/store";
import type { Point } from "../../world/zones";
export function Block({
  size = [1, 1, 1],
  position = [0, 0, 0],
  color = "#f4f1e8",
  rotation = [0, 0, 0],
}: {
  size?: Point;
  position?: Point;
  color?: string;
  rotation?: Point;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}
export function Sign({
  text,
  position = [0, 0, 0],
  width = 4,
  height = 1,
  color = "#111111",
  background = "#f4f1e8",
  rotation = [0, 0, 0],
}: {
  text: string;
  position?: Point;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  rotation?: Point;
}) {
  const gl = useThree((state) => state.gl);
  const zone = useContext(ZoneContext);
  const signRoot = useRef<THREE.Group>(null);
  useFrame(({ size }) => {
    if (!signRoot.current) return;
    const s = getWorld();
    const mode = (size.width <= 760 ? s.mobileMap : s.desktopMap)
      ? "MAP"
      : !zone || zone === s.currentZone || (s.isMoving && zone === s.targetZone)
        ? "ACTIVE"
        : "BACKGROUND";
    signRoot.current.userData.visualState = mode;
    const mobile = size.width <= 760;
    const primary =
      (width >= 3.5 && !text.includes("\n")) ||
      text.length <= 3 ||
      text.startsWith("MAKE") || text === "SERVICES";
    signRoot.current.visible = mobile
      ? mode === "ACTIVE" || mode === "MAP" || width >= 3.5 || text.length <= 3
      : mode === "ACTIVE" || primary;
    const muted = !mobile && mode === "BACKGROUND" && text !== "MZZ. WORLD";
    const opacity = mobile && mode === "BACKGROUND" ? 0.32 : 1;
    signRoot.current.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((m) => {
        if (m.transparent !== opacity < 1) {
          m.transparent = opacity < 1;
          m.needsUpdate = true;
        }
        m.opacity = opacity;
        if (m instanceof THREE.MeshBasicMaterial)
          m.color.set(muted ? "#deded5" : "#ffffff");
        else if (m instanceof THREE.MeshStandardMaterial)
          m.color.set(muted ? "#454743" : "#111111");
      });
    });
  });
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = Math.max(128, Math.round((2048 * height) / width));
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = text.split("\n");
    const size = Math.min(
      c.height / (lines.length * 1.4),
      c.width / (Math.max(...lines.map((l) => l.length)) * 0.62),
    );
    ctx.font = `700 ${size}px Arial`;
    lines.forEach((line, i) =>
      ctx.fillText(
        line,
        c.width / 2,
        c.height / 2 + (i - (lines.length - 1) / 2) * size * 1.2,
      ),
    );
    const map = new THREE.CanvasTexture(c);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.magFilter = THREE.LinearFilter;
    return map;
  }, [text, width, height, color, background, gl]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <group ref={signRoot} position={position} rotation={rotation}>
      <Block size={[width + 0.1, height + 0.1, 0.12]} color="#111111" />
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.07]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}
export function HoverObject({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
}) {
  const hoverRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (hoverRef.current && !getWorld().paused) {
      const active = getWorld().hovered === label;
      hoverRef.current.scale.setScalar(
        THREE.MathUtils.damp(
          hoverRef.current.scale.x,
          active ? 1.07 : 1,
          8,
          Math.min(dt, 0.05),
        ),
      );
    }
  });
  return (
    <group
      ref={hoverRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (getWorld().hovered !== label) setWorld({ hovered: label });
      }}
      onPointerOut={() => setWorld({ hovered: "" })}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </group>
  );
}
export function Float({
  children,
  position = [0, 0, 0],
  speed = 1,
}: {
  children: ReactNode;
  position?: Point;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current && !getWorld().paused && !getWorld().reduced) {
      ref.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * speed) * 0.1;
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.08;
    }
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}
export function Screen({
  image,
  position = [0, 1.9, -1],
  width = 3.8,
  height = 2.3,
}: {
  image: string;
  position?: Point;
  width?: number;
  height?: number;
}) {
  const [texture] = useMemo(() => {
    const texture = new THREE.TextureLoader().load(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    return [texture];
  }, [image]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <group position={position}>
      <Block size={[width + 0.18, height + 0.18, 0.2]} color="#111111" />
      <mesh position={[0, 0, 0.115]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Block
        size={[0.2, 1.2, 0.2]}
        position={[0, -height / 2 - 0.45, -0.05]}
        color="#111111"
      />
      <Block
        size={[1.5, 0.1, 0.8]}
        position={[0, -height / 2 - 1, 0]}
        color="#2357ff"
      />
    </group>
  );
}
export function Workstation() {
  return (
    <group>
      <Block size={[4, 0.18, 1.8]} position={[0, 1, -1]} color="#2357ff" />
      {[-1.6, 1.6].map((x) => (
        <Block
          key={x}
          size={[0.15, 0.9, 1.4]}
          position={[x, 0.45, -1]}
          color="#111111"
        />
      ))}
      <Sign
        text={"MAKE. BUILD.\nREPEAT."}
        width={2.5}
        height={1.5}
        position={[0, 2.1, -1.5]}
        color="#c6f36a"
        background="#111111"
      />
      <Block size={[0.15, 0.5, 0.15]} position={[0, 1.3, -1.5]} />
      <Block
        size={[1.7, 0.09, 0.5]}
        position={[0, 1.13, -0.75]}
        color="#d0cec5"
      />
      {Array.from({ length: 7 }, (_, i) => (
        <Block
          key={i}
          size={[0.13, 0.03, 0.28]}
          position={[-0.65 + i * 0.21, 1.19, -0.75]}
          color="#111111"
        />
      ))}
      <mesh position={[1.45, 1.32, -0.8]}>
        <cylinderGeometry args={[0.17, 0.15, 0.43, 12]} />
        <meshStandardMaterial color="#f4f1e8" />
      </mesh>
    </group>
  );
}

