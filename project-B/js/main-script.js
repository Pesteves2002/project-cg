//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera, scene, renderer;

var geometry, material, mesh;

var cameras = [];

var currentCamera;

var UNIT = 10;

// Green Y
// BLUE Z
// RED X

var cameraValues = [
  [0, 100, 0],
  [0, 0, 100],
  [100, 0, 0],
  [300, 300, 300],
  [300, 300, 300],
];

var trailerPosition = {
  X: 3,
  Y: 7,
  Z: 3,
};

var trailerBoxValues = {
  length: 24 * UNIT,
  width: 8 * UNIT,
  height: 6 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
  material: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),
};

var trailerDepositValues = {
  length: 15 * UNIT,
  width: 6 * UNIT,
  height: 2 * UNIT,
  relativeX: 4.5 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 0 * UNIT,
  material: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),
};

var trailerWheelsValues = {
  radius: 1.5 * UNIT,
  length: 1 * UNIT,
  relativePositions: [
    [3.5 * UNIT, -0.5 * UNIT, 3.5 * UNIT],
    [3.5 * UNIT, -0.5 * UNIT, -3.5 * UNIT],
    [-3.5 * UNIT, -0.5 * UNIT, 3.5 * UNIT],
    [-3.5 * UNIT, -0.5 * UNIT, -3.5 * UNIT],
  ],
  material: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),
};

var trailerPinValues = {
  length: 1 * UNIT,
  width: 2 * UNIT,
  height: 2 * UNIT,
  relativeX: -10 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 0 * UNIT,
  material: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),
};

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
  "use strict";

  scene = new THREE.Scene();

  // set the background color of the scene
  scene.background = new THREE.Color(0xa2bce0);

  scene.add(new THREE.AxesHelper(100));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameras() {
  "use strict";
  cameraValues.forEach((cameraValue) => {
    createOrtographicCamera(cameraValue);
  });
  createPrespectiveCamera(cameraValues[4]);
}

function createPrespectiveCamera(cameraValue) {
  "use strict";
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = cameraValue[0];
  camera.position.y = cameraValue[1];
  camera.position.z = cameraValue[2];
  camera.lookAt(scene.position);

  cameras.push(camera);
}

function createOrtographicCamera(cameraValue) {
  "use strict";
  camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    1,
    1000
  );

  camera.position.x = cameraValue[0];
  camera.position.y = cameraValue[1];
  camera.position.z = cameraValue[2];
  camera.lookAt(scene.position);

  cameras.push(camera);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createTrailer() {
  "use strict";

  var trailer = new THREE.Object3D();

  createTrailerBox(trailer);
  createTrailerDeposit(trailer);
  createTrailerPin(trailer);

  trailer.position.set(trailerPosition.X, trailerPosition.Y, trailerPosition.Z);

  scene.add(trailer);
}

function createTrailerBox(trailer) {
  "use strict";

  var geometry = new THREE.BoxGeometry(
    trailerBoxValues.length,
    trailerBoxValues.height,
    trailerBoxValues.width
  );

  var mesh = new THREE.Mesh(geometry, trailerBoxValues.material);
  mesh.position.set(
    trailerBoxValues.relativeX,
    trailerBoxValues.relativeY,
    trailerBoxValues.relativeZ
  );
  trailer.add(mesh);
}

function createTrailerDeposit(trailer) {
  "use strict";

  var geometry = new THREE.BoxGeometry(
    trailerDepositValues.length,
    trailerDepositValues.height,
    trailerDepositValues.width
  );

  var deposit = new THREE.Mesh(geometry, trailerDepositValues.material);

  var depositWithWheels = new THREE.Object3D();

  depositWithWheels.add(deposit);
  createTrailerWheels(depositWithWheels);
  depositWithWheels.position.set(
    trailerDepositValues.relativeX,
    trailerDepositValues.relativeY,
    trailerDepositValues.relativeZ
  );

  trailer.add(depositWithWheels);
}

function createTrailerWheels(depositWithWheels) {
  "use strict";

  trailerWheelsValues.relativePositions.forEach((relativePosition) => {
    createTrailerWheel(depositWithWheels, relativePosition);
  });
}

function createTrailerWheel(depositWithWheels, relativePosition) {
  "use strict";

  var geometry = new THREE.CylinderGeometry(
    trailerWheelsValues.radius,
    trailerWheelsValues.radius,
    trailerWheelsValues.length
  );

  geometry.rotateX(Math.PI / 2);

  var mesh = new THREE.Mesh(geometry, trailerWheelsValues.material);
  mesh.position.set(
    relativePosition[0],
    relativePosition[1],
    relativePosition[2]
  );

  depositWithWheels.add(mesh);
}

function createTrailerPin(trailer) {
  "use strict";

  var geometry = new THREE.BoxGeometry(
    trailerPinValues.length,
    trailerPinValues.height,
    trailerPinValues.width
  );

  var mesh = new THREE.Mesh(geometry, trailerPinValues.material);

  mesh.position.set(
    trailerPinValues.relativeX,
    trailerPinValues.relativeY,
    trailerPinValues.relativeZ
  );

  trailer.add(mesh);
}
//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions() {
  "use strict";
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions() {
  "use strict";
}

////////////
/* UPDATE */
////////////
function update() {
  "use strict";
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

  createCameras();

  currentCamera = cameras[4];

  createTrailer();

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
  "use strict";
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
      currentCamera = cameras[0];
      break;
    case 50: //2
      currentCamera = cameras[1];
      break;
    case 51: //3
      currentCamera = cameras[2];
      break;
    case 52: //4
      currentCamera = cameras[3];
      break;
    case 53: //5
      currentCamera = cameras[4];
  }

  render();
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
  "use strict";
}
