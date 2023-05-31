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
  setPosition(light, OVNILIGHTS);

  pivot.add(light);
  pivot.rotation.y = rotationStep * OVNILIGHTS.step;

  return pivot;
}
