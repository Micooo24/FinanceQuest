import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const npcPath = require('../../../assets/game/Business Man.glb');
const npc2Path = require('../../../assets/game/Suit.glb');
const npc3Path = require('../../../assets/game/Worker.glb');
const npc4Path = require('../../../assets/game/Animated Woman.glb');
const npc5Path = require('../../../assets/game/Man.glb');
const npc6Path = require('../../../assets/game/Casual Character.glb');

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
    npc2.position.set(4.988791451309085, 0.6999999999999995, 2.9551386344863566); // Set the position to the specified coordinates
    scene.add(npc2); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC2 initial position:', npc2.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc2);
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
    console.error('An error occurred while loading the NPC2 model: ' + error.message);
  });
};

const loadNPC3 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc3Path, (gltf) => {
    const npc3 = gltf.scene;
    npc3.scale.set(1, 1, 1); // Adjust the scale if needed
    npc3.position.set(-1.4618297841309467, 0.6999999999999995, 32.37681833857714); // Set the position to the specified coordinates
    scene.add(npc3); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC3 initial position:', npc3.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc3);
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
    console.error('An error occurred while loading the NPC3 model: ' + error.message);
  });
};

const loadNPC4 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc4Path, (gltf) => {
    const npc4 = gltf.scene;
    npc4.scale.set(0.5, 0.5, 0.5); // Adjust the scale if needed
    npc4.position.set(-21.237018260660506, 0.6999999999999995, 12.04255223695793); // Set the position to the specified coordinates
    scene.add(npc4); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC4 initial position:', npc4.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc4); 
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
    console.error('An error occurred while loading the NPC4 model: ' + error.message);
  });
};

const loadNPC5 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc5Path, (gltf) => {
    const npc5 = gltf.scene;
    npc5.scale.set(0.7, 0.7, 0.7); // Adjust the scale if needed
    npc5.position.set(-23.230934589425242, 0.6999999999999995, -9.172435066843477); // Set the position to the specified coordinates
    scene.add(npc5); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC5 initial position:', npc5.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc5);
    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[2]);
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
    console.error('An error occurred while loading the NPC5 model: ' + error.message);
  });
};

const loadNPC6 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc6Path, (gltf) => {
    const npc6 = gltf.scene;
    npc6.scale.set(1, 1, 1); // Adjust the scale if needed
    npc6.position.set(14.705890170749713, 0.6999999999999995, -4.925546255337703); // Set the position to the specified coordinates
    scene.add(npc6); // Add NPC to the scene

    // Log the NPC's initial position
    console.log('NPC6 initial position:', npc6.position);

    // Set up animation mixer
    const mixer = new THREE.AnimationMixer(npc6);
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
    console.error('An error occurred while loading the NPC6 model: ' + error.message);
  });
};

export { loadNPC, loadNPC2, loadNPC3, loadNPC4, loadNPC5, loadNPC6 };