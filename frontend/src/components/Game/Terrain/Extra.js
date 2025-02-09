import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// URL to the trees.glb file in Cloudinary
const treesPath = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739085347/Trees_hnv8hf.glb';
const Tree = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739085934/Tree_y0giec.glb';
const Tree1 =  'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739085932/Tree_1_wdasbd.glb';

// Function to load and place random trees
const loadTrees = (scene, extraLayer) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(treesPath, (gltf) => {
    const treeModels = gltf.scene.children;

    // Function to get a random position within a specified range
    const getRandomPosition = (min, max) => Math.random() * (max - min) + min;

    // Place 50 random trees
    for (let i = 0; i < 50; i++) {
      const tree = treeModels[Math.floor(Math.random() * treeModels.length)].clone();
      tree.scale.set(0.5, 0.5, 0.5); // Adjust the scale if needed
      tree.position.set(getRandomPosition(-5, 5), 0, getRandomPosition(-5, 5)); // Random position within the map bounds
      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree);
    }

    // Load specific trees at given coordinates
    gltfLoader.load(Tree, (gltf) => {
      const tree = gltf.scene.clone();
      tree.scale.set(0.5, 0.5, 0.5);
      tree.position.set(3.895188284681255, 0, 3.86274537768571);
      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree);
    });

    gltfLoader.load(Tree1, (gltf) => {
      const tree1 = gltf.scene.clone();
      tree1.scale.set(0.5, 0.5, 0.5);
      tree1.position.set(-5.2264750874909, 0, 3.3973165898621396);
      tree1.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree1);
    });

    // Load more specific trees at given coordinates
    gltfLoader.load(Tree1, (gltf) => {
      const tree1 = gltf.scene.clone();
      tree1.scale.set(0.5, 0.5, 0.5);
      tree1.position.set(-30.345162368713183, 0, -5.560682234234167);
      tree1.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree1);
    });

    gltfLoader.load(Tree1, (gltf) => {
      const tree1 = gltf.scene.clone();
      tree1.scale.set(0.5, 0.5, 0.5);
      tree1.position.set(7.619717903967292, 0, -31.895930160528607);
      tree1.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree1);
    });

    gltfLoader.load(Tree1, (gltf) => {
      const tree1 = gltf.scene.clone();
      tree1.scale.set(0.5, 0.5, 0.5);
      tree1.position.set(20.25561480937368, 0, -4.855357250103376);
      tree1.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree1);
    });

    gltfLoader.load(Tree, (gltf) => {
      const tree = gltf.scene.clone();
      tree.scale.set(0.5, 0.5, 0.5);
      tree.position.set(-9.936594874959235, 0, 26.84849935280826);
      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      extraLayer.add(tree);
    });

    scene.add(extraLayer);
  }, undefined, (error) => {
    console.error('An error occurred while loading the trees model: ' + error.message);
  });
};

export { loadTrees };