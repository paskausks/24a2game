// top left is 0,0.
const vectors = [
  [0, -1], // N
  [1, 0], // E
  [0, 1], // S
  [-1, 0], // W
  [1, -1], // NE
  [1, 1], // SE
  [-1, 1], // SW
  [-1, -1], // NW
];

export function getRandomVector() {
  return vectors[Math.floor(Math.random() * (vectors.length - 1))];
}

export function vectorSum(vector1, vector2) {
  return [
    vector1[0] + vector2[0],
    vector1[1] + vector2[1],
  ]
}
