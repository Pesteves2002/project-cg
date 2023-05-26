function createTrailer() {
  "use strict";

  trailer = createTrailerBox();
  trailer.position.set(trailerPosition.X, trailerPosition.Y, trailerPosition.Z);

  scene.add(trailer);
}

function createTrailerBox() {
  "use strict";

  const group = new THREE.Group();

  const deposit = createTrailerDeposit();
  const pin = createTrailerPin();
  const trailerBox = createObject3D(trailerBoxValues);

  group.add(deposit);
  group.add(pin);
  group.add(trailerBox);

  setPosition(group, trailerBoxValues);

  return group;
}

function createTrailerDeposit() {
  "use strict";

  const group = new THREE.Group();

  const wheels = createTrailerWheels();

  const deposit = createObject3D(trailerDepositValues);

  group.add(wheels);
  group.add(deposit);

  setPosition(group, trailerDepositValues);

  return group;
}

function createTrailerWheels() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createTrailerWheel();

  const wheel1 = mirrorObject(wheel, AXIS.X);

  const wheel2 = mirrorObject(wheel, AXIS.Z);

  let wheel3 = mirrorObject(wheel, AXIS.X);
  wheel3 = mirrorObject(wheel3, AXIS.Z);

  group.add(wheel);
  group.add(wheel1);
  group.add(wheel2);
  group.add(wheel3);

  return group;
}

function createTrailerWheel() {
  "use strict";

  const wheel = createObject3D(trailerWheelsValues);

  wheel.rotateZ(Math.PI / 2);

  setPosition(wheel, trailerWheelsValues);

  return wheel;
}

function createTrailerPin() {
  "use strict";

  const trailerPin = createObject3D(trailerPinValues);
  setPosition(trailerPin, trailerPinValues);

  return trailerPin;
}
