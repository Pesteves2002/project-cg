//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer, controls;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, thighs, foot;

let isInAnimation, isDocked;

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

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions() {
  "use strict";

  const minA = points.truckMin;
  const maxA = points.truckMax;
  const minB = points.trailerMin;
  const maxB = points.trailerMax;

  const collision =
    maxA.x >= minB.x &&
    minA.x <= maxB.x &&
    maxA.y >= minB.y &&
    minA.y <= maxB.y &&
    maxA.z >= minB.z &&
    minA.z <= maxB.z;

  if (collision && isDocked) {
    return false;
  }

  if (!collision && isDocked) {
    isDocked = false;
    return false;
  }

  return collision;
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions() {
  "use strict";

  trailer.userData.xStep = (robot.position.x - trailer.position.x) / 100;
  trailer.userData.zStep = (trailerDockedValues.z - trailer.position.z) / 100;
}

////////////
/* UPDATE */
////////////
function update() {
  "use strict";

  // ANIMATE PARA AQUI

  if (isInAnimation) {
    performTransformation();
    return;
  }

  if (checkIfTruck() && checkCollisions()) {
    handleCollisions();
    isDocked = true;
    isInAnimation = true;
  }
}

function performTransformation() {
  "use strict";

  if (trailer.userData.xStep > 0) {
    if (lessOrEqualThan(robot.position.x, trailer.position.x)) {
      trailer.userData.xStep = 0;
    }
  } else {
    if (greaterOrEqualThan(robot.position.x, trailer.position.x)) {
      trailer.userData.xStep = 0;
    }
  }

  if (trailer.userData.zStep > 0) {
    if (lessOrEqualThan(trailerDockedValues.z, trailer.position.z)) {
      trailer.userData.zStep = 0;
    }
  } else {
    if (greaterOrEqualThan(trailerDockedValues.z, trailer.position.z)) {
      trailer.userData.zStep = 0;
    }
  }

  if (trailer.userData.xStep === 0 && trailer.userData.zStep === 0) {
    isInAnimation = false;
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

  resetSteps();

  isInAnimation = false;

  isDocked = false;

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
  });
}

function debugPositions(point) {
  const obj = createObject3D(debugPoint);
  obj.position.set(point.x, point.y, point.z);

  debugPoints.push(obj);

  scene.add(obj);
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
  "use strict";

  switch (axis) {
    case AXIS.X:
      object.rotation.x = THREE.Math.clamp(
        object.userData.step + object.rotation.x,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Y:
      object.rotation.y += THREE.Math.clamp(
        object.userData.step + object.rotation.y,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Z:
      object.rotation.z += THREE.Math.clamp(
        object.userData.step + object.rotation.z,
        rotationValues.min,
        rotationValues.max
      );
      break;

    default:
      console.log("Invalid axis");
  }
}

function translateObject(object, objectValues, offset, axis) {
  "use strict";

  switch (axis) {
    case AXIS.X:
      object.position.x = THREE.Math.clamp(
        object.userData.step + object.position.x,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;
    case AXIS.Y:
      object.position.y = THREE.Math.clamp(
        object.userData.step + object.position.y,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;
    case AXIS.Z:
      object.position.z = THREE.Math.clamp(
        object.userData.step + object.position.z,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;

    default:
      console.log("Invalid axis");
  }
}

function translateTrailer() {
  trailer.userData.step = trailer.userData.xStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.X);
  points.trailerMin.x += trailer.userData.xStep;
  points.trailerMax.x += trailer.userData.xStep;
  debugPoints[0].position.x += trailer.userData.xStep;
  debugPoints[1].position.x += trailer.userData.xStep;

  trailer.userData.step = trailer.userData.zStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.Z);
  points.trailerMin.z += trailer.userData.zStep;
  points.trailerMax.z += trailer.userData.zStep;
  debugPoints[0].position.z += trailer.userData.zStep;
  debugPoints[1].position.z += trailer.userData.zStep;
}

function animate() {
  "use strict";
  update();

  translateTrailer();

  translateObject(leftArm, leftArmTranslation, armValues.relativeX, AXIS.X);

  translateObject(rightArm, rightArmTranslation, -armValues.relativeX, AXIS.X);

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
    equal(head.rotation.x, headRotation.min) &&
    equal(leftArm.position.x, leftArmTranslation.min + armValues.relativeX) &&
    equal(thighs.rotation.x, thighsRotation.max) &&
    equal(foot.rotation.x, footRotation.max)
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

  if (isInAnimation) {
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

  if (isInAnimation) {
    return;
  }

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
