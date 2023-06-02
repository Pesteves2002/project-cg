let skyScene = new THREE.Scene();

let skyTexture;

let skyCamera;

let stars = new THREE.Group();

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
  skyScene.add(sky);

  skyCamera = createOrtographicCamera();

  createStars();

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

function createOrtographicCamera() {
  "use strict";
  camera = new THREE.OrthographicCamera(
    -SKYVALUES.size / 2,
    SKYVALUES.size / 2,
    SKYVALUES.size / 2,
    -SKYVALUES.size / 2,
    1,
    100
  );

  camera.position.set(SKYVALUES.size / 2, 10, SKYVALUES.size / 2);
  camera.lookAt(SKYVALUES.size / 2, 0, SKYVALUES.size / 2);
  camera.updateProjectionMatrix();

  return camera;
}

function createStars() {
  "use strict";

  skyScene.remove(stars);
  stars = new THREE.Group();

  for (let i = 0; i < SKYVALUES.stars; i++) {
    let celestialBody;
    if (i % 20 === 0) {
      console.log("planet");
      celestialBody = createPlanet();
    } else celestialBody = createStar();
    celestialBody.position.set(
      Math.random() * SKYVALUES.size,
      1,
      (Math.random() * SKYVALUES.size * 3) / 5 // in order to have more bodies at the visible part of the sky
    );

    stars.add(celestialBody);
  }
  skyScene.add(stars);
}

function createStar() {
  const geometry = new THREE.SphereGeometry(SKYVALUES.starSize);

  return new THREE.Mesh(geometry, SKYVALUES.star);
}

function createPlanet() {
  const geometry = new THREE.SphereGeometry(SKYVALUES.planetSize);

  return new THREE.Mesh(geometry, SKYVALUES.planet);
}
