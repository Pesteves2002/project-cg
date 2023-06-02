let grassTexture;

let grassCamera;

let flowers = new THREE.Group();

function createGrass() {
  const geometry = new THREE.PlaneGeometry(
    GROUNDVALUES.size,
    GROUNDVALUES.size
  );
  geometry.rotateX(-Math.PI / 2);

  const grass = new THREE.Mesh(geometry, MATERIALVALUES.grass);
  grass.position.set(-GROUNDVALUES.size / 2, 0, GROUNDVALUES.size / 2);

  skyScene.add(grass);

  grassCamera = createOrtographicCamera(CAMERAVALUES.ground);
  grassCamera.position.set(-GROUNDVALUES.size / 2, 10, GROUNDVALUES.size / 2);
  grassCamera.lookAt(-GROUNDVALUES.size / 2, 0, GROUNDVALUES.size / 2);
  grassCamera.updateProjectionMatrix();

  createFlowers();

  grassTexture = new THREE.WebGLRenderTarget(
    window.innerWidth * 4,
    window.innerHeight * 4,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
    }
  );
}

function createFlowers() {
  "use strict";

  skyScene.remove(flowers);
  flowers = new THREE.Group();

  for (let i = 0; i < GROUNDVALUES.flowers; i++) {
    const geometry = new THREE.CircleGeometry(GROUNDVALUES.flowerSize);

    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      color:
        GROUNDVALUES.colors[
          Math.floor(Math.random() * GROUNDVALUES.colors.length)
        ],
    });

    const mesh = new THREE.Mesh(geometry, material);
    createValidPosition(mesh);

    flowers.add(mesh);
  }

  skyScene.add(flowers);
}

function createValidPosition(mesh) {
  let x, z;

  do {
    x = -Math.random() * GROUNDVALUES.size;
  } while (
    x <= -GROUNDVALUES.size + GROUNDVALUES.flowerSize ||
    x >= 0 - GROUNDVALUES.flowerSize
  );

  do {
    z = Math.random() * GROUNDVALUES.size;
  } while (
    z >= GROUNDVALUES.size - GROUNDVALUES.flowerSize ||
    z <= GROUNDVALUES.flowerSize
  );

  mesh.position.set(x, 0.2, z);
}
