import * as THREE from 'three';

const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
  // Adjust the pointer coordinates to match the plane geometry dimensions (71x71)
  pointer.x = (event.clientX / window.innerWidth) * 71 - 35.5;
  pointer.y = -(event.clientY / window.innerHeight) * 71 + 35.5;
};

const onMouseClick = (event, camera, scene, onBuildingClick) => {
  console.log("Mouse clicked at:", event.clientX, event.clientY);
  event.preventDefault();

  // Adjust the pointer coordinates to match the plane geometry dimensions (71x71)
  pointer.x = (event.clientX / window.innerWidth) * 71 - 35.5;
  pointer.y = -(event.clientY / window.innerHeight) * 71 + 35.5;

  // Log the adjusted pointer coordinates
  console.log("Pointer coordinates:", pointer.x, pointer.y);

  // Determine the side of the map
  if (pointer.x < -23.5) {
    console.log("Left side of the map");
  } else if (pointer.x > 23.5) {
    console.log("Right side of the map");
  } else if (pointer.y > 23.5) {
    console.log("Front side of the map");
  } else if (pointer.y < -23.5) {
    console.log("Back side of the map");
  } else {
    console.log("Center of the map");
  }

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
    const intersectionPoint = intersects[0].point;
    console.log("Intersected object:", intersectedObject.name);
    console.log("Intersection point:", intersectionPoint);

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