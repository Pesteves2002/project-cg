const UNIT = 20;

const CLOCK = new THREE.Clock();

const DELTA_MULT = 100;

const FOV = 70;

const MINVIEWDISTANCE = 1;

const MAXVIEWDISTANCE = 10000;

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
  ovni: new THREE.MeshBasicMaterial({
    color: 0x120345,
  }),
};

const CAMERAVALUES = [[1000, 1000, 1000]];

const OVNIVALUES = {
  pos: new THREE.Vector3(0, 0, 0),
  radius: 7 * UNIT,
  scale: new THREE.Vector3(2, 1, 2),
  type: PRIMITIVES.SPHERE,
  material: MATERIALVALUES.ovni,
};
