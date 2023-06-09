let skyTexture;

let skyCamera;

let stars = new THREE.Group();

function createSkyBox() {
  "use strict";

  // create semi-sphere
  const sphere = new THREE.SphereGeometry(
    700 * UNIT,
    32,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );

  const material = new THREE.MeshPhongMaterial({
    map: skyTexture.texture,
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(sphere, material);
  mesh.position.y = -350 * UNIT;

  return mesh;
}

function createSky() {
  const geometry = new THREE.BufferGeometry();

  const positions = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0].map(
    (n) => n * SKYVALUES.size
  );

  const indices = [0, 1, 2, 2, 3, 0];

  const colors = [
    SKYVALUES.purple,
    SKYVALUES.blue,
    SKYVALUES.blue,
    SKYVALUES.purple,
  ].flatMap((color) => [color.r, color.g, color.b]);

  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
  });

  const sky = new THREE.Mesh(geometry, material);
  secondaryScene.add(sky);

  skyCamera = createOrtographicCamera(CAMERAVALUES.sky);
  skyCamera.updateProjectionMatrix();

  skyTexture = new THREE.WebGLRenderTarget(
    // set resolution
    window.innerWidth * 4,
    window.innerHeight * 4,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
    }
  );
}

function createStars() {
  "use strict";

  secondaryScene.remove(stars);
  stars = new THREE.Group();

  const grid = SKYVALUES.size / Math.sqrt(SKYVALUES.stars);

  // generate non overlapping stars
  for (let i = SKYVALUES.starSize + 1; i < SKYVALUES.size - 1; i += grid) {
    for (let j = SKYVALUES.starSize + 1; j < SKYVALUES.size - 1; j += grid) {
      let celestialBody = createStar();
      let x = Math.random();
      let z = Math.random();
      if (Math.random() < 0.5) {
        x = -x;
      }
      if (Math.random() < 0.5) {
        z = -z;
      }
      celestialBody.position.set(i + x, 2, j + z);
      stars.add(celestialBody);
    }
  }
  secondaryScene.add(stars);
}

function createStar() {
  const geometry = new THREE.CircleGeometry(SKYVALUES.starSize);
  geometry.rotateX(-Math.PI / 2);

  return new THREE.Mesh(geometry, SKYVALUES.star);
}
