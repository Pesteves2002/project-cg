let grassTexture;

let grassCamera;

let flowers = new THREE.Group();

function createPlane() {
  "use strict";

  const displacementMap = new THREE.TextureLoader().load(
    "./imgs/heightmap.png"
  );

  const material = new THREE.MeshPhongMaterial({
    map: grassTexture.texture,
    displacementMap: displacementMap,
    displacementScale: 1000 * UNIT,
  });

  const geometry = new THREE.PlaneGeometry(1000 * UNIT, 1000 * UNIT, 150, 150);

  const plane = new THREE.Mesh(geometry, material);

  plane.rotation.x = -Math.PI / 2;

  plane.position.y = -105 * UNIT;

  scene.add(plane);
}

function createGrass() {
  const geometry = new THREE.PlaneGeometry(
    GROUNDVALUES.size,
    GROUNDVALUES.size
  );
  geometry.rotateX(-Math.PI / 2);

  const grass = new THREE.Mesh(geometry, MATERIALVALUES.grass);
  grass.position.set(-GROUNDVALUES.size / 2, 0, GROUNDVALUES.size / 2);

  secondaryScene.add(grass);

  grassCamera = createOrtographicCamera(CAMERAVALUES.ground);
  grassCamera.updateProjectionMatrix();

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

  secondaryScene.remove(flowers);
  flowers = new THREE.Group();

  const grid = GROUNDVALUES.size / Math.sqrt(GROUNDVALUES.flowers);

  for (
    let i = GROUNDVALUES.flowerSize + 1;
    i < GROUNDVALUES.size - 1;
    i += grid
  ) {
    for (
      let j = GROUNDVALUES.flowerSize + 1;
      j < GROUNDVALUES.size - 1;
      j += grid
    ) {
      let flower = createFlower();
      let x = Math.random();
      let z = Math.random();
      if (Math.random() < 0.5) {
        x = -x;
      }
      if (Math.random() < 0.5) {
        z = -z;
      }

      flower.position.set(-i + x, 2, j + z);
      flowers.add(flower);
    }
  }
  secondaryScene.add(flowers);
}

function createFlower() {
  const geometry = new THREE.CircleGeometry(GROUNDVALUES.flowerSize);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.MeshBasicMaterial({
    color:
      GROUNDVALUES.colors[
        Math.floor(Math.random() * GROUNDVALUES.colors.length)
      ],
  });

  return new THREE.Mesh(geometry, material);
}
