let skyScene = new THREE.Scene();

let skyTexture;

let skyCamera;

const SKYBOX = 100;

function createSky() {
  const geometry = new THREE.BufferGeometry();

  const positions = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0].map((n) => n * SKYBOX);

  const indices = [0, 1, 2, 2, 3, 0];

  const blue = new THREE.Color(0x0000ff);
  const purple = new THREE.Color(0xa32cc4);
  const colors = [purple, blue, blue, purple].flatMap((color) => [
    color.r,
    color.g,
    color.b,
  ]);

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
  sky.position.set(0, 0, 0);

  skyScene.add(sky);

  skyTexture = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter }
  );

  createOrtographicCamera();

  renderer.render(skyScene, skyCamera, skyTexture);
}

function createOrtographicCamera() {
  "use strict";
  skyCamera = new THREE.OrthographicCamera(
    -SKYBOX / 2,
    SKYBOX / 2,
    SKYBOX / 2,
    -SKYBOX / 2,
    1,
    10000
  );

  skyCamera.position.set(SKYBOX / 2, SKYBOX, SKYBOX / 2);
  skyCamera.lookAt(SKYBOX / 2, 0, SKYBOX / 2);
  skyCamera.updateProjectionMatrix();
}
