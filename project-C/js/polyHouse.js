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

  const polyHouse = new THREE.Group();

  buffer.setIndex(entranceIndexes);
  buffer.setAttribute(
    "position",
    new THREE.BufferAttribute(entranceVertices, 3)
  );
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });

  const entrance = new THREE.Mesh(buffer, material);
  polyHouse.add(entrance);

  buffer = new THREE.BufferGeometry();

  buffer.setIndex(windowIndexes);
  buffer.setAttribute("position", new THREE.BufferAttribute(windowVertices, 3));

  const window = new THREE.Mesh(buffer, material);

  polyHouse.add(window);

  polyHouse.position.set(0, 0, 0);

  scene.add(polyHouse);
}
