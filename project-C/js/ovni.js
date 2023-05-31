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

  group.add(body);

  return group;
}
