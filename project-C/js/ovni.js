function createOvni() {
  "use strict";

  ovni = createOvniBody();
  ovni.position.copy(OVNIVALUES.pos);

  scene.add(ovni);
}

function createOvniBody() {
  "use strict";

  const group = new THREE.Group();

  const body = createObject3D(OVNIVALUES);
  const cockpit = createCockpit();
  const base = createBase();
  const lights = createLights();

  group.add(body);
  group.add(cockpit);
  group.add(base);
  group.add(lights);

  return group;
}

function createCockpit() {
  const cockpit = createObject3D(COCKPITVALUES);
  setPosition(cockpit, COCKPITVALUES);
  return cockpit;
}

function createBase() {
  const base = createObject3D(BASEVALUES);
  const spotLight = new THREE.SpotLight(0x00ff00);
  base.add(spotLight);

  ovniLigths.push(spotLight);

  setPosition(base, BASEVALUES);

  const helper = new THREE.SpotLightHelper(spotLight);
  scene.add(helper);

  return base;
}

function createLights() {
  "use static";

  const group = new THREE.Group();

  for (let i = 0; i < 8; i++) {
    group.add(createLight(i));
  }

  return group;
}

function createLight(rotationStep) {
  "use static";

  const pivot = new THREE.Group();

  const light = createObject3D(OVNILIGHTS);
  const lightSource = new THREE.PointLight(0xffff00, 1 * UNIT, 100 * UNIT);

  ovniLigths.push(lightSource);

  light.add(lightSource);
  setPosition(light, OVNILIGHTS);

  const helper = new THREE.PointLightHelper(lightSource, 5 * UNIT);
  scene.add(helper);

  pivot.add(light);
  pivot.rotation.y = rotationStep * OVNILIGHTS.step;

  return pivot;
}
