//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, thights, foot;

let cameras = [];

let currentCamera;

let UNIT = 20;

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
  X: 0.3 * UNIT,
  Z: 0.3 * UNIT,
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

function mirrorObject(obj, objectValues, axis) {
  let x = objectValues.relativeX;
  let y = objectValues.relativeY;
  let z = objectValues.relativeZ;
  switch (axis) {
    case "X":
      x = -x;
      break;
    case "Y":
      y = -y;
      break;
    case "Z":
      z = -z;
      break;
    default:
      console.log("Invalid axis");
      break;
  }
  obj.position.set(x, y, z);
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
  const headCube = createObject3D(headValues);
  setPosition(headCube, headValues);
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
  mirrorObject(rightArm, armValues, "X");

  group.add(leftArm);
  group.add(rightArm);

  return group;
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

  const waist = createObject3D(waistValues);

  const thights = createThights();

  group.add(waist);
  group.add(thights);

  setPosition(group, waistValues);

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
  mirrorObject(rightThight, thightValues, "X");

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

  const leg = createObject3D(legValues);

  group.add(leg);
  setPosition(group, legValues);

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

  currentCamera = cameras[2];

  createRobot();
  createTrailer();

  intializeAnimations();

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
}

function intializeAnimations() {
  head.userData.step = 0;
  head.userData.value = 0;
  leftArm.userData.step = 0;
  leftArm.userData.value = 0;
  rightArm.userData.step = 0;
  rightArm.userData.value = 0;
  thights.userData.step = 0;
  thights.userData.value = 0;
  foot.userData.step = 0;
  foot.userData.value = 0;
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
function animate() {
  "use strict";

  let auxValue;

  if (trailer.userData.x) {
    trailer.position.x += trailer.userData.xStep;
  }
  if (trailer.userData.z) {
    trailer.position.z += trailer.userData.zStep;
  }

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
