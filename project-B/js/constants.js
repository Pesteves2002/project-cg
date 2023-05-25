const UNIT = 20;

const backgroundColor = 0xa2bce0;

const fov = 70;

const minViewDistance = 1;

const maxViewDistance = 10000;

const AXIS = {
  X: "x",
  Y: "y",
  Z: "z",
};

const Primitives = {
  CUBE: "cube",
  CYLINDER: "cylinder",
};

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

const cameraValues = [
  [0, 0, 1000],
  [1000, 0, 0],
  [0, 1000, 0],
  [2000, 1000, 3000],
  [1000, 1000, 1000],
  [500, 2000, 2000],
];

const trailerPosition = {
  X: 50,
  Y: -UNIT * 2,
  Z: -300,
};

const robotPosition = {
  X: 300,
  Y: 0,
  Z: 100,
};

const rotationUnit = Math.PI / 50;

const headRotation = {
  step: rotationUnit,
  min: -Math.PI,
  max: 0,
};

const leftArmTranslation = {
  step: -0.1 * UNIT,
  min: -2 * UNIT,
  max: 0 * UNIT,
};

const rightArmTranslation = {
  step: 0.1 * UNIT,
  min: 0 * UNIT,
  max: 2 * UNIT,
};

const thighsRotation = {
  step: rotationUnit,
  min: 0,
  max: Math.PI / 2,
};

const footRotation = {
  step: rotationUnit,
  min: 0,
  max: Math.PI / 2,
};

const trailerTranslation = {
  stepX: 0.3 * UNIT,
  stepZ: 0.3 * UNIT,
  min: -1000 * UNIT,
  max: 1000 * UNIT,
};

const loader = new THREE.TextureLoader();

const materialValues = {
  tires: new THREE.MeshBasicMaterial({
    color: 0x00000,
  }),

  trailer_blue: new THREE.MeshBasicMaterial({
    color: 0x0047ab,
  }),

  trailer_silver: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
  }),

  robot_red: new THREE.MeshBasicMaterial({
    color: 0xd92121,
  }),

  robot_blue: new THREE.MeshBasicMaterial({
    color: 0x0047ab,
  }),

  robot_silver: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
  }),

  debug: new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  }),
};

const headValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 1 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_blue,
};

const eyesValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 0.5 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 0.5 * UNIT,
  relativeZ: 1 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot_silver,
};

const hornsValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 1 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 1.5 * UNIT,
  relativeZ: -0.75 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot_blue,
};

const torsoValues = {
  width: 8 * UNIT,
  depth: 4 * UNIT,
  height: 4 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_red,
};

const armValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 6 * UNIT,
  relativeX: 5 * UNIT,
  relativeY: -1 * UNIT,
  relativeZ: -3 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_red,
};

const tubeValues = {
  radiusTop: 0.5 * UNIT,
  radiusBottom: 0.5 * UNIT,
  height: 6 * UNIT,
  relativeX: 1 * UNIT,
  relativeY: 3 * UNIT,
  relativeZ: -1.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot_silver,
};

const forearmValues = {
  width: 2 * UNIT,
  depth: 4 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -2 * UNIT,
  relativeZ: 3 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_red,
};

const backValues = {
  width: 4 * UNIT,
  depth: 2 * UNIT,
  height: 4 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: -3 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_red,
};

const abdomenValues = {
  width: 4 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_red,
};

const waistValues = {
  width: 6.5 * UNIT,
  depth: 3 * UNIT,
  height: 3 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -2.5 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_silver,
};

const waistWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 4 * UNIT,
  relativeY: -1 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

const thighValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 3 * UNIT,
  relativeX: 2 * UNIT,
  relativeY: -3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_silver,
};

const legValues = {
  width: 3 * UNIT,
  depth: 2 * UNIT,
  height: 7 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -5 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_blue,
};

const legWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 2 * UNIT,
  relativeY: 2 * UNIT,
  relativeZ: 0.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

const footValues = {
  width: 8 * UNIT,
  depth: 3 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -12.5 * UNIT,
  relativeZ: 0.5 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_blue,
};

const trailerBoxValues = {
  width: 9 * UNIT,
  depth: 24 * UNIT,
  height: 6 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 0 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer_silver,
};

const trailerDepositValues = {
  width: 6.75 * UNIT,
  depth: 15 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: -4.5 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer_blue,
};

const trailerWheelsValues = {
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 1 * UNIT,
  relativeX: 4 * UNIT,
  relativeY: -0.5 * UNIT,
  relativeZ: 3.5 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

const trailerPinValues = {
  width: 1 * UNIT,
  depth: 2 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 10 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer_silver,
};

const debugPoint = {
  width: 1 * UNIT,
  depth: 1 * UNIT,
  height: 1 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.debug,
};

const points = {
  trailerMin: {
    x: trailerPosition.X - trailerBoxValues.width / 2,
    y: trailerPosition.Y - trailerBoxValues.height,
    z: trailerPosition.Z - trailerBoxValues.depth / 2,
  },

  trailerMax: {
    x: trailerPosition.X + trailerBoxValues.width / 2,
    y: trailerPosition.Y + trailerBoxValues.height / 2,
    z: trailerPosition.Z + trailerBoxValues.depth / 2,
  },

  truckMin: {
    x: robotPosition.X - torsoValues.width / 2,
    y: robotPosition.Y - torsoValues.height * 1.8,
    z: robotPosition.Z - torsoValues.depth - legValues.width * 3.2,
  },

  truckMax: {
    x: robotPosition.X + torsoValues.width / 2,
    y: robotPosition.Y + torsoValues.height / 2,
    z: robotPosition.Z + torsoValues.depth / 2,
  },

  truck: {
    x: robotPosition.X,
    y: trailerPosition.Y,
    z:
      robotPosition.Z -
      torsoValues.width / 2 -
      legValues.width / 2 -
      legValues.width / 2,
  },
};

const trailerDockedValues = {
  x: trailerPosition.X,
  y: trailerPosition.Y,
  z: robotPosition.Z - torsoValues.width - backValues.width - legValues.height,
};
