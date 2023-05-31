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

  group.add(body);
  group.add(cockpit);

  return group;
}

function createCockpit() {
  const cockpit = createObject3D(COCKPITVALUES);
  setPosition(cockpit, COCKPITVALUES);
  return cockpit;
}
