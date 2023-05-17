//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer;

let geometry, material, mesh;

let trailer, robot, leftArm, rightArm;

let cameras = [];

let currentCamera;

let UNIT = 30;

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

let cameraValues = [
  [0, 100, 0],
  [0, 0, 100],
  [100, 0, 0],
  [20, 100, 300],
  [1000, 1000, 1000],
];

let trailerPosition = {
  X: 800,
  Y: 0,
  Z: 200,
};

let robotPosition = {
  X: 0,
  Y: 0,
  Z: 0,
};

let trailerTransaltion = {
  X: 0.3 * UNIT,
  Z: 0.3 * UNIT,
};

let armTranslation = {
  X: 0.1 * UNIT,
};

let materialValues = {
  tires: new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  }),

  trailer: new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  }),

  robot: new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }),
};

let torsoValues = {
  width: 8 * UNIT,
  depth: 4 * UNIT,
  height: 4 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
};

let armValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 6 * UNIT,
  relativePositions: [
    [5 * UNIT, -1 * UNIT, -3 * UNIT],
    [-5 * UNIT, -1 * UNIT, -3 * UNIT],
  ],
  positiveTranslations: [true, false],
};

let forearmValues = {
  width: 2 * UNIT,
  depth: 4 * UNIT,
  height: 2 * UNIT,
  relativePositions: [
    [5 * UNIT, -3 * UNIT, 0 * UNIT],
    [-5 * UNIT, -3 * UNIT, 0 * UNIT],
  ],
};

let backValues = {
  width: 4 * UNIT,
  depth: 2 * UNIT,
  height: 4 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: -3 * UNIT,
};

let abdomenValues = {
  width: 4 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -3 * UNIT,
  relativeZ: 0 * UNIT,
};

let waistValues = {
  width: 6 * UNIT,
  depth: 2 * UNIT,
  height: 3 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -5.5 * UNIT,
  relativeZ: 0 * UNIT,
};

let trailerBoxValues = {
  width: 8 * UNIT,
  depth: 24 * UNIT,
  height: 6 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
};

let trailerDepositValues = {
  width: 6 * UNIT,
  depth: 15 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: -4.5 * UNIT,
};

let trailerWheelsValues = {
  radius: 1.5 * UNIT,
  height: 1 * UNIT,
  relativePositions: [
    [3.5 * UNIT, -0.5 * UNIT, 3.5 * UNIT],
    [3.5 * UNIT, -0.5 * UNIT, -3.5 * UNIT],
    [-3.5 * UNIT, -0.5 * UNIT, 3.5 * UNIT],
    [-3.5 * UNIT, -0.5 * UNIT, -3.5 * UNIT],
  ],
};

let trailerPinValues = {
  width: 2 * UNIT,
  depth: 1 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 10 * UNIT,
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
    10000
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
    10000
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

function createRobot() {
  "use strict";

  robot = createTorso();

  robot.position.set(robotPosition.X, robotPosition.Y, robotPosition.Z);

  scene.add(robot);
}

function createTorso() {
  "use strict";

  let arms = createArms();
  let back = createBack();
  let abdomen = createAbdomen();

  let torso = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    torsoValues.width,
    torsoValues.height,
    torsoValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    torsoValues.relativeX,
    torsoValues.relativeY,
    torsoValues.relativeZ
  );

  torso.add(arms);
  torso.add(back);
  torso.add(abdomen);
  torso.add(mesh);

  return torso;
}

function createArms() {
  "use strict";

  let arms = new THREE.Object3D();

  leftArm = createArm(0);
  rightArm = createArm(1);

  arms.add(leftArm);
  arms.add(rightArm);

  return arms;
}

function createArm(index) {
  "use strict";

  let forearm = createForearm(index);

  let arm = new THREE.Object3D();

  arm.add(forearm);

  let geometry = new THREE.BoxGeometry(
    armValues.width,
    armValues.height,
    armValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    armValues.relativePositions[index][0],
    armValues.relativePositions[index][1],
    armValues.relativePositions[index][2]
  );

  arm.add(mesh);

  return arm;
}

function createForearm(index) {
  "use strict";

  let forearm = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    forearmValues.width,
    forearmValues.height,
    forearmValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    forearmValues.relativePositions[index][0],
    forearmValues.relativePositions[index][1],
    forearmValues.relativePositions[index][2]
  );

  forearm.add(mesh);

  return forearm;
}

function createBack() {
  "use strict";

  let back = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    backValues.width,
    backValues.height,
    backValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    backValues.relativeX,
    backValues.relativeY,
    backValues.relativeZ
  );

  back.add(mesh);

  return back;
}

