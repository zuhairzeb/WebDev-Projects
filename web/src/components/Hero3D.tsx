import { StaticWorkspace } from "./StaticWorkspace";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
function Block({
  size,
  position = [0, 0, 0],
  color = "#f4f1e8",
  rotation = [0, 0, 0],
}: {
  size: [number, number, number];
  position?: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
}) {
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(...size);
    const e = new THREE.EdgesGeometry(geo);
    geo.dispose();
    return e;
  }, [size[0], size[1], size[2]]);
  useEffect(() => () => edges.dispose(), [edges]);
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#111111" />
      </lineSegments>
    </group>
  );
}
function useLabelTexture(kind: "screen" | "wp") {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = kind === "screen" ? 768 : 256;
    canvas.height = kind === "screen" ? 480 : 256;
    const c = canvas.getContext("2d")!;
    c.fillStyle = kind === "screen" ? "#111111" : "#2357ff";
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (kind === "screen") {
      c.fillStyle = "#aaa99f";
      c.font = "20px monospace";
      c.fillText("MZZ / LOCALHOST:2026", 35, 42);
      c.strokeStyle = "#53534e";
      c.beginPath();
      c.moveTo(30, 65);
      c.lineTo(738, 65);
      c.stroke();
      c.font = "bold 93px Arial";
      c.fillStyle = "#f4f1e8";
      c.fillText("MAKE.", 36, 168);
      c.fillText("BUILD.", 36, 264);
      c.fillStyle = "#c6f36a";
      c.fillText("REPEAT.", 36, 360);
      c.font = "20px monospace";
      c.fillStyle = "#aaa99f";
      c.fillText("> turning ideas into useful things_", 36, 434);
      c.fillStyle = "#2357ff";
      c.fillRect(590, 100, 120, 120);
      c.fillStyle = "#f4f1e8";
      c.font = "70px monospace";
      c.fillText("</>", 589, 183);
    } else {
      c.strokeStyle = "#f4f1e8";
      c.lineWidth = 6;
      c.beginPath();
      c.arc(128, 128, 97, 0, Math.PI * 2);
      c.stroke();
      c.fillStyle = "#f4f1e8";
      c.font = "bold 176px Georgia";
      c.textAlign = "center";
      c.fillText("W", 128, 188);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [kind]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
function Workspace({
  mobile,
  onLabel,
}: {
  mobile: boolean;
  onLabel: (value: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const robot = useRef<THREE.Group>(null);
  const tile = useRef<THREE.Group>(null);
  const drag = useRef<number | null>(null);
  const offset = useRef(0);
  const screen = useLabelTexture("screen");
  const wp = useLabelTexture("wp");
  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        -0.35 + pointer.x * 0.14 + offset.current,
        0.05,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.04,
        0.05,
      );
      group.current.position.y = Math.sin(t * 0.7) * 0.055;
    }
    if (tile.current) tile.current.position.y = 1.45 + Math.sin(t * 0.9) * 0.12;
    if (robot.current) robot.current.rotation.y = Math.sin(t * 0.7) * 0.13;
  });
  const over = (label: string) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onLabel(label);
  };
  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        drag.current = e.clientX;
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (drag.current !== null) {
          offset.current += (e.clientX - drag.current) * 0.005;
          offset.current = THREE.MathUtils.clamp(offset.current, -0.65, 0.65);
          drag.current = e.clientX;
        }
      }}
      onPointerUp={(e) => {
        drag.current = null;
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <Block
        size={[4.9, 0.22, 2.65]}
        position={[0, -0.73, 0]}
        color="#2357ff"
      />
      <Block size={[4.9, 0.1, 2.65]} position={[0, -0.56, 0]} />
      <group
        position={[-0.45, 0.15, -0.45]}
        onPointerOver={over("LAPTOP / VIEW SELECTED WORK ↓")}
        onPointerOut={() => onLabel("")}
      >
        <Block size={[0.25, 0.85, 0.25]} position={[0, 0.12, 0]} />
        <Block size={[1.2, 0.09, 0.7]} position={[0, -0.65, 0.15]} />
        <Block
          size={[2.65, 1.8, 0.18]}
          position={[0, 1, -0.12]}
          rotation={[-0.08, 0, 0]}
        />
        <mesh position={[0, 1, 0.003]} rotation={[-0.08, 0, 0]}>
          <planeGeometry args={[2.43, 1.57]} />
          <meshBasicMaterial map={screen} />
        </mesh>
      </group>
      <group position={[-0.4, -0.45, 0.8]}>
        <Block size={[2.35, 0.11, 0.75]} />
        {Array.from({ length: mobile ? 3 : 4 }, (_, row) => (
          <group key={row}>
            {Array.from({ length: 10 }, (_, col) => (
              <Block
                key={col}
                size={[0.18, 0.045, 0.105]}
                position={[-1.03 + col * 0.225, 0.078, -0.27 + row * 0.155]}
                color={col === 9 ? "#2357ff" : "#d2d0c8"}
              />
            ))}
          </group>
        ))}
      </group>
      <group
        ref={tile}
        position={[-2.05, 1.45, 0.1]}
        rotation={[0.08, 0.2, -0.17]}
        onPointerOver={over("WORDPRESS DEVELOPER")}
        onPointerOut={() => onLabel("")}
      >
        <Block size={[0.95, 0.95, 0.18]} color="#2357ff" />
        <mesh position={[0, 0, 0.096]}>
          <planeGeometry args={[0.89, 0.89]} />
          <meshBasicMaterial map={wp} />
        </mesh>
      </group>
      <group
        ref={robot}
        position={[1.58, 0.03, -0.52]}
        onPointerOver={over("BS ARTIFICIAL INTELLIGENCE")}
        onPointerOut={() => onLabel("")}
      >
        <Block
          size={[0.66, 0.58, 0.55]}
          position={[0, 0.19, 0]}
          color="#c6f36a"
        />
        <Block size={[0.82, 0.58, 0.64]} position={[0, 0.84, 0]} />
        <Block
          size={[0.66, 0.27, 0.04]}
          position={[0, 0.85, 0.34]}
          color="#111111"
        />
        {[-0.17, 0.17].map((x) => (
          <Block
            key={x}
            size={[0.08, 0.1, 0.025]}
            position={[x, 0.87, 0.37]}
            color="#c6f36a"
          />
        ))}
        <Block
          size={[0.05, 0.22, 0.05]}
          position={[0, 1.24, 0]}
          color="#111111"
        />
        <mesh position={[0, 1.38, 0]}>
          <sphereGeometry args={[0.08, 8, 6]} />
          <meshStandardMaterial color="#2357ff" />
        </mesh>
        {[-0.2, 0.2].map((x) => (
          <Block
            key={x}
            size={[0.22, 0.18, 0.36]}
            position={[x, -0.19, 0.04]}
            color="#111111"
          />
        ))}
      </group>
      <group
        position={[1.7, -0.18, 0.84]}
        onPointerOver={over("COFFEE / PART OF THE PROCESS")}
        onPointerOut={() => onLabel("")}
      >
        <mesh>
          <cylinderGeometry args={[0.24, 0.2, 0.55, 12]} />
          <meshStandardMaterial color="#f4f1e8" />
        </mesh>
        <mesh position={[0, 0.281, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.205, 12]} />
          <meshBasicMaterial color="#332719" />
        </mesh>
        <mesh position={[0.26, 0.02, 0]}>
          <torusGeometry args={[0.16, 0.045, 6, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
      {!mobile && (
        <group
          position={[1.98, 2.25, -0.6]}
          rotation={[0.15, 0, 0.2]}
          onPointerOver={over("FOUNDER / SOCIAPI SOCIETY")}
          onPointerOut={() => onLabel("")}
        >
          <Block size={[0.7, 0.7, 0.7]} color="#c6f36a" />
          <Block
            size={[0.32, 0.07, 0.03]}
            position={[0, 0.1, 0.36]}
            color="#111111"
          />
          <Block
            size={[0.32, 0.07, 0.03]}
            position={[0, -0.1, 0.36]}
            color="#111111"
          />
        </group>
      )}
    </group>
  );
}
export default function Hero3D({ paused = false }: { paused?: boolean }) {
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(true);
  const [lost, setLost] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const loss = (event: Event) => {
      event.preventDefault();
      setLost(true);
    };
    canvas.addEventListener("webglcontextlost", loss);
    return () => canvas.removeEventListener("webglcontextlost", loss);
  }, [canvas]);
  const mobile = matchMedia("(max-width: 700px)").matches;
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div ref={host} className="canvas-host" onPointerLeave={() => setLabel("")}>
      {lost ? (
        <StaticWorkspace />
      ) : (
        <Canvas
          frameloop={visible && !lost && !paused ? "always" : "never"}
          dpr={[1, mobile ? 1 : 1.5]}
          camera={{ position: [5, 3.7, 7], fov: 38 }}
          gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
          onCreated={({ gl }) => {
            gl.domElement.setAttribute(
              "aria-label",
              "Interactive 3D developer workspace. Drag to rotate.",
            );
            setCanvas(gl.domElement);
          }}
        >
          <ambientLight intensity={1.7} />
          <directionalLight position={[3, 7, 5]} intensity={3} />
          <directionalLight position={[-4, 2, -1]} intensity={1} />
          <Workspace mobile={mobile} onLabel={setLabel} />
        </Canvas>
      )}
      {label && <div className="scene-tooltip mono">{label}</div>}
    </div>
  );
}
