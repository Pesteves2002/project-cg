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
  const spotLight = new THREE.SpotLight(OVNIVALUES.color);

  const target = new THREE.Object3D();
  target.position.set(0, -500 * UNIT, 0);

  base.add(spotLight);
  base.add(target);

  spotLight.target = target;

  ovniLigths.push(spotLight);

  setPosition(base, BASEVALUES);

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
  const lightSource = new THREE.PointLight(OVNIVALUES.color, 1, 50 * UNIT);

  ovniLigths.push(lightSource);

  light.add(lightSource);
  setPosition(light, OVNILIGHTS);

  pivot.add(light);
  pivot.rotation.y = rotationStep * OVNILIGHTS.step;

  return pivot;
}
