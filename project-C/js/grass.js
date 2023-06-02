let grassScene = new THREE.Scene();

let grassTexture;

let grassCamera;

const GRASSBOX = 256;

let flowers = new THREE.Group();

function createGrass() {
  const geometry = new THREE.BoxGeometry(GRASSBOX, 0, GRASSBOX);

  const grass = new THREE.Mesh(geometry, MATERIALVALUES.grass);
  grass.position.set(GRASSBOX / 2, 0, GRASSBOX / 2);

  grassScene.add(grass);

  grassScene.add(new THREE.AxesHelper(5 * UNIT));

  grassCamera = createOrtographicCamera();

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

  grassScene.remove(flowers);
  flowers = new THREE.Group();

  for (let i = 0; i < GRASSBOX * 10; i++) {
    const sphere = new THREE.SphereGeometry(0.1);

    const material = new THREE.MeshBasicMaterial({
      color: FLOWERCOLORS[Math.floor(Math.random() * FLOWERCOLORS.length)],
    });

    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(Math.random() * GRASSBOX, 1, Math.random() * GRASSBOX);

    flowers.add(mesh);
  }

  grassScene.add(flowers);
}
