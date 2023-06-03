function createPolyHouse() {
  "use strict";

  let buffer = new THREE.BufferGeometry();

  const entranceVertices = new Float32Array(
    [
      0,
      0,
      0, // 0
      4,
      0,
      0, // 1
      4,
      7,
      0, // 2
      8,
      7,
      0, // 3
      8,
      0,
      0, // 4
      12,
      0,
      0, // 5
      12,
      7,
      0, // 6
      12,
      9,
      0, // 7
      0,
      9,
      0, // 8
      0,
      7,
      0, // 9
    ].map((n) => n * UNIT)
  );

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
    ].map((n) => n * UNIT)
  );

  const entranceIndexes = [
    0, 1, 2, 0, 2, 9, 3, 4, 5, 3, 5, 6, 6, 7, 8, 6, 8, 9,
  ];

  const windowIndexes = [
    0, 1, 3, 0, 3, 23, 1, 17, 18, 1, 2, 17, 4, 5, 8, 4, 8, 9, 10, 11, 14, 10,
    14, 15, 18, 19, 20, 16, 18, 20, 20, 21, 22, 20, 22, 23,
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

  const entrance = createBufferGeometry(
    entranceVertices,
    entranceIndexes,
    HOUSEVALUES
  );

  polyHouse.add(entrance);

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
    ROOFVALUES
  );
  chimney.position.set(11 * UNIT, 9 * UNIT, -9 * UNIT);

  polyHouse.add(chimney);

  polyHouse.position.set(0, 0, 20 * UNIT);

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
