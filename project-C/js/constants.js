const UNIT = 20;

const CLOCK = new THREE.Clock();

const DELTA_MULT = 100;

const AXIS = {
  X: "x",
  Y: "y",
  Z: "z",
};

const PRIMITIVES = {
  CUBE: "cube",
  CYLINDER: "cylinder",
  SPHERE: "sphere",
};

// RED X WIDTH
// Green Y HEIGHT
// BLUE Z DEPTH

const MATERIALVALUES = {
  ovni: new THREE.MeshStandardMaterial({
    color: 0x120345,
  }),
  lightOvni: new THREE.MeshStandardMaterial({
    color: 0xffff00,
  }),
  trunk: new THREE.MeshStandardMaterial({
    color: 0x964b00,
  }),
  leaf: new THREE.MeshStandardMaterial({
    color: 0x234f1e,
  }),
  house: new THREE.MeshStandardMaterial({
    color: 0xffffff,
  }),
  roof: new THREE.MeshStandardMaterial({
    color: 0x964b00,
  }),
  chimney: new THREE.MeshStandardMaterial({
    color: 0xaa4a44,
  }),
  glass: new THREE.MeshStandardMaterial({
    color: 0xadd8e6,
  }),
  lightMoon: new THREE.MeshStandardMaterial({
    color: 0xffff00,
  }),
  grass: new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  }),
};

const MATERIALS = {
  BASIC: "Basic",
  LAMBERT: "Lambert",
  PHONG: "Phong",
  TOON: "Toon",
};

const OVNIVALUES = {
  pos: new THREE.Vector3(0 * UNIT, 40 * UNIT, 0 * UNIT),
  radius: 7 * UNIT,
  scale: new THREE.Vector3(2, 1, 2),
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.ovni,
  mesh: [],
};

const COCKPITVALUES = {
  pos: new THREE.Vector3(0, 6 * UNIT, 0),
  radius: 5 * UNIT,
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.glass,
  mesh: [],
};

const BASEVALUES = {
  pos: new THREE.Vector3(0, -7 * UNIT, 0),
  radiusTop: 5 * UNIT,
  radiusBottom: 5 * UNIT,
  height: 2 * UNIT,
  type: PRIMITIVES.CYLINDER,
  material: MATERIALVALUES.ovni,
  mesh: [],
  color: 0x234f1e,
};

const OVNILIGHTS = {
  pos: new THREE.Vector3(11 * UNIT, -4 * UNIT, 0),
  radius: 2 * UNIT,
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.lightOvni,
  step: Math.PI / 4,
  mesh: [],
  color: 0x234f1e,
};

const TREEPOSITIONS = [
  new THREE.Vector3(-50 * UNIT, 0 * UNIT, 40 * UNIT),
  new THREE.Vector3(-80 * UNIT, -3 * UNIT, 40 * UNIT),
  new THREE.Vector3(50 * UNIT, 5 * UNIT, -40 * UNIT),
  new THREE.Vector3(-50 * UNIT, 0 * UNIT, 0 * UNIT),
  new THREE.Vector3(-180 * UNIT, 0 * UNIT, 0 * UNIT),
  new THREE.Vector3(-100 * UNIT, 0 * UNIT, -60 * UNIT),
  new THREE.Vector3(-130 * UNIT, 0 * UNIT, -60 * UNIT),
  new THREE.Vector3(-145 * UNIT, 0 * UNIT, -80 * UNIT),
  new THREE.Vector3(-187 * UNIT, 0 * UNIT, -90 * UNIT),
  new THREE.Vector3(0 * UNIT, 0 * UNIT, -200 * UNIT),
  new THREE.Vector3(-60 * UNIT, 0 * UNIT, -150 * UNIT),
  new THREE.Vector3(-30 * UNIT, 0 * UNIT, -300 * UNIT),
  new THREE.Vector3(-45 * UNIT, 0 * UNIT, -60 * UNIT),
];

const TREESCALES = [
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(2, 2, 2),
  new THREE.Vector3(2, 2, 2),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(2, 2, 2),
  new THREE.Vector3(2, 2, 2),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(2, 2, 2),
];

const TREEROTATIONS = [
  (7 * Math.PI) / 2,
  (6 * Math.PI) / 4,
  (1 * Math.PI) / 5,
  (4 * Math.PI) / 2,
  (4 * Math.PI) / 4,
  (3 * Math.PI) / 4,
  Math.PI / 7,
  Math.PI / 2,
  Math.PI / 8,
  Math.PI / 2,
  Math.PI / 1,
  Math.PI / 2,
  Math.PI / 4,
];

