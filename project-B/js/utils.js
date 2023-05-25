function createObject3D(objectValues) {
  "use strict";

  const object = new THREE.Object3D();

  let geometry;

  switch (objectValues.type) {
    case Primitives.CUBE:
      geometry = new THREE.BoxGeometry(
        objectValues.width,
        objectValues.height,
        objectValues.depth
      );
      break;
    case Primitives.CYLINDER:
      geometry = new THREE.CylinderGeometry(
        objectValues.radiusTop,
        objectValues.radiusBottom,
        objectValues.height
      );
      break;
    default:
      console.log("Invalid object type");
      break;
  }

  const mesh = new THREE.Mesh(geometry, objectValues.material);
  object.add(mesh);

  return object;
}

function setPosition(obj, objectValues) {
  obj.position.set(
    objectValues.relativeX,
    objectValues.relativeY,
    objectValues.relativeZ
  );
}

function mirrorObject(obj, axis, mirror = false) {
  const newObj = obj.clone(true);
  switch (axis) {
    case AXIS.X:
      newObj.position.x = -obj.position.x;
      if (mirror) {
        newObj.scale.x = -obj.scale.x;
      }
      break;
    case AXIS.Y:
      newObj.position.y = -obj.position.y;
      if (mirror) {
        newObj.scale.y = -obj.scale.y;
      }
      break;
    case AXIS.Z:
      newObj.position.z = -obj.position.z;
      if (mirror) {
        newObj.scale.z = -obj.scale.z;
      }
      break;
    default:
      console.log("Invalid axis");
      break;
  }
  return newObj;
}

function changePivot(obj, group, offset, axis) {
  switch (axis) {
    case AXIS.X:
      obj.position.x -= offset;
      group.position.x += offset;
      break;
    case AXIS.Y:
      obj.position.y -= offset;
      group.position.y += offset;
      break;
    case AXIS.Z:
      obj.position.z -= offset;
      group.position.z += offset;
      break;
    default:
      console.log("Invalid axis");
      break;
  }
}

function rotateObject(object, rotationValues, axis) {
  "use strict";

  switch (axis) {
    case AXIS.X:
      object.rotation.x = THREE.Math.clamp(
        object.userData.step + object.rotation.x,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Y:
      object.rotation.y += THREE.Math.clamp(
        object.userData.step + object.rotation.y,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Z:
      object.rotation.z += THREE.Math.clamp(
        object.userData.step + object.rotation.z,
        rotationValues.min,
        rotationValues.max
      );
      break;

    default:
      console.log("Invalid axis");
  }
}

function translateObject(object, objectValues, offset, axis) {
  "use strict";

  switch (axis) {
    case AXIS.X:
      object.position.x = THREE.Math.clamp(
        object.userData.step + object.position.x,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;
    case AXIS.Y:
      object.position.y = THREE.Math.clamp(
        object.userData.step + object.position.y,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;
    case AXIS.Z:
      object.position.z = THREE.Math.clamp(
        object.userData.step + object.position.z,
        objectValues.min + offset,
        objectValues.max + offset
      );
      break;

    default:
      console.log("Invalid axis");
  }
}

function resetSteps() {
  "use strict";

  head.userData.step = 0;
  leftArm.userData.step = 0;
  rightArm.userData.step = 0;
  thighs.userData.step = 0;
  foot.userData.step = 0;
  trailer.userData.xStep = 0;
  trailer.userData.zStep = 0;
}

function greaterOrEqualThan(a, b) {
  return parseFloat(a) >= parseFloat(b);
}

function lessOrEqualThan(a, b) {
  return parseFloat(a) <= parseFloat(b);
}

function equal(a, b) {
  return parseFloat(a) == parseFloat(b);
}

function checkIfTruck() {
  "use strict";

  return (
    equal(head.rotation.x, headRotation.min) &&
    equal(leftArm.position.x, leftArmTranslation.min + armValues.relativeX) &&
    equal(thighs.rotation.x, thighsRotation.max) &&
    equal(foot.rotation.x, footRotation.max)
  );
}
