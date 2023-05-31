//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let camera, scene, renderer, controls, delta;

let ovni;

const cameras = [];

let currentCamera;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
  "use strict";

  scene = new THREE.Scene();

  scene.add(new THREE.AxesHelper(1000));

  scene.background = new THREE.Color(0xa2bce0);
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

  const light = new THREE.AmbientLight(0xff0000, 0.2);
  scene.add(light);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createMoon() {
  "use strict";

  const moon = new createObject3D(MOONVALUES);
  setPosition(moon, MOONVALUES);

  scene.add(moon);
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

  createTree();

  createHouse();

  createMoon();

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
      Object.keys(MATERIALVALUES).forEach((key) => {
        MATERIALVALUES[key] = new THREE.MeshLambertMaterial({
          color: MATERIALVALUES[key].color,
        });
      });
      break;

    case 87: // w
      Object.keys(MATERIALVALUES).forEach((key) => {
        MATERIALVALUES[key] = new THREE.MeshPhongMaterial({
          color: MATERIALVALUES[key].color,
        });
      });
      break;

    case 69: //e
      Object.keys(MATERIALVALUES).forEach((key) => {
        MATERIALVALUES[key] = new THREE.MeshBasicMaterial({
          color: MATERIALVALUES[key].color,
        });
      });
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
