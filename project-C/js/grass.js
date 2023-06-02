let grassTexture;

let grassCamera;

let flowers = new THREE.Group();

function createGrass() {
  const geometry = new THREE.BoxGeometry(
    GROUNDVALUES.size,
    0,
    GROUNDVALUES.size
  );

  const grass = new THREE.Mesh(geometry, MATERIALVALUES.grass);
  grass.position.set(GROUNDVALUES.size / 2, 0, GROUNDVALUES.size / 2);

  skyScene.add(grass);

  skyScene.add(new THREE.AxesHelper(5 * UNIT));

  grassCamera = createOrtographicCamera(CAMERAVALUES.ground);

  createFlowers();

  grassTexture = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
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

  for (let i = 0; i < GROUNDVALUES.size * 10; i++) {
    const geometry = new THREE.SphereGeometry(GROUNDVALUES.flowerSize);

    const material = new THREE.MeshBasicMaterial({
      color:
        GROUNDVALUES.colors[
          Math.floor(Math.random() * GROUNDVALUES.colors.length)
        ],
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.random() * GROUNDVALUES.size,
      1,
      Math.random() * GROUNDVALUES.size
    );

    flowers.add(mesh);
  }

  skyScene.add(flowers);
}

function createValidPosition(mesh) {}
