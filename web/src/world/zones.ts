export type ZoneId =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "sociapi"
  | "services"
  | "contact";
export type Point = [number, number, number];
export type Zone = {
  id: ZoneId;
  name: string;
  subtitle: string;
  position: Point;
  color: string;
  camera: Point;
  number: string;
};
export const zones: Zone[] = [
  {
    id: "home",
    name: "Home",
    subtitle: "The starting point",
    position: [0, 0, 5],
    color: "#2357ff",
    camera: [18, 19, 24],
    number: "00",
  },
  {
    id: "about",
    name: "About",
    subtitle: "The personal studio",
    position: [-11, 0, 0],
    color: "#2357ff",
    camera: [7, 8, 11],
    number: "01",
  },
  {
    id: "projects",
    name: "Projects",
    subtitle: "The exhibition",
    position: [-8, 0, -12],
    color: "#2357ff",
    camera: [8, 9, 13],
    number: "02",
  },
  {
    id: "skills",
    name: "Skills",
    subtitle: "The technology lab",
    position: [4, 0, -13],
    color: "#2357ff",
    camera: [7, 8, 11],
    number: "03",
  },
  {
    id: "experience",
    name: "Experience",
    subtitle: "The path so far",
    position: [15, 0, -3],
    color: "#2357ff",
    camera: [8, 9, 12],
    number: "04",
  },
  {
    id: "sociapi",
    name: "Sociapi",
    subtitle: "The community stage",
    position: [12, 0, 10],
    color: "#c6f36a",
    camera: [9, 11, 14],
    number: "05",
  },
  {
    id: "services",
    name: "Services",
    subtitle: "The developer workshop",
    position: [0, 0, 17],
    color: "#2357ff",
    camera: [7, 8, 11],
    number: "06",
  },
  {
    id: "contact",
    name: "Contact",
    subtitle: "The communication terminal",
    position: [-13, 0, 13],
    color: "#2357ff",
    camera: [6, 7, 10],
    number: "07",
  },
];
export const zoneById = (id: ZoneId) =>
  zones.find((zone) => zone.id === id) || zones[0];
export const worldBounds = { minX: -20, maxX: 21, minZ: -20, maxZ: 22 };
