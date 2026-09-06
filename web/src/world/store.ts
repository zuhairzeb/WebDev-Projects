import { useSyncExternalStore } from "react";
import { selectPath, distance } from "./WaypointSystem";
import { zoneById, type Point, type ZoneId } from "./zones";
export type AnimationName =
  "Idle" | "Walk" | "Interact" | "Typing" | "Celebrate";
export const motion = {
  position: [0, 0, 5] as Point,
  rotation: 0,
  pose: [0, 0],
  animation: "Idle" as AnimationName,
  animationTime: 0,
  path: [] as Point[],
  elapsed: 0,
  duration: 2,
  revision: 0,
  cameraPosition: [0, 0, 0] as Point,
  keys: new Set<string>(),
  manual: false,
  idleTime: 0,
  interactionUntil: 0,
};
export type WorldState = {
  currentZone: ZoneId;
  targetZone: ZoneId;
  characterPosition: Point;
  isMoving: boolean;
  cameraMode: "overview" | "follow" | "destination" | "project";
  selectedProject: number;
  selectedSkill: string | null;
  selectedService: number;
  selectedExperience: number;
  worldLoaded: boolean;
  panelOpen: boolean;
  simpleMode: boolean;
  reduced: boolean;
  paused: boolean;
  sound: boolean;
  hovered: string;
  visited: ZoneId[];
  travelProgress: number;
};
let state: WorldState = {
  currentZone: "home",
  targetZone: "home",
  characterPosition: [0, 0, 5],
  isMoving: false,
  cameraMode: "overview",
  selectedProject: 6,
  selectedSkill: null,
  selectedService: 0,
  selectedExperience: 0,
  worldLoaded: false,
  panelOpen: true,
  simpleMode: false,
  reduced: false,
  paused: false,
  sound: false,
  hovered: "",
  visited: ["home"],
  travelProgress: 0,
};
const listeners = new Set<() => void>();
export const getWorld = () => state;
export function setWorld(patch: Partial<WorldState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}
export function useWorld() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    getWorld,
    getWorld,
  );
}
export function interact(animation: AnimationName = "Interact") {
  motion.animation = animation;
  motion.animationTime = 0;
  motion.interactionUntil = performance.now() + 2200;
  motion.idleTime = 0;
}
export function arrive() {
  motion.position = [
    ...(motion.path[motion.path.length - 1] ||
      zoneById(state.targetZone).position),
  ];
  motion.animation = "Idle";
  motion.rotation =
    state.targetZone === "about" || state.targetZone === "projects"
      ? Math.PI
      : 0.45;
  motion.manual = false;
  motion.idleTime = 0;
  setWorld({
    currentZone: state.targetZone,
    isMoving: false,
    panelOpen: true,
    characterPosition: [...motion.position],
    travelProgress: 1,
    cameraMode: state.targetZone === "home" ? "overview" : "destination",
    visited: [...new Set([...state.visited, state.targetZone])],
  });
  interact(state.targetZone === "about" ? "Typing" : "Interact");
}
export function navigate(id: ZoneId) {
  motion.keys.clear();
  motion.manual = false;
  if (
    id === state.currentZone &&
    !state.isMoving &&
    distance(motion.position, zoneById(id).position) < 0.3
  ) {
    setWorld({
      targetZone: id,
      panelOpen: true,
      cameraMode: id === "home" ? "overview" : "destination",
    });
    interact();
    return;
  }
  motion.path = selectPath(motion.position, id);
  motion.elapsed = 0;
  motion.revision++;
  motion.idleTime = 0;
  const length = motion.path
    .slice(1)
    .reduce((total, p, i) => total + distance(motion.path[i], p), 0);
  motion.duration = Math.min(4, Math.max(1.5, 1.3 + length * 0.06));
  motion.animation = "Walk";
  motion.animationTime = 0;
  setWorld({
    targetZone: id,
    hovered: "",
    isMoving: true,
    panelOpen: false,
    cameraMode: "follow",
    travelProgress: 0,
  });
  if (state.reduced) arrive();
}
export function travelWithinZone(id: ZoneId, point: Point) {
  motion.keys.clear();
  motion.manual = false;
  motion.path = [[...motion.position], point];
  motion.elapsed = 0;
  motion.revision++;
  motion.duration = Math.min(
    2.5,
    Math.max(1.5, distance(motion.position, point) * 0.3),
  );
  motion.animation = "Walk";
  setWorld({
    targetZone: id,
    isMoving: true,
    panelOpen: false,
    cameraMode: "follow",
    travelProgress: 0,
  });
  if (state.reduced) arrive();
}
export function setProject(index: number) {
  setWorld({ selectedProject: index, cameraMode: "project", panelOpen: true });
  interact();
}
