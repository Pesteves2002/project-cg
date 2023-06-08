function createTrees() {
  "use strict";

  for (let i = 0; i < TREEPOSITIONS.length; i++) {
    const tree = createTree();
    tree.position.copy(TREEPOSITIONS[i]);
    tree.scale.copy(TREESCALES[i]);
    tree.rotation.y += TREEROTATIONS[i];
    scene.add(tree);
  }
}

function createTree() {
  "use strict";

  const trunk = createTrunk();
  setPosition(trunk, TRUNKVALUES);

  return trunk;
}

function createTrunk() {
  "use strict";

  const group = new THREE.Group();

  const trunk = createObject3D(TRUNKVALUES);
  const secondTrunk = createSecondTrunk();
  const leaves = createLeaves();

  trunk.rotation.z = Math.PI / 8;

  group.add(trunk);
  group.add(secondTrunk);
  group.add(leaves);

  return group;
}

function createSecondTrunk() {
  "use strict";

  const group = new THREE.Group();

  const secondTrunk = createObject3D(TRUNKVALUES2);
  const secondLeaves = createSecondLeaves();

  group.add(secondTrunk);
  group.add(secondLeaves);

  secondTrunk.rotation.z = -Math.PI / 4;

  setPosition(group, TRUNKVALUES2);

  return group;
}

function createLeaves() {
  "use strict";

  const leaves = createObject3D(LEAFVALUES);
  setPosition(leaves, LEAFVALUES);

  return leaves;
}

function createSecondLeaves() {
  "use strict";

  const leaves = createObject3D(LEAFVALUES2);
  setPosition(leaves, LEAFVALUES2);

  return leaves;
}
