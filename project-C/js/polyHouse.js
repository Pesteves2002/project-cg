function createPolyHouse() {
  "use strict";

  let buffer = new THREE.BufferGeometry();

  const windowVertices = new Float32Array(
    [
      0,
      0,
      0, // 0
      0,
      0,
      2, // 1
      0,
      3,
      2, // 2
      0,
      7,
      2, // 3
      0,
      7,
      5, // 4
      0,
      3,
      5, // 5
      0,
      0,
      5, // 6
      0,
      0,
      7, // 7
      0,
      3,
      7, // 8
      0,
      7,
      7, // 0
      0,
      7,
      12, // 10
      0,
      3,
      12, // 11
      0,
      0,
      12, // 12
      0,
      0,
      14, // 13
      0,
      3,
      14, // 14
      0,
      7,
      14, // 15
      0,
      7,
      17, // 16
      0,
      3,
      17, // 17
      0,
      0,
      17, // 18
      0,
      0,
      19, // 19
      0,
      7,
      19, // 20
      0,
      9,
      19, // 21
      0,
      9,
      0, // 22
      0,
      7,
      0, // 23
      0,
      3,
      0, // 24
      0,
      3,
      19, // 25
      -12,
      0,
      0, // 26
      -12,
      9,
      0, // 27
      -12,
      0,
      19, // 28
      -12,
      9,
      19, // 29
      -8,
      0,
      19, // 30
      -8,
      7,
      19, // 31
      -4,
      7,
      19, // 32
      -4,
      0,
      19, // 33
      -12,
      7,
      19, // 34
    ].map((n) => n * UNIT)
  );

  const windowIndexes = [
    0,
    25,
    19,
    0,
    24,
    25, // base
    3,
    2,
    24,
    23,
    3,
    24, // left
    17,
    20,
    25,
    16,
    20,
    17, // right
    21,
    20,
    22,
    22,
    20,
    23, // top
    5,
    4,
    8,
    8,
    4,
    9, // midle left
    10,
    15,
    11,
    11,
    15,
    14, // midle right
    0,
    22,
    26,
    26,
    22,
    27, // back
    26,
    27,
    29,
    28,
    26,
    29, // other side
    28,
    30,
    31,
    28,
    31,
    34,
    19,
    32,
    33,
    19,
    20,
    32,
    20,
    21,
    29,
    20,
    29,
    34,
  ];

  const roofVertices = new Float32Array(
    [
      0,
      0,
      0, // 0
      12,
      0,
      0, // 1
      6,
      6,
      0, // 2
      0,
      0,
      19, // 3
      12,
      0,
      19, // 4
      6,
      6,
      19, // 5
    ].map((n) => n * UNIT)
  );

  const roofIndexes = [0, 1, 2, 0, 2, 5, 0, 3, 5, 1, 2, 4, 2, 4, 5, 3, 4, 5];

  const chimneyVertices = new Float32Array(
    [
      0,
      0,
      0, // 0
      0,
      5,
      0, // 1
      -3,
      5,
      0, // 2
      -3,
      3,
      0, // 3
      0,
      0,
      4, // 4
      0,
      5,
      4, // 5
      -3,
      5,
      4, // 6
      -3,
      3,
      4, // 7
    ].map((n) => n * UNIT)
  );

  const chimneyIndexes = [
    0, 1, 2, 0, 2, 3, 0, 1, 4, 1, 4, 5, 2, 3, 6, 3, 6, 7, 4, 5, 6, 5, 6, 7,
  ];

  const polyHouse = new THREE.Group();

  const window = createBufferGeometry(
    windowVertices,
    windowIndexes,
    HOUSEVALUES
  );
  window.position.set(12 * UNIT, 0, -19 * UNIT);

  polyHouse.add(window);

  const roof = createBufferGeometry(roofVertices, roofIndexes, ROOFVALUES);
  roof.position.set(0, 9 * UNIT, -19 * UNIT);

  polyHouse.add(roof);

  const chimney = createBufferGeometry(
    chimneyVertices,
    chimneyIndexes,
    CHIMNEYVALUES
  );
  chimney.position.set(11 * UNIT, 9 * UNIT, -9 * UNIT);

  polyHouse.add(chimney);

  polyHouse.position.set(-20 * UNIT, 0, 30 * UNIT);

  scene.add(polyHouse);
}

function createBufferGeometry(vertices, indexes, values) {
  const buffer = new THREE.BufferGeometry();

  buffer.setIndex(indexes);
  buffer.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  buffer.computeVertexNormals();

  const mesh = new THREE.Mesh(buffer, values.material);

  values.mesh.push(mesh);

  return mesh;
}

function createPlaneHouse(width, height, value) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const mesh = new THREE.Mesh(geometry, value.material);
  value.mesh.push(mesh);
  return mesh;
}
