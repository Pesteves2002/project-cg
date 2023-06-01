function createSky() {
  const geometry = new THREE.BufferGeometry();

  const positions = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0].map(
    (n) => n * UNIT * 1000
  );

  const indices = [0, 1, 2, 2, 3, 0];

  const blue = new THREE.Color(0x0000ff);
  const purple = new THREE.Color(0xa32cc4);
  const colors = [purple, blue, blue, purple].flatMap((color) => [
    color.r,
    color.g,
    color.b,
  ]);
  console.log(colors);

  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.computeVertexNormals();
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
  });

  const sky = new THREE.Mesh(geometry, material);
  sky.position.set(0, 100 * UNIT, 0);

  scene.add(sky);
}
