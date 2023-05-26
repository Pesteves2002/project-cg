function createRobot() {
  "use strict";

  robot = createTorso();
  robot.position.set(robotPosition.X, robotPosition.Y, robotPosition.Z);

  scene.add(robot);
}

function createTorso() {
  "use strict";

  const group = new THREE.Group();

  const head = createHead();
  const arms = createArms();
  const back = createBack();
  const abdomen = createAbdomen();
  const torso = createObject3D(torsoValues);

  group.add(head);
  group.add(arms);
  group.add(back);
  group.add(abdomen);
  group.add(torso);

  setPosition(group, torsoValues);

  return group;
}

function createHead() {
  "use strict";

  head = new THREE.Group();

  const eye = createObject3D(eyesValues);
  setPosition(eye, eyesValues);

  const eye2 = mirrorObject(eye, AXIS.X, true);

  const horn = createObject3D(hornsValues);
  setPosition(horn, hornsValues);

  const horn2 = mirrorObject(horn, AXIS.X, true);

  const headCube = createObject3D(headValues);

  headCube.add(eye);
  headCube.add(eye2);
  headCube.add(horn);
  headCube.add(horn2);

  head.add(headCube);

  changePivot(headCube, head, headValues.height, AXIS.Y);

  setPosition(headCube, headValues);

  return head;
}

function createArms() {
  "use strict";

  const group = new THREE.Group();

  leftArm = createArm();
  // recursive cloning and mirroring
  rightArm = mirrorObject(leftArm, AXIS.X, true);

  group.add(leftArm);
  group.add(rightArm);

  return group;
}

function createArm() {
  "use strict";

  const group = new THREE.Group();

  const arm = createObject3D(armValues);

  const tube = createObject3D(tubeValues);
  setPosition(tube, tubeValues);

  const forearm = createObject3D(forearmValues);
  setPosition(forearm, forearmValues);

  group.add(arm);
  group.add(forearm);
  group.add(tube);

  setPosition(group, armValues);

  return group;
}

function createBack() {
  "use strict";

  const back = createObject3D(backValues);
  setPosition(back, backValues);

  return back;
}

function createAbdomen() {
  "use strict";

  const group = new THREE.Group();

  const abdomen = createObject3D(abdomenValues);

  const waist = createWaist();

  group.add(abdomen);
  group.add(waist);

  setPosition(group, abdomenValues);

  return group;
}

function createWaist() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createWaistWheels();

  const wheel2 = mirrorObject(wheel, AXIS.X, true);

  const waist = createObject3D(waistValues);

  const thighs = createThighs();

  group.add(wheel);
  group.add(wheel2);
  group.add(waist);
  group.add(thighs);

  setPosition(group, waistValues);

  return group;
}

function createWaistWheels() {
  "use strict";

  const wheel = createObject3D(waistWheelsValues);
  setPosition(wheel, waistWheelsValues);

  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;

  return wheel;
}

function createThighs() {
  "use strict";

  thighs = new THREE.Group();

  const group = new THREE.Group();

  const leftThigh = createThigh();
  setPosition(leftThigh, thighValues);

  // recursive cloning and mirroring
  const rightThigh = mirrorObject(leftThigh, AXIS.X, true);

  const footCube = createFoot();

  foot = new THREE.Group();
  setPosition(foot, footValues);
  foot.add(footCube);

  changePivot(footCube, foot, -UNIT / 2, AXIS.Z);

  group.add(leftThigh);
  group.add(rightThigh);
  group.add(foot);

  thighs.add(group);

  changePivot(group, thighs, -UNIT / 2, AXIS.Y);

  return thighs;
}

function createThigh() {
  "use strict";

  const group = new THREE.Group();

  const thigh = createObject3D(thighValues);

  const leg = createLeg();

  group.add(thigh);
  group.add(leg);

  return group;
}

function createLeg() {
  "use strict";

  const group = new THREE.Group();

  const wheels = createRobotWheels();

  const leg = createObject3D(legValues);

  group.add(wheels);
  group.add(leg);

  setPosition(group, legValues);

  return group;
}

function createRobotWheels() {
  "use strict";

  const group = new THREE.Group();

  const wheel = createObject3D(legWheelsValues);
  setPosition(wheel, legWheelsValues);

  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;

  const wheel2 = mirrorObject(wheel, AXIS.Y, true);

  group.add(wheel);
  group.add(wheel2);

  return group;
}

function createFoot() {
  "use strict";

  const foot = createObject3D(footValues);

  return foot;
}
