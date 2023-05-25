//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer, controls;

let geometry, material, mesh;

let trailer, robot, head, leftArm, rightArm, thighs, foot;

let isInAnimation, isDocked;

const cameras = [];

let currentCamera;

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

  render();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////

function translateTrailer() {
  trailer.userData.step = trailer.userData.xStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.X);
  points.trailerMin.x += trailer.userData.xStep;
  points.trailerMax.x += trailer.userData.xStep;

  trailer.userData.step = trailer.userData.zStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.Z);
  points.trailerMin.z += trailer.userData.zStep;
  points.trailerMax.z += trailer.userData.zStep;
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
