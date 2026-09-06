import { zoneById, zones, type Point, type ZoneId } from "./zones";
export const distance = (a: Point, b: Point) =>
  Math.hypot(a[0] - b[0], a[2] - b[2]);
// A connected, inspectable waypoint graph. The hub is a real junction in the world.
export function getGraph() {
  const points: Record<string, Point> = { hub: [0, 0, 0] };
  const edges: Record<string, string[]> = { hub: [] };
  zones.forEach((zone, i) => {
    points[zone.id] = [zone.position[0], 0, zone.position[2] + 2];
    edges[zone.id] = ["hub"];
    edges.hub.push(zone.id);
    if (i > 0) {
      edges[zone.id].push(zones[i - 1].id);
      edges[zones[i - 1].id].push(zone.id);
    }
  });
  return { points, edges };
}
export function selectPath(position: Point, destination: ZoneId): Point[] {
  const { points, edges } = getGraph();
  const start = Object.keys(points).reduce((a, b) =>
    distance(position, points[a]) < distance(position, points[b]) ? a : b,
  );
  const costs: Record<string, number> = { [start]: 0 };
  const previous: Record<string, string> = {};
  const queue = new Set(Object.keys(points));
  while (queue.size) {
    const current = [...queue].reduce((a, b) =>
      (costs[a] ?? Infinity) < (costs[b] ?? Infinity) ? a : b,
    );
    queue.delete(current);
    if (current === destination) break;
    for (const next of edges[current]) {
      const cost =
        (costs[current] ?? Infinity) + distance(points[current], points[next]);
      if (cost < (costs[next] ?? Infinity)) {
        costs[next] = cost;
        previous[next] = current;
      }
    }
  }
  const ids = [destination as string];
  while (ids[0] !== start && previous[ids[0]]) ids.unshift(previous[ids[0]]);
  const path: Point[] = [
    [...position],
    ...ids.map((id) => [...points[id]] as Point),
    [...zoneById(destination).position],
  ];
  const clean = path.filter(
    (p, i) => i === 0 || distance(path[i - 1], p) > 0.05,
  );
  if (clean.length === 1) clean.push([...zoneById(destination).position]);
  return clean;
}
