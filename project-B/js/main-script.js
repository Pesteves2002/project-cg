//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, waist, leftFoot, rightFoot;

let feet = [leftFoot, rightFoot];

let cameras = [];

let currentCamera;

let UNIT = 15;

const Primitives = {
  CUBE: "cube",
  CYLINDER: "cylinder",
};

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

let headRotation = {
  X: Math.PI / 100,
};

let waistRotation = {
  X: Math.PI / 100,
};

let footRotation = {
  X: Math.PI / 100,
};

let trailerTranslation = {
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

let headValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
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
  relativeX: 5 * UNIT,
  relativeY: -1 * UNIT,
  relativeZ: -3 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
  positiveTranslations: [true, false],
};

let forearmValues = {
  width: 2 * UNIT,
  depth: 4 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -2 * UNIT,
  relativeZ: 3 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
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

let thightValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 3 * UNIT,
  relativePositions: [
    [2 * UNIT, -8.5 * UNIT, 0 * UNIT],
    [-2 * UNIT, -8.5 * UNIT, 0 * UNIT],
  ],
};

let legValues = {
  width: 4 * UNIT,
  depth: 2 * UNIT,
  height: 7 * UNIT,
  relativePositions: [
    [2 * UNIT, -13.5 * UNIT, 0 * UNIT],
    [-2 * UNIT, -13.5 * UNIT, 0 * UNIT],
  ],
};

let footValues = {
  width: 4 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativePositions: [
    [2 * UNIT, -18 * UNIT, 0 * UNIT],
    [-2 * UNIT, -18 * UNIT, 0 * UNIT],
  ],
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

function createObject3D(objectValues) {
  "use strict";

  let object = new THREE.Object3D();

  let geometry;

  switch (objectValues.type) {
    case Primitives.CUBE:
      geometry = new THREE.BoxGeometry(
        objectValues.width,
        objectValues.height,
        objectValues.depth
      );
      break;
    case Primitives.CYLINDER:
      geometry = new THREE.CylinderGeometry(
        objectValues.radiusTop,
        objectValues.radiusBottom,
        objectValues.height
      );
      break;
    default:
      console.log("Invalid object type");
      break;
  }

  let mesh = new THREE.Mesh(geometry, objectValues.material);

  object.add(mesh);

  return object;
}

function setPosition(obj, objectValues) {
  obj.position.set(
    objectValues.relativeX,
    objectValues.relativeY,
    objectValues.relativeZ
  );
}

function createRobot() {
  "use strict";

  robot = createTorso();
  robot.position.set(robotPosition.X, robotPosition.Y, robotPosition.Z);

  scene.add(robot);
}

function createTorso() {
  "use strict";

  head = createHead();
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

  torso.add(head);
  torso.add(arms);
  torso.add(back);
  torso.add(abdomen);
  torso.add(mesh);

  mesh.position.set(
    torsoValues.relativeX,
    torsoValues.relativeY,
    torsoValues.relativeZ
  );

  return torso;
}

function createHead() {
  "use strict";

  const head = new THREE.Group();
  const headCube = createObject3D(headValues);
  setPosition(headCube, headValues);
  head.add(headCube);

  // change cube position to have pivot point at the bottom
  headCube.position.set(
    headValues.relativeX,
    -headValues.height,
    headValues.relativeZ
  );

  // change group position to allow rotation around the pivot point
  head.position.set(
    headValues.relativeX,
    headValues.height,
    headValues.relativeZ
  );

  return head;
}

function createArms() {
  "use strict";

  let arms = new THREE.Group();

  leftArm = createArm();
  // recursive cloning and mirroring
  rightArm = leftArm.clone(true);
  rightArm.position.set(
    -armValues.relativeX,
    armValues.relativeY,
    armValues.relativeZ
  );

  arms.add(leftArm);
  arms.add(rightArm);

  return arms;
}

function createArm() {
  "use strict";

  const group = new THREE.Group();

  const arm = createObject3D(armValues);

  const forearm = createObject3D(forearmValues);
  setPosition(forearm, forearmValues);

  group.add(arm);
  group.add(forearm);
  setPosition(group, armValues);

  return group;
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

  waist = createWaist();

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

  let thights = createThights();

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
  waist.add(thights);

  return waist;
}

function createThights() {
  "use strict";

  let thights = new THREE.Object3D();

  let leftThight = createThight(0);
  let rightThight = createThight(1);

  thights.add(leftThight);
  thights.add(rightThight);

  return thights;
}

function createThight(index) {
  "use strict";

  let leg = createLeg(index);

  let thight = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    thightValues.width,
    thightValues.height,
    thightValues.depth
  );

  thight.add(leg);

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    thightValues.relativePositions[index][0],
    thightValues.relativePositions[index][1],
    thightValues.relativePositions[index][2]
  );

  thight.add(mesh);

  return thight;
}

function createLeg(index) {
  "use strict";

  let foot = createFoot(index);

  let leg = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    legValues.width,
    legValues.height,
    legValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    legValues.relativePositions[index][0],
    legValues.relativePositions[index][1],
    legValues.relativePositions[index][2]
  );

  leg.add(foot);
  leg.add(mesh);

  return leg;
}

function createFoot(index) {
  "use strict";

  feet[index] = new THREE.Object3D();

  let geometry = new THREE.BoxGeometry(
    footValues.width,
    footValues.height,
    footValues.depth
  );

  let mesh = new THREE.Mesh(geometry, materialValues.robot);
  mesh.position.set(
    footValues.relativePositions[index][0],
    footValues.relativePositions[index][1],
    footValues.relativePositions[index][2]
  );

  feet[index].add(mesh);

  return feet[index];
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

  // ANIMATE PARA AQUI
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

  if (head.userData.move) {
    if (head.userData.open) {
      head.rotation.x += headRotation.X;
    }
    if (!head.userData.open) {
      head.rotation.x -= headRotation.X;
    }
  }

  if (waist.userData.move) {
    if (waist.userData.open) {
      waist.rotation.x += waistRotation.X;
    }
    if (!waist.userData.open) {
      waist.rotation.x -= waistRotation.X;
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
      trailer.userData.zStep = trailerTranslation.Z;
      break;
    case 38: //up
      trailer.userData.x = true;
      trailer.userData.xStep = -trailerTranslation.X;
      break;
    case 39: //right
      trailer.userData.z = true;
      trailer.userData.zStep = -trailerTranslation.Z;
      break;
    case 40: //down
      trailer.userData.x = true;
      trailer.userData.xStep = trailerTranslation.X;
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

    case 70: //f
      head.userData.move = true;
      head.userData.open = false;
      break;

    case 82: //r
      head.userData.move = true;
      head.userData.open = true;
      break;

    case 87: // w
      waist.userData.move = true;
      waist.userData.open = true;
      break;

    case 83: // s
      waist.userData.move = true;
      waist.userData.open = false;
      break;

    case 65: //a
      leftFoot.userData.move = true;
      leftFoot.userData.open = true;
      break;

    case 81: //q
      leftFoot.userData.move = true;
      leftFoot.userData.open = false;
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

    case 70: //f
    case 82: //r
      head.userData.move = false;
      head.userData.move = false;
      break;

    case 87: // w
    case 83: // s
      waist.userData.move = false;
      break;

    case 65: //a
    case 81: //q
      leftFoot.userData.move = false;
      break;
  }
}
