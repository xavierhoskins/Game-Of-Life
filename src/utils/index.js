export function buildGrid() {
  return new Array(10).fill(null).map(() => new Array(10).fill(0));
}

export function randomGrid() {
  return new Array(10)
    .fill(null)
    .map(() =>
      new Array(10).fill(null).map(() => Math.floor(Math.random() * 2))
    );
}

export function neighbors(matrix, y, x) {
  let count = 0;
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (i === y && j === x) {
        continue;
      }
      if (i >= 0 && i < 10 && j >= 0 && j < 10) {
        count += matrix[i][j];
      }
    }
  }

  return count;
}
