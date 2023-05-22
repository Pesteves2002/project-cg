const UNIT = 20;

const points = {
  truckMin: {
    x: 0,
    y: 0,
    z: 0,
  },
  truckMax: {
    x: 0,
    y: 0,
    z: 0,
  },

  trailerMin: {
    x: 0,
    y: 0,
    z: 0,
  },

  trailerMax: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const Primitives = {
  CUBE: "cube",
  CYLINDER: "cylinder",
};

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

const cameraValues = [
  [0, 1000, 0],
  [0, 0, 1000],
  [1000, 0, 0],
  [2000, 1000, 3000],
  [1000, 1000, 1000],
];

const trailerPosition = {
  X: 100,
  Y: -UNIT * 2,
  Z: 100,
};

const robotPosition = {
  X: 127,
  Y: 0,
  Z: 200,
};

const headRotation = {
  step: Math.PI / 100,
  min: -Math.PI - Math.PI / 100,
  max: Math.PI / 100,
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

const thightsRotation = {
  step: Math.PI / 100,
  min: -Math.PI / 100,
  max: Math.PI / 2 + Math.PI / 100,
};

const footRotation = {
  step: Math.PI / 100,
  min: -Math.PI / 100,
  max: Math.PI / 2 + Math.PI / 100,
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
    map: loader.load("imgs/tire.jpg"),
    wireframe: true,
  }),

  trailer_blue: new THREE.MeshBasicMaterial({
    color: 0x0047ab,
    wireframe: true,
  }),

  trailer_silver: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    wireframe: true,
  }),

  robot_red: new THREE.MeshBasicMaterial({
    color: 0xd92121,
    wireframe: true,
  }),

  robot_blue: new THREE.MeshBasicMaterial({
    color: 0x0047ab,
    wireframe: true,
  }),

  robot_silver: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    wireframe: true,
  }),

  debug: new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  }),
};

const headValues = {
  width: 2 * UNIT,
  depth: 2 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: 3 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.robot_blue,
};

const eyesValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 0.5 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 1.5 * UNIT,
  relativeZ: 1 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.robot_silver,
};

const hornsValues = {
  radiusBottom: 0.25 * UNIT,
  radiusTop: 0.25 * UNIT,
  height: 4 * UNIT,
  relativeX: 0.5 * UNIT,
  relativeY: 4 * UNIT,
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
  width: 6 * UNIT,
  depth: 2 * UNIT,
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
  relativeX: 2 * UNIT,
  relativeY: -2.75 * UNIT,
  relativeZ: 0 * UNIT,
  type: Primitives.CYLINDER,
  material: materialValues.tires,
};

const thightValues = {
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
  width: 2 * UNIT,
  depth: 1 * UNIT,
  height: 2 * UNIT,
  relativeX: 0 * UNIT,
  relativeY: -4 * UNIT,
  relativeZ: 10 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.trailer,
};

const debugPoint = {
  width: 1 * UNIT,
  depth: 1 * UNIT,
  height: 1 * UNIT,
  type: Primitives.CUBE,
  material: materialValues.debug,
};
