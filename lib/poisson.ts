export function poissonPmf(lambda: number, k: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  let logP = k * Math.log(lambda) - lambda;
  for (let i = 1; i <= k; i++) logP -= Math.log(i);
  return Math.exp(logP);
}

export function buildGrid(lA: number, lB: number, max = 7): number[][] {
  const g: number[][] = [];
  for (let i = 0; i <= max; i++) {
    g[i] = [];
    for (let j = 0; j <= max; j++) g[i][j] = poissonPmf(lA, i) * poissonPmf(lB, j);
  }
  return g;
}

export function calcOutcomes(grid: number[][], max = 7) {
  let pA = 0, pB = 0, pD = 0;
  for (let i = 0; i <= max; i++)
    for (let j = 0; j <= max; j++) {
      if (i > j) pA += grid[i][j];
      else if (i < j) pB += grid[i][j];
      else pD += grid[i][j];
    }
  const t = pA + pB + pD;
  return { pA: (pA / t) * 100, pB: (pB / t) * 100, pD: (pD / t) * 100 };
}

export function calcOver(lA: number, lB: number, line: number): number {
  let under = 0;
  for (let i = 0; i <= 20; i++)
    for (let j = 0; j <= 20; j++)
      if (i + j <= line) under += poissonPmf(lA, i) * poissonPmf(lB, j);
  return (1 - under) * 100;
}
