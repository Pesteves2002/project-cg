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

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

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

  currentCamera = cameras[1];

  createOvni();

  createTree();

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
    case 49: //1
      currentCamera = cameras[0];
      break;
  }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
  "use strict";
}
