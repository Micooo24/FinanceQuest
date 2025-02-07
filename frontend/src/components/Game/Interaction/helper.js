import * as THREE from 'three';

const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

const onMouseClick = (event, camera) => {
  console.log("Mouse clicked at:", event.clientX, event.clientY);
  event.preventDefault();

  // Assuming the map is centered at (0, 0) and has a size of 71x71 units
  const mapSize = 71;
  const halfMapSize = mapSize / 2;

  // Create a raycaster and set its position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);

  // Log the raycaster's ray origin and direction
  console.log("Raycaster origin:", raycaster.ray.origin);
  console.log("Raycaster direction:", raycaster.ray.direction);

  // Calculate the intersection point with the ground plane
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersection = new THREE.Vector3();
  const intersects = raycaster.ray.intersectPlane(plane, intersection);

  // Log the intersection point
  console.log("Intersection point:", intersection);

  if (intersects) {
    // Log the intersection coordinates
    console.log("Intersection X:", intersection.x);
    console.log("Intersection Z:", intersection.z);

    // Log the side of the map based on the intersection coordinates
    if (intersection.x > halfMapSize) {
      console.log("Clicked on the right side of the map");
    } else if (intersection.x < -halfMapSize) {
      console.log("Clicked on the left side of the map");
    }

    if (intersection.z > halfMapSize) {
      console.log("Clicked on the front side of the map");
    } else if (intersection.z < -halfMapSize) {
      console.log("Clicked on the back side of the map");
    }
  } else {
    console.log("No intersection with the ground plane");
  }
};

export { onPointerMove, onMouseClick, pointer };