function createHouse() {
  "use strict";

  const house = createMainHouse();
  setPosition(house, HOUSEVALUES);

  scene.add(house);
}

function createMainHouse() {
  "use strict";

  const group = new THREE.Group();

  const house = createObject3D(HOUSEVALUES);
  const roof = createRoof();

  group.add(house);
  group.add(roof);

  return group;
}

function createRoof() {
  "use strict";

  const group = new THREE.Group();

  const roof = createObject3D(ROOFVALUES);
  const chimney = createChimney();

  group.add(roof);
  group.add(chimney);

  roof.rotation.z = Math.PI / 2;
  roof.rotation.x = Math.PI / 4;

  setPosition(group, ROOFVALUES);
  return group;
}

function createChimney() {
  "use strict";

  const chimney = createObject3D(CHIMNEYVALUES);
  setPosition(chimney, CHIMNEYVALUES);

  chimney.rotation.y = Math.PI / 2;

  return chimney;
}
