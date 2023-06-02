//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer, controls, delta;

let ovni;

let ovniLigths = [];

const cameras = [];

let currentCamera;

let globalLight;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
  "use strict";

  scene = new THREE.Scene();

  scene.add(new THREE.AxesHelper(1000));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameras() {
  "use strict";
  createPrespectiveCamera(CAMERAVALUES.main);
  createPrespectiveCamera(CAMERAVALUES.main);
  controls = new THREE.OrbitControls(cameras[1], renderer.domElement);

  controls.update();
}

function createPrespectiveCamera(cameraValue) {
  "use strict";
  camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    MINVIEWDISTANCE,
    MAXVIEWDISTANCE
  );
  camera.position.x = cameraValue[0];
  camera.position.y = cameraValue[1];
  camera.position.z = cameraValue[2];
  camera.lookAt(scene.position);

  cameras.push(camera);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

function createAmbientLight() {
  "use strict";

  const light = new THREE.AmbientLight(LIGHTCOLORS.ambient, 0.25);
  scene.add(light);
}

function turnOffOvniLights() {
  "use strict";

  ovniLigths.forEach((light) => {
    light.intensity = 0;
  });
}

function turnOnOvniLights() {
  "use strict";

  ovniLigths.forEach((light) => {
    light.intensity = 1;
  });
}

function craeteGlobalIllunimation() {
  "use strict";

  globalLight = new THREE.DirectionalLight(LIGHTCOLORS.global, 5);
  globalLight.target = ovni;

  scene.add(globalLight);
}

function turnOnGlobalIllunimation() {
  "use strict";

  globalLight.intensity = 1;
}

function turnOffGlobalIllunimation() {
  "use strict";

  globalLight.intensity = 0;
}

function toggleGlobalIllunimation() {
  "use strict";

  if (globalLight.intensity === 0) {
    turnOnGlobalIllunimation();
  } else {
    turnOffGlobalIllunimation();
  }
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createPlane() {
  "use strict";

  const loader = new THREE.TextureLoader();
  const displacementMap = loader.load("./imgs/heightmap.png");

  const material = new THREE.MeshStandardMaterial({
    map: grassTexture.texture,
    displacementMap: displacementMap,
    displacementScale: 1000 * UNIT,
    side: THREE.DoubleSide,
  });

  material.displacementMap.wrapS = THREE.RepeatWrapping;
  material.displacementMap.wrapT = THREE.RepeatWrapping;
  material.displacementMap.repeat.set(150, 150);

  const geometry = new THREE.PlaneGeometry(1000 * UNIT, 1000 * UNIT, 150, 150);

  const plane = new THREE.Mesh(geometry, material);

  plane.rotation.x = -Math.PI / 2;

  plane.position.y = -105 * UNIT;

  scene.add(plane);
}

function createMoon() {
  "use strict";

  const moon = new createObject3D(MOONVALUES);
  setPosition(moon, MOONVALUES);

  MOONVALUES.material.emissive = new THREE.Color(MOONVALUES.color);

  scene.add(moon);
}

function createSkyBox() {
  "use strict";

  const sphere = new THREE.SphereGeometry(800 * UNIT);

  const material = new THREE.MeshBasicMaterial({
    map: skyTexture.texture,
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(sphere, material);

  scene.add(mesh);
}

////////////
/* UPDATE */
////////////
function update() {
  "use strict";

  translateOvni();

  ovni.rotation.y += (Math.PI / 180) * delta;
}

/////////////
/* DISPLAY */
/////////////
function render() {
  "use strict";
  renderer.setRenderTarget(skyTexture);
  renderer.clear();
  renderer.render(skyScene, skyCamera);

  renderer.setRenderTarget(grassTexture);
  renderer.clear();
  renderer.render(skyScene, grassCamera);

  renderer.setRenderTarget(null);
  renderer.clear();
  renderer.render(skyScene, grassCamera);
  renderer.render(scene, currentCamera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
  "use strict";

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();

  createAmbientLight();

  createCameras();

  currentCamera = cameras[1];

  createOvni();

  createTree();

  createHouse();

  createMoon();

  createGrass();

  createPlane();

  craeteGlobalIllunimation();

  createSky();

  createSkyBox();

  resetSteps();

  render();

  document.body.appendChild(VRButton.createButton(renderer));
  renderer.xr.enabled = true;

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
  "use strict";

  delta = CLOCK.getDelta() * DELTA_MULT;

  update();

  render();

  requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
  "use strict";

  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    currentCamera.aspect = window.innerWidth / window.innerHeight;
    currentCamera.updateProjectionMatrix();
  }
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
  "use strict";

  switch (e.keyCode) {
    case 49: //1
      createFlowers();
      break;

    case 50: // 2
      createStars();
      break;

    case 37: //left
      ovni.userData.zStep = OVNITRANSLATIONVALUES.stepZ;
      break;

    case 38: //up
      ovni.userData.xStep = -OVNITRANSLATIONVALUES.stepX;
      break;

    case 39: //right
      ovni.userData.zStep = -OVNITRANSLATIONVALUES.stepZ;
      break;

    case 40: //down
      ovni.userData.xStep = OVNITRANSLATIONVALUES.stepX;
      break;

    case 81: //q
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.LAMBERT);
      });
      break;

    case 87: // w
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.PHONG);
      });
      break;

    case 69: //e
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.TOON);
      });
      break;

    case 82: //r
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.BASIC);
      });
      break;

    case 80: // p
      turnOnOvniLights();
      break;

    case 83: // s
      turnOffOvniLights();
      break;

    case 68: // d
      toggleGlobalIllunimation();
  }
}
///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
  "use strict";

  switch (e.keyCode) {
    case 37: //left
    case 39: //right
      ovni.userData.zStep = 0;
      break;

    case 38: //up
    case 40: //down
      ovni.userData.xStep = 0;
      break;
  }
}