function createAbdomen() {
  "use strict";

  let waist = createWaist();

  let abdomen = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    abdomenValues.width,
    abdomenValues.height,
    abdomenValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    abdomenValues.relativeX,
    abdomenValues.relativeY,
    abdomenValues.relativeZ
  );

  abdomen.add(waist);
  abdomen.add(mesh);

  return abdomen;
}

function createWaist() {
  "use strict";

  let waist = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    waistValues.width,
    waistValues.height,
    waistValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    waistValues.relativeX,
    waistValues.relativeY,
    waistValues.relativeZ
  );

  waist.add(mesh);

  return waist;
}

function createTrailer() {
  "use strict";

  trailer = createTrailerBox();

  trailer.position.set(trailerPosition.X, trailerPosition.Y, trailerPosition.Z);

  scene.add(trailer);
}

function createTrailerBox() {
  "use strict";

  let wheelsWithDeposit = createTrailerDeposit();
  let pin = createTrailerPin();

  let geometry = new THREE.BoxGeometry(
    trailerBoxValues.width,
    trailerBoxValues.height,
    trailerBoxValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.trailer);
  mesh.position.set(
    trailerBoxValues.relativeX,
    trailerBoxValues.relativeY,
    trailerBoxValues.relativeZ
  );

  let trailerBox = new THREE.Object3D();

  trailerBox.add(mesh);
  trailerBox.add(wheelsWithDeposit);
  trailerBox.add(pin);

  return trailerBox;
}

function createTrailerDeposit() {
  "use strict";

  let wheels = createTrailerWheels();
  wheels.position.set(
    trailerDepositValues.relativeX,
    trailerDepositValues.relativeY,
    trailerDepositValues.relativeZ
  );

  let geometry = new THREE.BoxGeometry(
    trailerDepositValues.width,
    trailerDepositValues.height,
    trailerDepositValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.trailer);
  mesh.position.set(
    trailerDepositValues.relativeX,
    trailerDepositValues.relativeY,
    trailerDepositValues.relativeZ
  );

  let depositWithWheels = new THREE.Object3D();

  depositWithWheels.add(wheels);
  depositWithWheels.add(mesh);

  return depositWithWheels;
}

function createTrailerWheels() {
  "use strict";

  let wheels = new THREE.Object3D();

  trailerWheelsValues.relativePositions.forEach((relativePosition) => {
    wheels.add(createTrailerWheel(relativePosition));
  });

  return wheels;
}

function createTrailerWheel(relativePosition) {
  "use strict";

  let geometry = new THREE.CylinderGeometry(
    trailerWheelsValues.radius,
    trailerWheelsValues.radius,
    trailerWheelsValues.height
  );

  geometry.rotateZ(Math.PI / 2);

  let mesh = new THREE.Mesh(geometry, materialValues.tires);
  mesh.position.set(
    relativePosition[0],
    relativePosition[1],
    relativePosition[2]
  );

  return mesh;
}

function createTrailerPin() {
  "use strict";

  let geometry = new THREE.BoxGeometry(
    trailerPinValues.width,
    trailerPinValues.height,
    trailerPinValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.trailer);

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

  createRobot();
  createTrailer();

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
  "use strict";

  if (trailer.userData.x) {
    trailer.position.x += trailer.userData.xStep;
  }
  if (trailer.userData.z) {
    trailer.position.z += trailer.userData.zStep;
  }

  if (leftArm.userData.move) {
    if (leftArm.userData.open) {
      leftArm.position.x += armTranslation.X;
      rightArm.position.x -= armTranslation.X;
    }
    if (!leftArm.userData.open) {
      leftArm.position.x -= armTranslation.X;
      rightArm.position.x += armTranslation.X;
    }
  }

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
      trailer.userData.z = true;
      trailer.userData.zStep = trailerTransaltion.Z;
      break;
    case 38: //up
      trailer.userData.x = true;
      trailer.userData.xStep = -trailerTransaltion.X;
      break;
    case 39: //right
      trailer.userData.z = true;
      trailer.userData.zStep = -trailerTransaltion.Z;
      break;
    case 40: //down
      trailer.userData.x = true;
      trailer.userData.xStep = trailerTransaltion.X;
      break;
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
      Object.values(materialValues).forEach((material) => {
        material.wireframe = !material.wireframe;
      });
      break;
    case 68: //d
      leftArm.userData.move = true;
      leftArm.userData.open = true;
      break;
    case 69: //e
      leftArm.userData.move = true;
      leftArm.userData.open = false;
      break;
  }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
  "use strict";

  switch (e.keyCode) {
    case 37: //left
      trailer.userData.z = false;
      break;
    case 38: //up
      trailer.userData.x = false;
      break;
    case 39: //right
      trailer.userData.z = false;
      break;
    case 40: //down
      trailer.userData.x = false;
      break;
    case 68: //d
      leftArm.userData.move = false;
      break;
    case 69: //e
      leftArm.userData.move = false;
      break;
  }
}
