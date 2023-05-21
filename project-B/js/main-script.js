//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, thights, foot;

let transformation;

let cameras = [];

let currentCamera;

let debugPoints = [];

let UNIT = 20;

let points = {
  truckMin: {
    x: 0,
    y: 0,
    z: 0,
  },
  truckMax: {
    x: 0,
    y: 0,
    z: 0,
  },

  trailerMin: {
    x: 0,
    y: 0,
    z: 0,
  },

  trailerMax: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const Primitives = {
  CUBE: "cube",
  CYLINDER: "cylinder",
};

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

let cameraValues = [
  [0, 1000, 0],
  [0, 0, 1000],
  [1000, 0, 0],
  [2000, 1000, 3000],
  [1000, 1000, 1000],
];

let trailerPosition = {
  X: 100,
  Y: -UNIT * 2,
  Z: 100,
};

let robotPosition = {
  X: 127,
  Y: 0,
  Z: 200,
};

let headRotation = {
  step: Math.PI / 100,
  min: -Math.PI - Math.PI / 100,
  max: Math.PI / 100,
};

let thightsRotation = {
  step: Math.PI / 100,
  min: -Math.PI / 100,
  max: Math.PI / 2 + Math.PI / 100,
};

let footRotation = {
  step: Math.PI / 100,
  min: -Math.PI / 100,
  max: Math.PI / 2 + Math.PI / 100,
};

let trailerTranslation = {
  stepX: 0.3 * UNIT,
  stepZ: 0.3 * UNIT,
  min: -1000 * UNIT,
  max: 1000 * UNIT,
};

const leftArmTranslation = {
  step: -0.1 * UNIT,
  min: -2 * UNIT,
  max: 0 * UNIT,
};

let rightArmTranslation = {
  step: 0.1 * UNIT,
  min: 0 * UNIT,
  max: 2 * UNIT,
};

const loader = new THREE.TextureLoader();

let materialValues = {
  tires: new THREE.MeshBasicMaterial({
    map: loader.load("imgs/tire.jpg"),
    wireframe: true,
  }),

  trailer: new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  }),

  trailerBox: new THREE.MeshBasicMaterial({
    map: loader.load("imgs/obama.jpg"),
    wireframe: true,
  }),

  robot: new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }),

  debug: new THREE.MeshBasicMaterial({
    color: 0x00ff00,
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

let eyesValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 0.5 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 1.5 * UNIT,
  relativeZ: 1 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot,
};

let hornsValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 4 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 4 * UNIT,
  relativeZ: -0.75 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot,
};

let torsoValues = {
  width: 8 * UNIT,
  depth: 4 * UNIT,
  height: 4 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
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
};

