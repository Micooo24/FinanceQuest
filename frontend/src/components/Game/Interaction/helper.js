import * as THREE from 'three';

const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

const onMouseClick = (event, camera, scene, onBuildingClick) => {
  console.log("Mouse clicked at:", event.clientX, event.clientY);
  event.preventDefault();

  if (!scene) {
    console.error("Scene is not defined in onMouseClick");
    return;
  }

  console.log("Scene is defined in onMouseClick:", scene);

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  console.log("Number of intersected objects:", intersects.length);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    console.log("Intersected object:", intersectedObject.name);

    if (['Bank', 'house1', 'school', 'shop'].includes(intersectedObject.name)) {
      onBuildingClick(intersectedObject.name);
    } else {
      console.log("Intersected object is not a target building:", intersectedObject.name);
    }
  } else {
    console.log("No intersection with any object");
  }
};

export { onPointerMove, onMouseClick, pointer };