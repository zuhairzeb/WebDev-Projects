import type { Point } from "./zones";
export const projectStops: Point[] = [
  [-2.7, 0, -0.1],
  [0, 0, -1.3],
  [2.7, 0, -0.1],
];
export const experienceStops: Point[] = Array.from(
  { length: 6 },
  (_, i) => [((i % 3) - 1) * 2.4, 0, -Math.floor(i / 3) * 2.2] as Point,
);
