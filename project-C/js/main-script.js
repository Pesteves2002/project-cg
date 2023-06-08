//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let mainCamera, scene, secondaryScene, renderer, controls, delta;

let ovni;

let ovniLigths = [];

let globalLight;

let ovniMovement = false;
let currentMaterial = MATERIALS.STANDART;

let newMaterialType = null;

let changeGlobalLight = false;

let changeOvniLightOff = false;
let changeOvniLightOn = false;

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

  if (ovniMovement) {
    if (ovni.userData.xStep == 0 && ovni.userData.zStep == 0) {
      ovniMovement = false;
      return;
    }
    translateOvni();
  }

  if (newMaterialType != null && newMaterialType != currentMaterial) {
    VALUES.forEach((value) => {
      changeMaterial(value.mesh, newMaterialType);
    });
    if (newMaterialType != MATERIALS.BASIC)
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
    currentMaterial = newMaterialType;
  }

  if (changeGlobalLight) {
    toggleGlobalIllunimation();
    changeGlobalLight = false;
  }

  if (changeOvniLightOff) {
    turnOffOvniLights();
    changeOvniLightOff = false;
  }

  if (changeOvniLightOn) {
    turnOnOvniLights();
    changeOvniLightOn = false;
  }

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
  renderer.render(scene, mainCamera);
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
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
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
      ovniMovement = true;
      break;

    case 38: //up
      ovni.userData.xStep = -OVNITRANSLATIONVALUES.stepX;
      ovniMovement = true;
      break;

    case 39: //right
      ovni.userData.zStep = -OVNITRANSLATIONVALUES.stepZ;
      ovniMovement = true;
      break;

    case 40: //down
      ovni.userData.xStep = OVNITRANSLATIONVALUES.stepX;
      ovniMovement = true;
      break;

    case 81: //q
      newMaterialType = MATERIALS.LAMBERT;
      break;

    case 87: // w
      newMaterialType = MATERIALS.PHONG;
      break;

    case 69: //e
      newMaterialType = MATERIALS.TOON;
      break;

    case 82: //r
      newMaterialType = MATERIALS.BASIC;
      break;

    case 80: // p
      changeOvniLightOn = true;
      break;

    case 83: // s
      changeOvniLightOff = true;
      break;

    case 68: // d
      changeGlobalLight = true;
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
