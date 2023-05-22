//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer, controls;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, thighs, foot;

let transformation;

const cameras = [];

let currentCamera;

const debugPoints = [];

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
  "use strict";

  scene = new THREE.Scene();

  // set the background color of the scene
  scene.background = new THREE.Color(backgroundColor);

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
  createPrespectiveCamera(cameraValues[5]);
  controls = new THREE.OrbitControls(cameras[5], renderer.domElement);

  controls.update();
}

function createPrespectiveCamera(cameraValue) {
  "use strict";
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    minViewDistance,
    maxViewDistance
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
    minViewDistance,
    maxViewDistance
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
  const newObj = obj.clone(true);
  switch (axis) {
    case AXIS.X:
      newObj.position.x = -obj.position.x;
      if (mirror) {
        newObj.scale.x = -obj.scale.x;
      }
      break;
    case AXIS.Y:
      newObj.position.y = -obj.position.y;
      if (mirror) {
        newObj.scale.y = -obj.scale.y;
      }
      break;
    case AXIS.Z:
      newObj.position.z = -obj.position.z;
      if (mirror) {
        newObj.scale.z = -obj.scale.z;
      }
      break;
    default:
      console.log("Invalid axis");
      break;
  }
  return newObj;
}

function changePivot(obj, group, offset, axis) {
  switch (axis) {
    case AXIS.X:
      obj.position.x -= offset;
      group.position.x += offset;
      break;
    case AXIS.Y:
      obj.position.y -= offset;
      group.position.y += offset;
      break;
    case AXIS.Z:
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

  const eye2 = mirrorObject(eye, AXIS.X, true);

  const horn = createObject3D(hornsValues);
  setPosition(horn, hornsValues);

  const horn2 = mirrorObject(horn, AXIS.X, true);

  const headCube = createObject3D(headValues);

  headCube.add(eye);
  headCube.add(eye2);
  headCube.add(horn);
  headCube.add(horn2);

  head.add(headCube);

  changePivot(headCube, head, headValues.height, AXIS.Y);

  setPosition(headCube, headValues);

  return head;
}

function createArms() {
  "use strict";

  const group = new THREE.Group();

  leftArm = createArm();
  // recursive cloning and mirroring
  rightArm = mirrorObject(leftArm, AXIS.X, true);

  group.add(leftArm);
  group.add(rightArm);

  return group;
}

function createArm() {
  "use strict";

  const group = new THREE.Group();

  const arm = createObject3D(armValues);

  const tube = createObject3D(tubeValues);
  setPosition(tube, tubeValues);

  const forearm = createObject3D(forearmValues);
  setPosition(forearm, forearmValues);

  group.add(arm);
  group.add(forearm);
  group.add(tube);

  setPosition(group, armValues);

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

  const waist = createWaist();

  group.add(abdomen);
  group.add(waist);

  setPosition(group, abdomenValues);

  return group;
}

function createWaist() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createWaistWheels();

  const wheel2 = mirrorObject(wheel, AXIS.X, true);

  const waist = createObject3D(waistValues);

  const thighs = createThighs();

  group.add(wheel);
  group.add(wheel2);
  group.add(waist);
  group.add(thighs);

  setPosition(group, waistValues);

  return group;
}

function createWaistWheels() {
  "use strict";

  const wheel = createObject3D(waistWheelsValues);
  setPosition(wheel, waistWheelsValues);

  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;

  return wheel;
}

function createThighs() {
  "use strict";

  thighs = new THREE.Group();

  const group = new THREE.Group();

  const leftThigh = createThigh();
  setPosition(leftThigh, thighValues);

  // recursive cloning and mirroring
  const rightThigh = mirrorObject(leftThigh, AXIS.X, true);

  const footCube = createFoot();

  foot = new THREE.Group();
  setPosition(foot, footValues);
  foot.add(footCube);

  changePivot(footCube, foot, -UNIT / 2, AXIS.Z);

  group.add(leftThigh);
  group.add(rightThigh);
  group.add(foot);

  thighs.add(group);

  changePivot(group, thighs, -UNIT / 2, AXIS.Y);

  return thighs;
}

