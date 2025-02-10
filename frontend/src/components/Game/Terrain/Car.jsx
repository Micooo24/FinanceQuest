import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const assets = {
  truck: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077532/Truck_wb5nzd.glb', // Add the truck asset
  schoolbus: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077529/Schoolbus_do6r7q.glb', // Add the school bus asset
};

const loadCars = (scene, vehicleLayer) => {
  const gltfLoader = new GLTFLoader();

  // Function to load and place assets
  const loadAsset = (path, position, rotation = [0, 0, 0], scale = [1, 1, 1]) => {
    gltfLoader.load(path, (model) => {
      const object = model.scene || model;
      object.position.set(...position);
      object.rotation.set(...rotation);
      object.scale.set(...scale);

      // Default behavior for other models
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; // Enable shadows for the object
          child.receiveShadow = true; // Enable receiving shadows
        }
      });

      vehicleLayer.add(object);
      console.log(`${path} loaded and added to the scene`);
    }, undefined, (error) => {
      console.error(`An error occurred while loading ${path}: ${error.message}`);
    });
  };

  // Define the positions and rotations for the cars
  const layout = [
    // Truck parked on the side of the road
    { type: 'truck', position: [5, 0.5, -7], scale: [0.01, 0.01, 0.01] }, // Adjusted y position
    // School bus parked close to the school
    { type: 'schoolbus', position: [15, 0.5, -10], scale: [0.1, 0.1, 0.1] }, // Adjusted y position
  ];  

  // Load and place each asset
  layout.forEach(({ type, position, rotation, scale }) => {
    loadAsset(assets[type], position, rotation, scale);
  });

  // Add the vehicle layer to the scene
  scene.add(vehicleLayer);
};

export { loadCars };