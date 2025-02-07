// import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// const assets = {
//   traflight: require('../../../assets/game/traflight.fbx'), // Add the traffic light asset
// };

// const loadExtras = (scene, extraLayer) => {
//   const fbxLoader = new FBXLoader();

//   // Function to load and place assets
//   const loadAsset = (path, position, rotation = [0, 0, 0], scale = [1, 1, 1]) => {
//     fbxLoader.load(path, (model) => {
//       const object = model.scene || model;
//       object.position.set(...position);
//       object.rotation.set(...rotation);
//       object.scale.set(...scale);

//       // Default behavior for other models
//       object.traverse((child) => {
//         if (child.isMesh) {
//           child.castShadow = true; // Enable shadows for the object
//           child.receiveShadow = true; // Enable receiving shadows
//         }
//       });

//       extraLayer.add(object);
//       console.log(`${path} loaded and added to the scene`);
//     }, undefined, (error) => {
//       console.error(`An error occurred while loading ${path}: ${error.message}`);
//     });
//   };

//   // Define the positions and rotations for the extras
//   const layout = [
//     // Traffic light
//     { type: 'traflight', position: [0, 0.5, 0], scale: [0.01, 0.01, 0.01] }, // Adjusted y position
//   ];

//   // Load and place each asset
//   layout.forEach(({ type, position, rotation, scale }) => {
//     loadAsset(assets[type], position, rotation, scale);
//   });

//   // Add the extra layer to the scene
//   scene.add(extraLayer);
// };

// export { loadExtras };