import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const npcPath = require('../../../assets/game/Business Man.glb');
const npc2Path = require('../../../assets/game/npc2.glb');

const loadNPC = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npcPath, (gltf) => {
    const npc = gltf.scene;
    npc.scale.set(1, 1, 1); // Adjust the scale if needed
    npc.position.set(-6.571751181307473, 0.5, -5.713296781757897); // Set the position to the specified coordinates
    scene.add(npc); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC initial position:', npc.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc);
    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[23]);
      action.play();
    }

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
    };
    animate();
  }, undefined, (error) => {
    console.error('An error occurred while loading the NPC model: ' + error.message);
  });
};

const loadNPC2 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc2Path, (gltf) => {
    const npc2 = gltf.scene;
    npc2.scale.set(1, 1, 1); // Adjust the scale if needed
    npc2.position.set(-6.571751181307473, 0.7, -5.713296781757897); // Set the position to the specified coordinates
    scene.add(npc2); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC2 initial position:', npc2.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc2);
    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[1]);
      action.play();
    }

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
    };
    animate();
  }, undefined, (error) => {
    console.error('An error occurred while loading the NPC2 model: ' + error.message);
  });
};

export { loadNPC, loadNPC2 };