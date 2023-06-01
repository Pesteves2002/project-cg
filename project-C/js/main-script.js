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

  scene.background = new THREE.Color(0x000000);
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameras() {
  "use strict";
  createPrespectiveCamera(CAMERAVALUES[0]);
  createPrespectiveCamera(CAMERAVALUES[0]);
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

  const light = new THREE.AmbientLight(0xff0000, 0.5);
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

  globalLight = new THREE.HemisphereLight(0xff00ff, 1);
  globalLight.target = ovni;

  const helper = new THREE.HemisphereLightHelper(globalLight, UNIT * 50);
  scene.add(helper);

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

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createPlane() {
  "use strict";

  const loader = new THREE.TextureLoader();
  const displacementMap = loader.load("./imgs/heightmap.png");

  const material = new THREE.MeshStandardMaterial({
    color: 0x000ffb,
    displacementMap: displacementMap,
    displacementScale: 1000 * UNIT,
  });

  const geometry = new THREE.PlaneGeometry(1000 * UNIT, 1000 * UNIT, 30, 30);

  const plane = new THREE.Mesh(geometry, material);

  plane.rotation.x = -Math.PI / 2;

  plane.position.y = -105 * UNIT;

  scene.add(plane);
}

function createMoon() {
  "use strict";

  const moon = new createObject3D(MOONVALUES);
  setPosition(moon, MOONVALUES);

  MOONVALUES.material.emissive = new THREE.Color(MOONVALUES.material.color);

  scene.add(moon);
}

function createSkyBox() {
  "use strict";

  const sphere = new THREE.SphereGeometry(1000 * UNIT, 100, 100);

  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
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

  createSkyBox();

  createTree();

  createHouse();

  createMoon();

  createPlane();

  craeteGlobalIllunimation();

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

    case 49: //1
      currentCamera = cameras[0];
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

    case 83:
      turnOffOvniLights();
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