let tubeValues = {
  radiusTop: 0.5 * UNIT,
  radiusBottom: 0.5 * UNIT,
  height: 6 * UNIT,
  relativeX: 1 * UNIT,
  relativeY: 3 * UNIT,
  relativeZ: -1.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot,
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
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let abdomenValues = {
  width: 4 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let waistValues = {
  width: 6 * UNIT,
  depth: 2 * UNIT,
  height: 3 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -2.5 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let waistWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 2 * UNIT,
  relativeY: -2.75 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

let thightValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 3 * UNIT,
  relativeX: 2 * UNIT,
  relativeY: -3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let legValues = {
  width: 3 * UNIT,
  depth: 2 * UNIT,
  height: 7 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -5 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let legWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 2 * UNIT,
  relativeY: 2 * UNIT,
  relativeZ: 0.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

let footValues = {
  width: 8 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -12.5 * UNIT,
  relativeZ: 0.5 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot,
};

let trailerBoxValues = {
  width: 9 * UNIT,
  depth: 24 * UNIT,
  height: 6 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailerBox,
};

let trailerDepositValues = {
  width: 6.75 * UNIT,
  depth: 15 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: -4.5 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer,
};

let trailerWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 4 * UNIT,
  relativeY: -0.5 * UNIT,
  relativeZ: 3.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

let trailerPinValues = {
  width: 2 * UNIT,
  depth: 1 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 10 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer,
};

let debugPoint = {
  width: 1 * UNIT,
  depth: 1 * UNIT,
  height: 1 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.debug,
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

  const object = new THREE.Object3D();

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

  const mesh = new THREE.Mesh(geometry, objectValues.material);
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

function mirrorObject(obj, axis, mirror = false) {
  switch (axis) {
    case "X":
      obj.position.x = -obj.position.x;
      if (mirror) {
        obj.scale.x = -obj.scale.x;
      }
      break;
    case "Y":
      obj.position.y = -obj.position.y;
      if (mirror) {
        obj.scale.y = -obj.scale.y;
      }
      break;
    case "Z":
      obj.position.z = -obj.position.z;
      if (mirror) {
        obj.scale.z = -obj.scale.z;
      }
      break;
    default:
      console.log("Invalid axis");
      break;
  }
}

function changePivot(obj, group, offset, axis) {
  switch (axis) {
    case "X":
      obj.position.x -= offset;
      group.position.x += offset;
      break;
    case "Y":
      y = offset;
      obj.position.y -= offset;
      group.position.y += offset;
      break;
    case "Z":
      z = offset;
      obj.position.z -= offset;
      group.position.z += offset;
      break;
    default:
      console.log("Invalid axis");
      break;
  }
}

function createRobot() {
  "use strict";

  robot = createTorso();
  robot.position.set(robotPosition.X, robotPosition.Y, robotPosition.Z);

  scene.add(robot);
}

function createTorso() {
  "use strict";

  const group = new THREE.Group();

  const head = createHead();
  const arms = createArms();
  const back = createBack();
  const abdomen = createAbdomen();
  const torso = createObject3D(torsoValues);

  group.add(head);
  group.add(arms);
  group.add(back);
  group.add(abdomen);
  group.add(torso);

  setPosition(group, torsoValues);

  return group;
}

function createHead() {
  "use strict";

  head = new THREE.Group();

  const eye = createObject3D(eyesValues);
  setPosition(eye, eyesValues);

  const eye2 = eye.clone(true);
  mirrorObject(eye2, "X", true);

  const horn = createObject3D(hornsValues);
  setPosition(horn, hornsValues);

  const horn2 = horn.clone(true);
  mirrorObject(horn2, "X", true);

  const headCube = createObject3D(headValues);
  setPosition(headCube, headValues);

  head.add(eye);
  head.add(eye2);
  head.add(horn);
  head.add(horn2);
  head.add(headCube);

  changePivot(headCube, head, headValues.height, "Y");

  return head;
}

function createArms() {
  "use strict";

  const group = new THREE.Group();

  leftArm = createArm();
  // recursive cloning and mirroring
  rightArm = leftArm.clone(true);
  mirrorObject(rightArm, "X", true);

  group.add(leftArm);
  group.add(rightArm);

  return group;
}

function createArm() {
  "use strict";

  const group = new THREE.Group();

  const arm = createObject3D(armValues);

  const tube = createTube();

  const forearm = createObject3D(forearmValues);
  setPosition(forearm, forearmValues);

  group.add(arm);
  group.add(forearm);
  group.add(tube);
  setPosition(group, armValues);

  return group;
}

function createTube() {
  "use strict";

  const group = new THREE.Group();

  const tube = createObject3D(tubeValues);
  setPosition(tube, tubeValues);

  group.add(tube);

  return group;
}

function createBack() {
  "use strict";

  const back = createObject3D(backValues);
  setPosition(back, backValues);

  return back;
}

function createAbdomen() {
  "use strict";

  const group = new THREE.Group();

  const abdomen = createObject3D(abdomenValues);

  const waist = createWaist(waistValues);

  group.add(abdomen);
  group.add(waist);

  setPosition(group, abdomenValues);

  return group;
}

function createWaist() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createWaistWheels();
  setPosition(wheel, waistWheelsValues);

  const wheel2 = wheel.clone(true);
  mirrorObject(wheel2, "X", true);

  const waist = createObject3D(waistValues);

  const thights = createThights();

  group.add(wheel);
  group.add(wheel2);
  group.add(waist);
  group.add(thights);

  setPosition(group, waistValues);

  return group;
}

function createWaistWheels() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createObject3D(legWheelsValues);
  setPosition(wheel, legWheelsValues);

  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;

  group.add(wheel);

  return group;
}

function createThights() {
  "use strict";

  thights = new THREE.Group();

  const group = new THREE.Group();

  const leftThight = createThight();
  setPosition(leftThight, thightValues);

  // recursive cloning and mirroring
  const rightThight = leftThight.clone(true);
  mirrorObject(rightThight, "X", true);

  const footCube = createFoot();

  foot = new THREE.Group();
  setPosition(foot, footValues);
  foot.add(footCube);

  changePivot(footCube, foot, -UNIT / 2, "Z");

  group.add(leftThight);
  group.add(rightThight);
  group.add(foot);

  thights.add(group);

  changePivot(group, thights, -UNIT / 2, "Y");

  return thights;
}

function createThight() {
  "use strict";

  const group = new THREE.Group();

  const thight = createObject3D(thightValues);

  const leg = createLeg();

  group.add(thight);
  group.add(leg);

  return group;
}

function createLeg() {
  "use strict";

  const group = new THREE.Group();

  const wheels = createRobotWheels();

  const leg = createObject3D(legValues);

  group.add(wheels);
  group.add(leg);
  setPosition(group, legValues);

  return group;
}

function createRobotWheels() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createObject3D(legWheelsValues);
  setPosition(wheel, legWheelsValues);

  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;

  const wheel2 = wheel.clone(true);
  mirrorObject(wheel2, "Y");

  group.add(wheel);
  group.add(wheel2);

  return group;
}

function createFoot() {
  "use strict";

  const foot = createObject3D(footValues);

  return foot;
}

function createTrailer() {
  "use strict";

  trailer = createTrailerBox();
  trailer.position.set(trailerPosition.X, trailerPosition.Y, trailerPosition.Z);

  scene.add(trailer);
}

function createTrailerBox() {
  "use strict";

  const group = new THREE.Group();

  const deposit = createTrailerDeposit();
  const pin = createTrailerPin();
  const trailerBox = createObject3D(trailerBoxValues);
  setPosition(group, trailerBoxValues);

  group.add(deposit);
  group.add(pin);
  group.add(trailerBox);

  return group;
}

function createTrailerDeposit() {
  "use strict";

  const group = new THREE.Group();

  const wheels = createTrailerWheels();

  const deposit = createObject3D(trailerDepositValues);

  group.add(wheels);
  group.add(deposit);

  setPosition(group, trailerDepositValues);
  return group;
}

function createTrailerWheels() {
  "use strict";

  const group = new THREE.Group();

  const wheels = new THREE.Group();

  const wheel = createTrailerWheel();
  wheels.add(wheel);

  const wheel1 = wheel.clone(true);
  mirrorObject(wheel1, "X");
  wheels.add(wheel1);

  const wheel2 = wheel.clone(true);
  mirrorObject(wheel2, "Z");
  wheels.add(wheel2);

  const wheel3 = wheel.clone(true);
  mirrorObject(wheel3, "X");
  mirrorObject(wheel3, "Z");
  wheels.add(wheel3);

  group.add(wheels);

  return group;
}

function createTrailerWheel() {
  "use strict";

  const wheel = createObject3D(trailerWheelsValues);

  setPosition(wheel, trailerWheelsValues);

  wheel.rotateZ(Math.PI / 2);

  return wheel;
}

function createTrailerPin() {
  "use strict";

  const trailerPin = createObject3D(trailerPinValues);
  setPosition(trailerPin, trailerPinValues);

  return trailerPin;
}
//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions() {
  "use strict";

  const minA = points.truckMin;
  const maxA = points.truckMax;
  const minB = points.trailerMin;
  const maxB = points.trailerMax;

  return (
    maxA.x >= minB.x &&
    minA.x <= maxB.x &&
    maxA.y >= minB.y &&
    minA.y <= maxB.y &&
    maxA.z >= minB.z &&
    minA.z <= maxB.z
  );
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions() {
  "use strict";

  trailer.position.set(
    robot.position.x,
    trailer.position.y,
    robot.position.z - torsoValues.depth * 4.5
  );

  transformation = false;
}

////////////
/* UPDATE */
////////////
function update() {
  "use strict";

  // ANIMATE PARA AQUI

  if (checkCollisions() && !transformation) {
    transformation = true;
    console.log("COLLISION");
    handleCollisions();
  }
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

  intializeAnimations();

  transformation = false;

  initalizePoints();

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
}

function initalizePoints() {
  points.trailerMin.x = trailerPosition.X - trailerBoxValues.width / 2;
  points.trailerMin.y = trailerPosition.Y - trailerBoxValues.height;
  points.trailerMin.z = trailerPosition.Z - trailerBoxValues.depth / 2;

  debugPositions(points.trailerMin);

  points.trailerMax.x = trailerPosition.X + trailerBoxValues.width / 2;
  points.trailerMax.y = trailerPosition.Y + trailerBoxValues.height / 2;
  points.trailerMax.z = trailerPosition.Z + trailerBoxValues.depth / 2;

  debugPositions(points.trailerMax);

  points.truckMin.x = robotPosition.X - torsoValues.width / 2;
  points.truckMin.y = robotPosition.Y - torsoValues.height * 1.8;
  points.truckMin.z = robotPosition.Z - torsoValues.depth * 3.5;

  debugPositions(points.truckMin);

  points.truckMax.x = robotPosition.X + torsoValues.width / 2;
  points.truckMax.y = robotPosition.Y + torsoValues.height / 2;
  points.truckMax.z = robotPosition.Z + torsoValues.depth / 2;

  debugPositions(points.truckMax);
}

function debugPositions(point) {
  const obj = createObject3D(debugPoint);
  obj.position.set(point.x, point.y, point.z);

  debugPoints.push(obj);

  scene.add(obj);
}

function intializeAnimations() {
  "use strict";

  head.userData.value = 0;
  leftArm.userData.value = 0;
  rightArm.userData.value = 0;
  thights.userData.value = 0;
  foot.userData.value = 0;
  trailer.userData.value = 0;

  resetSteps();
}

function resetSteps() {
  "use strict";

  head.userData.step = 0;
  leftArm.userData.step = 0;
  rightArm.userData.step = 0;
  thights.userData.step = 0;
  foot.userData.step = 0;
  trailer.userData.xStep = 0;
  trailer.userData.zStep = 0;
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function rotateObject(object, transformationValues, axis) {
  if (
    transformationValues.min <= object.userData.value &&
    object.userData.value <= transformationValues.max
  ) {
    const auxValue = object.userData.value + object.userData.step;

    if (
      parseFloat(transformationValues.min) <= parseFloat(auxValue) &&
      parseFloat(auxValue) <= parseFloat(transformationValues.max)
    ) {
      object.userData.value += object.userData.step;
      switch (axis) {
        case "x":
          object.rotation.x += object.userData.step;
          break;
        case "y":
          object.rotation.y += object.userData.step;
          break;
        case "z":
          object.rotation.z += object.userData.step;
      }
    }
  }
}

function translateObject(object, transformationValues, axis) {
  if (
    transformationValues.min <= object.userData.value &&
    object.userData.value <= transformationValues.max
  ) {
    const auxValue = object.userData.value + object.userData.step;

    if (
      parseFloat(transformationValues.min) <= parseFloat(auxValue) &&
      parseFloat(auxValue) <= parseFloat(transformationValues.max)
    ) {
      object.userData.value += object.userData.step;
      switch (axis) {
        case "x":
          object.position.x += object.userData.step;
          break;
        case "y":
          object.position.y += object.userData.step;
          break;
        case "z":
          object.position.z += object.userData.step;
      }
    }
  }
}

function translateTrailer() {
  trailer.userData.step = trailer.userData.xStep;
  translateObject(trailer, trailerTranslation, "x");
  points.trailerMin.x += trailer.userData.xStep;
  points.trailerMax.x += trailer.userData.xStep;

  debugPoints[0].position.set(
    points.trailerMin.x,
    points.trailerMin.y,
    points.trailerMin.z
  );

  debugPoints[1].position.set(
    points.trailerMax.x,
    points.trailerMax.y,
    points.trailerMax.z
  );

  trailer.userData.step = trailer.userData.zStep;
  translateObject(trailer, trailerTranslation, "z");
  points.trailerMin.z += trailer.userData.zStep;
  points.trailerMax.z += trailer.userData.zStep;

  debugPoints[0].position.set(
    points.trailerMin.x,
    points.trailerMin.y,
    points.trailerMin.z
  );

  debugPoints[1].position.set(
    points.trailerMax.x,
    points.trailerMax.y,
    points.trailerMax.z
  );
}

function animate() {
  "use strict";
  update();

  translateTrailer();

  translateObject(leftArm, leftArmTranslation, "x");

  translateObject(rightArm, rightArmTranslation, "x");

  rotateObject(head, headRotation, "x");

  rotateObject(thights, thightsRotation, "x");

  rotateObject(foot, footRotation, "x");

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

  if (transformation) {
    resetSteps();
    return;
  }
  switch (e.keyCode) {
    case 37: //left
      trailer.userData.zStep = trailerTranslation.stepZ;
      break;
    case 38: //up
      trailer.userData.xStep = -trailerTranslation.stepX;
      break;
    case 39: //right
      trailer.userData.zStep = -trailerTranslation.stepZ;
      break;
    case 40: //down
      trailer.userData.xStep = trailerTranslation.stepX;
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
      leftArm.userData.step = -leftArmTranslation.step;
      rightArm.userData.step = -rightArmTranslation.step;
      break;

    case 69: //e
      leftArm.userData.step = leftArmTranslation.step;
      rightArm.userData.step = rightArmTranslation.step;
      break;

    case 70: //f
      head.userData.step = headRotation.step;
      break;

    case 82: //r
      head.userData.step = -headRotation.step;
      break;

    case 87: // w
      thights.userData.step = thightsRotation.step;
      break;

    case 83: // s
      thights.userData.step = -thightsRotation.step;
      break;

    case 65: //a
      foot.userData.step = -footRotation.step;
      break;

    case 81: //q
      foot.userData.step = footRotation.step;
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
    case 39: //right
      trailer.userData.zStep = 0;
      break;
    case 38: //up
    case 40: //down
      trailer.userData.xStep = 0;
      break;

    case 68: //d
    case 69: //e
      leftArm.userData.step = 0;
      rightArm.userData.step = 0;
      break;

    case 70: //f
    case 82: //r
      head.userData.step = 0;
      break;

    case 87: // w
    case 83: // s
      thights.userData.step = 0;
      break;

    case 65: //a
    case 81: //q
      foot.userData.step = 0;
      break;
  }
}
