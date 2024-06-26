function createObject3D(objectValues) {
  "use strict";

  const object = new THREE.Object3D();

  let geometry;

  switch (objectValues.type) {
    case PRIMITIVES.CUBE:
      geometry = new THREE.BoxGeometry(
        objectValues.width,
        objectValues.height,
        objectValues.depth
      );
      break;
    case PRIMITIVES.CYLINDER:
      geometry = new THREE.CylinderGeometry(
        objectValues.radiusTop,
        objectValues.radiusBottom,
        objectValues.height
      );
      break;
    case PRIMITIVES.SPHERE:
      geometry = new THREE.SphereGeometry(objectValues.radius);
      break;
    default:
      console.log("Invalid object type");
      break;
  }

  const mesh = new THREE.Mesh(geometry, objectValues.material);

  if (objectValues.scale) {
    mesh.scale.copy(objectValues.scale);
  }

  objectValues.mesh.push(mesh);

  object.add(mesh);
  return object;
}

function setPosition(obj, objectValues) {
  obj.position.copy(objectValues.pos);
}

function translateObject(object, objectValues, offset, axis) {
  "use strict";

  switch (axis) {
    case AXIS.X:
      object.position.copy(
        new THREE.Vector3(
          THREE.Math.clamp(
            object.userData.step * delta + object.position.x,
            objectValues.min + offset,
            objectValues.max + offset
          ),
          object.position.y,
          object.position.z
        )
      );

      break;
    case AXIS.Y:
      object.position.copy(
        new THREE.Vector3(
          object.position.x,
          THREE.Math.clamp(
            THREE.Math.clamp(
              object.userData.step * delta + object.position.y,
              objectValues.min + offset,
              objectValues.max + offset
            ),
            object.position.z
          )
        )
      );
      break;
    case AXIS.Z:
      object.position.copy(
        new THREE.Vector3(
          object.position.x,
          object.position.y,
          THREE.Math.clamp(
            object.userData.step * delta + object.position.z,
            objectValues.min + offset,
            objectValues.max + offset
          )
        )
      );
      break;

    default:
      console.log("Invalid axis");
  }
}

function resetSteps() {
  "use strict";

  ovni.userData.Step = 0;
  ovni.userData.xStep = 0;
  ovni.userData.zStep = 0;
}

function translateOvni() {
  const xMov = ovniMovementXPos + ovniMovementXNeg;
  const zMov = ovniMovementZPos + ovniMovementZNeg;

  if (xMov == 0 && zMov == 0) {
    return;
  }

  // normalize the vector...
  const normalize = Math.sqrt(Math.pow(xMov, 2) + Math.pow(zMov, 2));

  ovni.userData.step = (xMov / normalize) * 10;
  translateObject(ovni, OVNITRANSLATIONVALUES, 0, AXIS.X);

  ovni.userData.step = (zMov / normalize) * 10;
  translateObject(ovni, OVNITRANSLATIONVALUES, 0, AXIS.Z);
}

function changeMaterial(meshes, material) {
  "use strict";

  let newMaterial;
  let newColor = meshes[0].material.color;

  switch (material) {
    case MATERIALS.LAMBERT:
      newMaterial = new THREE.MeshLambertMaterial({
        color: newColor,
      });
      break;
    case MATERIALS.PHONG:
      newMaterial = new THREE.MeshPhongMaterial({
        color: newColor,
      });
      break;

    case MATERIALS.TOON:
      newMaterial = new THREE.MeshToonMaterial({
        color: newColor,
      });
      break;

    case MATERIALS.BASIC:
      newMaterial = new THREE.MeshBasicMaterial({
        color: newColor,
      });
      break;

    default:
      console.log("Invalid material");
      return;
  }

  meshes.forEach((mesh) => {
    if (mesh.material.side == THREE.DoubleSide) {
      newMaterial.side = THREE.DoubleSide;
    }
    mesh.material = newMaterial;
  });
}

function createPrespectiveCamera(cameraValues) {
  "use strict";
  const camera = new THREE.PerspectiveCamera(
    cameraValues.fov,
    cameraValues.aspect,
    cameraValues.near,
    cameraValues.far
  );
  camera.position.copy(cameraValues.position);
  camera.lookAt(scene.position);

  return camera;
}

function createOrtographicCamera(cameraValues) {
  "use strict";
  const camera = new THREE.OrthographicCamera(
    cameraValues.left,
    cameraValues.right,
    cameraValues.top,
    cameraValues.bottom,
    cameraValues.near,
    cameraValues.far
  );
  camera.position.copy(cameraValues.position);
  camera.lookAt(cameraValues.lookAt);

  return camera;
}