function createThigh() {
  "use strict";

  const group = new THREE.Group();

  const thigh = createObject3D(thighValues);

  const leg = createLeg();

  group.add(thigh);
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

  const wheel2 = mirrorObject(wheel, AXIS.Y, true);

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

  group.add(deposit);
  group.add(pin);
  group.add(trailerBox);

  setPosition(group, trailerBoxValues);

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

  const wheel = createTrailerWheel();

  const wheel1 = mirrorObject(wheel, AXIS.X);

  const wheel2 = mirrorObject(wheel, AXIS.Z);

  let wheel3 = mirrorObject(wheel, AXIS.X);
  wheel3 = mirrorObject(wheel3, AXIS.Z);

  group.add(wheel);
  group.add(wheel1);
  group.add(wheel2);
  group.add(wheel3);

  return group;
}

function createTrailerWheel() {
  "use strict";

  const wheel = createObject3D(trailerWheelsValues);

  wheel.rotateZ(Math.PI / 2);

  setPosition(wheel, trailerWheelsValues);

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

  if (checkIfTruck() && checkCollisions() && !transformation) {
    transformation = true;
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
  "use strict";

  Object.values(points).forEach((point) => {
    debugPositions(point);
    console.log(point);
  });
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
  thighs.userData.value = 0;
  foot.userData.value = 0;
  trailer.userData.value = 0;

  resetSteps();
}

function resetSteps() {
  "use strict";

  head.userData.step = 0;
  leftArm.userData.step = 0;
  rightArm.userData.step = 0;
  thighs.userData.step = 0;
  foot.userData.step = 0;
  trailer.userData.xStep = 0;
  trailer.userData.zStep = 0;
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function rotateObject(object, rotationValues, axis) {
  const auxValue = object.userData.value + object.userData.step;

  if (!lessOrEqualThan(rotationValues.min, auxValue)) {
    rotateAxis(object, rotationValues.min - object.userData.value, axis);
    return;
  }

  if (!lessOrEqualThan(auxValue, rotationValues.max)) {
    rotateAxis(object, rotationValues.max - object.userData.value, axis);
    return;
  }

  rotateAxis(object, object.userData.step, axis);
}

function rotateAxis(object, step, axis) {
  switch (axis) {
    case AXIS.X:
      object.rotation.x += step;
      break;
    case AXIS.Y:
      object.rotation.y += step;
      break;
    case AXIS.Z:
      object.rotation.z += step;
      break;
    default:
      console.log("Invalid axis");
  }
  object.userData.value += step;
}

function translateAxis(object, step, axis) {
  switch (axis) {
    case AXIS.X:
      object.position.x += step;
      break;
    case AXIS.Y:
      object.position.y += step;
      break;
    case AXIS.Z:
      object.position.z += step;
      break;
    default:
      console.log("Invalid axis");
  }
  object.userData.value += step;
}

function translateObject(object, translationValues, axis) {
  const auxValue = object.userData.value + object.userData.step;

  if (!lessOrEqualThan(translationValues.min, auxValue)) {
    translateAxis(object, translationValues.min - object.userData.value, axis);
    return;
  }

  if (!lessOrEqualThan(auxValue, translationValues.max)) {
    translateAxis(object, translationValues.max - object.userData.value, axis);
    return;
  }

  translateAxis(object, object.userData.step, axis);
}

function translateTrailer() {
  trailer.userData.step = trailer.userData.xStep;
  translateObject(trailer, trailerTranslation, AXIS.X);
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
  translateObject(trailer, trailerTranslation, AXIS.Z);
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

  translateObject(leftArm, leftArmTranslation, AXIS.X);

  translateObject(rightArm, rightArmTranslation, AXIS.X);

  rotateObject(head, headRotation, AXIS.X);

  rotateObject(thighs, thighsRotation, AXIS.X);

  rotateObject(foot, footRotation, AXIS.X);

  render();

  requestAnimationFrame(animate);
}

function greaterOrEqualThan(a, b) {
  return parseFloat(a) >= parseFloat(b);
}

function lessOrEqualThan(a, b) {
  return parseFloat(a) <= parseFloat(b);
}

function equal(a, b) {
  return parseFloat(a) == parseFloat(b);
}

function checkIfTruck() {
  "use strict";

  return (
    equal(head.userData.value, headRotation.min) &&
    equal(leftArm.userData.value, leftArmTranslation.min) &&
    equal(thighs.userData.value, thighsRotation.max) &&
    equal(foot.userData.value, footRotation.max)
  );
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

    case 55: //7
      currentCamera = cameras[5];
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
      thighs.userData.step = thighsRotation.step;
      break;

    case 83: // s
      thighs.userData.step = -thighsRotation.step;
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
      thighs.userData.step = 0;
      break;

    case 65: //a
    case 81: //q
      foot.userData.step = 0;
      break;
  }
}
