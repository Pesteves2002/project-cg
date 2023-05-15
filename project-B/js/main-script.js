//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera, scene, renderer;

var geometry, material, mesh;

var cameras = [];

var currentCamera;

var UNIT = 10;

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

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
  width: 8 * UNIT,
  depth: 24 * UNIT,
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
  width: 6 * UNIT,
  depth: 15 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: -4.5 * UNIT,
  material: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),
};

var trailerWheelsValues = {
  radius: 1.5 * UNIT,
  height: 1 * UNIT,
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
  width: 2 * UNIT,
  depth: 1 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 10 * UNIT,
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

  scene.add(new THREE.AxesHelper(1000));
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

  var trailer = createTrailerBox();

  trailer.position.set(trailerPosition.X, trailerPosition.Y, trailerPosition.Z);

  scene.add(trailer);
}

function createTrailerBox() {
  "use strict";

  var wheelsWithDeposit = createTrailerDeposit();
  var pin = createTrailerPin();

  var geometry = new THREE.BoxGeometry(
    trailerBoxValues.width,
    trailerBoxValues.height,
    trailerBoxValues.depth
  );

  var mesh = new THREE.Mesh(geometry, trailerBoxValues.material);
  mesh.position.set(
    trailerBoxValues.relativeX,
    trailerBoxValues.relativeY,
    trailerBoxValues.relativeZ
  );

  var trailerBox = new THREE.Object3D();

  trailerBox.add(mesh);
  trailerBox.add(wheelsWithDeposit);
  trailerBox.add(pin);

  return trailerBox;
}

function createTrailerDeposit() {
  "use strict";

  var wheels = createTrailerWheels();
  wheels.position.set(
    trailerDepositValues.relativeX,
    trailerDepositValues.relativeY,
    trailerDepositValues.relativeZ
  );

  var geometry = new THREE.BoxGeometry(
    trailerDepositValues.width,
    trailerDepositValues.height,
    trailerDepositValues.depth
  );

  var mesh = new THREE.Mesh(geometry, trailerDepositValues.material);
  mesh.position.set(
    trailerDepositValues.relativeX,
    trailerDepositValues.relativeY,
    trailerDepositValues.relativeZ
  );

  var depositWithWheels = new THREE.Object3D();

  depositWithWheels.add(wheels);
  depositWithWheels.add(mesh);

  return depositWithWheels;
}

function createTrailerWheels() {
  "use strict";

  var wheels = new THREE.Object3D();

  trailerWheelsValues.relativePositions.forEach((relativePosition) => {
    wheels.add(createTrailerWheel(relativePosition));
  });

  return wheels;
}

function createTrailerWheel(relativePosition) {
  "use strict";

  var geometry = new THREE.CylinderGeometry(
    trailerWheelsValues.radius,
    trailerWheelsValues.radius,
    trailerWheelsValues.height
  );

  geometry.rotateZ(Math.PI / 2);

  var mesh = new THREE.Mesh(geometry, trailerWheelsValues.material);
  mesh.position.set(
    relativePosition[0],
    relativePosition[1],
    relativePosition[2]
  );

  return mesh;
}

function createTrailerPin() {
  "use strict";

  var geometry = new THREE.BoxGeometry(
    trailerPinValues.width,
    trailerPinValues.height,
    trailerPinValues.depth
  );

  var mesh = new THREE.Mesh(geometry, trailerPinValues.material);

  mesh.position.set(
    trailerPinValues.relativeX,
    trailerPinValues.relativeY,
    trailerPinValues.relativeZ
  );

  return mesh;
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
      break;
    case 54: //6
      scene.traverse(function (node) {
        // not working for wheels
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
  }

  render();
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
  "use strict";
}
