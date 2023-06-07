//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let mainCamera, scene, secondaryScene, renderer, controls, delta;

let ovni;

let ovniLigths = [];

let currentCamera;

let globalLight;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
  "use strict";

  scene = new THREE.Scene();
  secondaryScene = new THREE.Scene();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameras() {
  "use strict";

  mainCamera = createPrespectiveCamera(CAMERAVALUES.main);

  controls = new THREE.OrbitControls(mainCamera, renderer.domElement);
  controls.update();
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

function createAmbientLight() {
  "use strict";

  const light = new THREE.AmbientLight(
    LIGHTVALUES.ambient,
    LIGHTVALUES.ambientIntensity
  );
  scene.add(light);
}

function turnOffOvniLights() {
  "use strict";

  ovniLigths.forEach((light) => {
    light.intensity = 0;
  });
}

function turnOnOvniLights() {
  "use strict";

  ovniLigths.forEach((light) => {
    light.intensity = 1;
  });
}

function craeteGlobalIllunimation() {
  "use strict";

  globalLight = new THREE.DirectionalLight(
    LIGHTVALUES.global,
    LIGHTVALUES.globalIntensity
  );
  globalLight.target = ovni;

  scene.add(globalLight);
}

function toggleGlobalIllunimation() {
  "use strict";

  globalLight.intensity =
    globalLight.intensity == 0 ? LIGHTVALUES.globalIntensity : 0;
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createMoon() {
  "use strict";

  const moon = new createObject3D(MOONVALUES);
  setPosition(moon, MOONVALUES);

  MOONVALUES.material.emissive = MOONVALUES.emissive;

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
  renderer.setRenderTarget(skyTexture);
  renderer.render(secondaryScene, skyCamera);

  renderer.setRenderTarget(grassTexture);
  renderer.render(secondaryScene, grassCamera);

  renderer.setRenderTarget(null);
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

  currentCamera = mainCamera;

  createAmbientLight();

  createOvni();

  createTree();

  createPolyHouse();

  createMoon();

  createGrass();

  createPlane();

  craeteGlobalIllunimation();

  createSky();

  createSkyBox();

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

  renderer.setAnimationLoop(animate);
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
      createFlowers();
      break;

    case 50: // 2
      createStars();
      break;

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

    case 81: //q
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.LAMBERT);
      });
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
      break;

    case 87: // w
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.PHONG);
      });
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
      break;

    case 69: //e
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.TOON);
      });
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
      break;

    case 82: //r
      VALUES.forEach((value) => {
        changeMaterial(value.mesh, MATERIALS.BASIC);
      });
      break;

    case 80: // p
      turnOnOvniLights();
      break;

    case 83: // s
      turnOffOvniLights();
      break;

    case 68: // d
      toggleGlobalIllunimation();
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