const TRUNKVALUES = {
  pos: new THREE.Vector3(50 * UNIT, 0 * UNIT, 0 * UNIT),
  radiusTop: 1.5 * UNIT,
  radiusBottom: 1.5 * UNIT,
  height: 10 * UNIT,
  type: PRIMITIVES.CYLINDER,
  material: MATERIALVALUES.trunk,
  mesh: [],
};

const TRUNKVALUES2 = {
  pos: new THREE.Vector3(3 * UNIT, 0, 0),
  radiusTop: 1 * UNIT,
  radiusBottom: 1 * UNIT,
  height: 5 * UNIT,
  type: PRIMITIVES.CYLINDER,
  material: MATERIALVALUES.trunk,
  mesh: [],
};

const LEAFVALUES = {
  pos: new THREE.Vector3(0, 8 * UNIT, 0),
  radius: 5 * UNIT,
  scale: new THREE.Vector3(2, 1, 2),
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.leaf,
  mesh: [],
};

const LEAFVALUES2 = {
  pos: new THREE.Vector3(3 * UNIT, 3 * UNIT, 0),
  radius: 3 * UNIT,
  scale: new THREE.Vector3(2, 1, 2),
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.leaf,
  mesh: [],
};

const MOONVALUES = {
  pos: new THREE.Vector3(0 * UNIT, 40 * UNIT, -200 * UNIT),
  radius: 20 * UNIT,
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.lightMoon,
  mesh: [],
  emissive: new THREE.Color(0xffa500),
};

const HOUSEVALUES = {
  material: MATERIALVALUES.house,
  mesh: [],
};

const ROOFVALUES = {
  material: MATERIALVALUES.roof,
  mesh: [],
};

const CHIMNEYVALUES = {
  material: MATERIALVALUES.chimney,
  mesh: [],
};

const WINDOWVALUES = {
  material: MATERIALVALUES.glass,
  mesh: [],
};

const DOORVALUES = {
  material: MATERIALVALUES.roof,
  mesh: [],
};

const OVNITRANSLATIONVALUES = {
  stepX: 1 * UNIT,
  stepZ: 1 * UNIT,
  min: -1000 * UNIT,
  max: 1000 * UNIT,
};

const VALUES = [
  MOONVALUES,
  OVNIVALUES,
  COCKPITVALUES,
  BASEVALUES,
  OVNILIGHTS,
  TRUNKVALUES,
  TRUNKVALUES2,
  LEAFVALUES,
  LEAFVALUES2,
  HOUSEVALUES,
  ROOFVALUES,
  CHIMNEYVALUES,
];

const LIGHTVALUES = {
  global: 0xffa500,
  globalIntensity: 1,
  ambient: 0xffff00,
  ambientIntensity: 0.25,
};

const SKYVALUES = {
  size: 128,
  blue: new THREE.Color(0x0000ff),
  purple: new THREE.Color(0xa32cc4),
  stars: 1000,
  star: new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  starSize: 0.1,
  planet: new THREE.MeshBasicMaterial({
    color: 0xffa500,
  }),
  planetSize: 0.2,
};

const GROUNDVALUES = {
  size: 128,
  flowers: 1000,
  flowerSize: 0.2,
  colors: [
    0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff,
  ].map((color) => new THREE.Color(color)),
};

const CAMERAVALUES = {
  sky: {
    left: -SKYVALUES.size / 2,
    right: SKYVALUES.size / 2,
    top: SKYVALUES.size / 2,
    bottom: -SKYVALUES.size / 2,
    near: 1,
    far: 11,
    position: new THREE.Vector3(SKYVALUES.size / 2, 10, SKYVALUES.size / 2),
    lookAt: new THREE.Vector3(SKYVALUES.size / 2, 0, SKYVALUES.size / 2),
  },
  ground: {
    left: -GROUNDVALUES.size / 2,
    right: GROUNDVALUES.size / 2,
    top: GROUNDVALUES.size / 2,
    bottom: -GROUNDVALUES.size / 2,
    near: 1,
    far: 11,
    position: new THREE.Vector3(
      -GROUNDVALUES.size / 2,
      10,
      GROUNDVALUES.size / 2
    ),
    lookAt: new THREE.Vector3(-GROUNDVALUES.size / 2, 0, GROUNDVALUES.size / 2),
  },
  main: {
    fov: 70,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 1000000,
    position: new THREE.Vector3(300, 200, 600),
  },
};
