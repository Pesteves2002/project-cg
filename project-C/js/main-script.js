//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

let mainCamera, scene, secondaryScene, renderer, controls, delta;

let ovni;

let ovniLigths = [];

let ovniSpotLight;

let globalLight;

let ovniMovement = false;
let currentMaterial = MATERIALS.BASIC;

let newMaterialType = null;

let changeGlobalLight = false;

let changeOvniLights = false;
let changeOvniSpotLight = false;

let changeMaterialSkyUpdate = false;
let changeMaterialGrassUpdate = false;
let changeMaterialSkyRender = true;
let changeMaterialGrassRender = true;

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

function toggleOvniLights() {
  "use strict";

  ovniLigths.forEach((light) => {
    light.intensity = light.intensity == 0 ? 1 : 0;
  });
}

function toggleOvniSpotLight() {
  "use strict";

  ovniSpotLight.intensity = ovniSpotLight.intensity == 0 ? 1 : 0;
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
      // Moon emissive
      VALUES[0].mesh[0].material.emissive = MOONVALUES.emissive;
    currentMaterial = newMaterialType;
  }

  if (changeGlobalLight) {
    toggleGlobalIllunimation();
    changeGlobalLight = false;
  }

  if (changeOvniLights) {
    toggleOvniLights();
    changeOvniLights = false;
  }

  if (changeOvniSpotLight) {
    toggleOvniSpotLight();
    changeOvniSpotLight = false;
  }

  if (changeMaterialSkyUpdate) {
    createStars();
    changeMaterialSkyUpdate = false;
    changeMaterialSkyRender = true;
  }

  if (changeMaterialGrassUpdate) {
    createFlowers();
    changeMaterialGrassUpdate = false;
    changeMaterialGrassRender = true;
  }

  ovni.rotation.y += (Math.PI / 180) * delta;
}

/////////////
/* DISPLAY */
/////////////
function render() {
  ("use strict");

  // only render the secondary scene when asked to
  if (changeMaterialSkyRender) {
    renderer.setRenderTarget(skyTexture);
    renderer.render(secondaryScene, skyCamera);
    changeMaterialSkyRender = false;
  }

  // only render the secondary scene when asked to
  if (changeMaterialGrassRender) {
    renderer.setRenderTarget(grassTexture);
    renderer.render(secondaryScene, grassCamera);
    changeMaterialGrassRender = false;
  }

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

  createTrees();

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
      changeMaterialGrassUpdate = true;
      break;

    case 50: // 2
      changeMaterialSkyUpdate = true;
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
      changeOvniLights = true;
      break;

    case 83: // s
      changeOvniSpotLight = true;
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
