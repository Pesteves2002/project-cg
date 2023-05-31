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

  object.add(mesh);

  return object;
}

function setPosition(obj, objectValues) {
  obj.position.copy(objectValues.pos);
}

function mirrorObject(obj, axis, mirror = false) {
  const newObj = obj.clone(true);
  switch (axis) {
    case AXIS.X:
      newObj.position.copy(
        new THREE.Vector3(-obj.position.x, obj.position.y, obj.position.z)
      );
      if (mirror) {
        newObj.scale.x = -obj.scale.x;
      }
      break;
    case AXIS.Y:
      newObj.position.copy(
        new THREE.Vector3(obj.position.x, -obj.position.y, obj.position.z)
      );
      if (mirror) {
        newObj.scale.y = -obj.scale.y;
      }
      break;
    case AXIS.Z:
      newObj.position.copy(
        new THREE.Vector3(obj.position.x, obj.position.y, -obj.position.z)
      );
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
      obj.position.copy(
        new THREE.Vector3(
          obj.position.x - offset,
          obj.position.y,
          obj.position.z
        )
      );
      group.position.copy(
        new THREE.Vector3(
          group.position.x + offset,
          group.position.y,
          group.position.z
        )
      );
      break;
    case AXIS.Y:
      obj.position.copy(
        new THREE.Vector3(
          obj.position.x,
          obj.position.y - offset,
          obj.position.z
        )
      );
      group.position.copy(
        new THREE.Vector3(
          group.position.x,
          group.position.y + offset,
          group.position.z
        )
      );
      break;
    case AXIS.Z:
      obj.position.copy(
        new THREE.Vector3(
          obj.position.x,
          obj.position.y,
          obj.position.z - offset
        )
      );
      group.position.copy(
        new THREE.Vector3(
          group.position.x,
          group.position.y,
          group.position.z + offset
        )
      );
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
        object.userData.step * delta + object.rotation.x,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Y:
      object.rotation.y += THREE.Math.clamp(
        object.userData.step * delta + object.rotation.y,
        rotationValues.min,
        rotationValues.max
      );
      break;

    case AXIS.Z:
      object.rotation.z += THREE.Math.clamp(
        object.userData.step * delta + object.rotation.z,
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
  return Math.abs(parseFloat(a) - parseFloat(b)) < 0.0001;
}

function outOfBounds(a, b, step) {
  return step > 0 ? lessOrEqualThan(a, b) : greaterOrEqualThan(a, b);
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

function translateTrailer() {
  trailer.userData.step = trailer.userData.xStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.X);
  points.trailerMin.x += trailer.userData.xStep * delta;
  points.trailerMax.x += trailer.userData.xStep * delta;

  trailer.userData.step = trailer.userData.zStep;
  translateObject(trailer, trailerTranslation, 0, AXIS.Z);
  points.trailerMin.z += trailer.userData.zStep * delta;
  points.trailerMax.z += trailer.userData.zStep * delta;
}
