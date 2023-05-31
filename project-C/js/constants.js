const UNIT = 20;

const CLOCK = new THREE.Clock();

const DELTA_MULT = 100;

const FOV = 70;

const MINVIEWDISTANCE = 1;

const MAXVIEWDISTANCE = 1000000;

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
  ovni: new THREE.MeshLambertMaterial({
    color: 0x120345,
  }),
  glass: new THREE.MeshLambertMaterial({
    color: 0x001223,
  }),
  light: new THREE.MeshLambertMaterial({
    color: 0xffff00,
  }),
  trunk: new THREE.MeshLambertMaterial({
    color: 0x964b00,
  }),
  leaf: new THREE.MeshLambertMaterial({
    color: 0x00ff00,
  }),
  house: new THREE.MeshLambertMaterial({
    color: 0xffffff,
  }),
  roof: new THREE.MeshLambertMaterial({
    color: 0x964b00,
  }),
};

const MATERIALS = {
  LAMBERT: "Lambert",
  PHONG: "Phong",
  TOON: "Toon",
};

const EMISSIVE = {
  PHONG: 0x000000,
  TOON: 0x000000,
};

const SHININESS = {
  PHONG: 30,
  TOON: 0,
};

const CAMERAVALUES = [[1000, 1000, 1000]];

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
};

const OVNILIGHTS = {
  pos: new THREE.Vector3(11 * UNIT, -4 * UNIT, 0),
  radius: 2 * UNIT,
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.light,
  step: Math.PI / 4,
  mesh: [],
};

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

const HOUSEVALUES = {
  pos: new THREE.Vector3(0 * UNIT, 0 * UNIT, 50 * UNIT),
  width: 17 * UNIT,
  height: 9 * UNIT,
  depth: 12 * UNIT,
  type: PRIMITIVES.CUBE,
  material: MATERIALVALUES.house,
  mesh: [],
};

// WIDHT_roof^2 + DEPTH_roof^2 = DEPTH_HOUSE^2
const ROOFVALUES = {
  pos: new THREE.Vector3(0, 4.5 * UNIT, 0),
  width: Math.sqrt(72) * UNIT,
  height: 16.9 * UNIT,
  depth: Math.sqrt(72) * UNIT,
  type: PRIMITIVES.CUBE,
  material: MATERIALVALUES.roof,
  mesh: [],
};

const CHIMNEYVALUES = {
  pos: new THREE.Vector3(5 * UNIT, 4 * UNIT, 3 * UNIT),
  width: 2 * UNIT,
  height: 5 * UNIT,
  depth: 2 * UNIT,
  type: PRIMITIVES.CUBE,
  material: MATERIALVALUES.house,
  mesh: [],
};

const MOONVALUES = {
  pos: new THREE.Vector3(0, 200 * UNIT, 0),
  radius: 20 * UNIT,
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.light,
  mesh: [],
};

const OVNITRANSLATIONVALUES = {
  stepX: 1 * UNIT,
  stepZ: 1 * UNIT,
  min: -1000 * UNIT,
  max: 1000 * UNIT,
};

const VALUES = [
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
