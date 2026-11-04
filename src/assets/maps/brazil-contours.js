import { brazilRegions } from './brazil.js';

// Malha derivada dos mesmos anéis geográficos. Cada aresta compartilhada é
// pintada uma única vez; sua posse cromática segue a ordem estável das regiões.
const edges = new Map();
let sourceEdgeCount = 0;
for (const [regionIndex, region] of brazilRegions.entries()) {
  for (const ring of region.d.split('M').slice(1)) {
    const points = ring.replace(/Z$/, '').split('L').map(value => value.split(',').map(Number).join(','));
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      if (a === b) continue;
      sourceEdgeCount++;
      const key = [a, b].sort().join('|');
      if (!edges.has(key)) edges.set(key, { a, b, owner: regionIndex });
    }
  }
}

function joinEdges(items) {
  const vertices = new Map();
  items.forEach((edge, index) => {
    for (const vertex of [edge.a, edge.b]) {
      if (!vertices.has(vertex)) vertices.set(vertex, []);
      vertices.get(vertex).push(index);
    }
  });
  const used = new Set(), paths = [];
  function walk(start, first) {
    const points = [start];
    let vertex = start, index = first;
    while (!used.has(index)) {
      used.add(index);
      const edge = items[index];
      vertex = edge.a === vertex ? edge.b : edge.a;
      points.push(vertex);
      const adjacent = vertices.get(vertex);
      if (adjacent.length !== 2) break;
      const next = adjacent.find(value => !used.has(value));
      if (next === undefined) break;
      index = next;
    }
    paths.push('M' + points.join('L'));
  }
  for (const [vertex, adjacent] of vertices) {
    if (adjacent.length !== 2) for (const index of adjacent) if (!used.has(index)) walk(vertex, index);
  }
  items.forEach((edge, index) => { if (!used.has(index)) walk(edge.a, index); });
  return paths.join('');
}

const uniqueEdges = [...edges.values()];
export const brazilBorderMesh = joinEdges(uniqueEdges);
export const brazilNeonContours = brazilRegions.map((region, index) => ({
  key: region.key, period: region.period, phase: region.phase,
  d: joinEdges(uniqueEdges.filter(edge => edge.owner === index)),
}));
export const brazilBorderStats = { sourceEdges: sourceEdgeCount, paintedEdges: uniqueEdges.length };
