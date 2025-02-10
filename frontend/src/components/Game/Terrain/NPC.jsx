import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const npcPath ='https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077522/Business_Man_iixsxz.glb';
const npc2Path = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077524/Suit_p9buvg.glb';
const npc3Path = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077520/Worker_eehgdr.glb';
const npc4Path = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077520/Animated_Woman_eovuop.glb';
const npc5Path = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077521/Man_qn0rsz.glb';
const npc6Path = 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077520/Casual_Character_fexykr.glb';

// Global debug mode variable
const debugMode = false;

const loadNPC = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npcPath, (gltf) => {
    const npc = gltf.scene;
    npc.scale.set(1, 1, 1); // Adjust the scale if needed
    npc.position.set(-3.827592715703327, 0.6999999999999995, -5.437556845461079); // Set the position to the specified coordinates
    scene.add(npc); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC initial position:', npc.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC model: ' + error.message);
  });
};

const loadNPC2 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc2Path, (gltf) => {
    const npc2 = gltf.scene;
    npc2.scale.set(1, 1, 1); // Adjust the scale if needed
    npc2.position.set(5.4780211314395215, 0.4, 3.3910832268403883); // Set the position to the specified coordinates
    scene.add(npc2); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC2 initial position:', npc2.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC2 model: ' + error.message);
  });
};

const loadNPC3 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc3Path, (gltf) => {
    const npc3 = gltf.scene;
    npc3.scale.set(1, 1, 1); // Adjust the scale if needed
    npc3.position.set(-1.4618297841309467, 0.5, 32.37681833857714); // Set the position to the specified coordinates
    npc3.rotation.y = Math.PI; // Rotate the NPC to 30 degrees
    scene.add(npc3); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC3 initial position:', npc3.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC3 model: ' + error.message);
  });
};

const loadNPC4 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc4Path, (gltf) => {
    const npc4 = gltf.scene;
    npc4.scale.set(0.4, 0.4, 0.4); // Adjust the scale if needed
    npc4.position.set(-21.237018260660506, 0.2, 12.04255223695793); // Set the position to the specified coordinates
    scene.add(npc4); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC4 initial position:', npc4.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC4 model: ' + error.message);
  });
};

const loadNPC5 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc5Path, (gltf) => {
    const npc5 = gltf.scene;
    npc5.scale.set(0.5, 0.5, 0.5); // Adjust the scale if needed
    npc5.position.set(-24.379178316021466, 0.6999999999999995, -3.5041644738649715); // Set the position to the specified coordinates
    scene.add(npc5); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC5 initial position:', npc5.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC5 model: ' + error.message);
  });
};

const loadNPC6 = (scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(npc6Path, (gltf) => {
    const npc6 = gltf.scene;
    npc6.scale.set(1, 1, 1); // Adjust the scale if needed
    npc6.position.set(14.705890170749713, 0.5, -4.925546255337703); // Set the position to the specified coordinates
    scene.add(npc6); // Add NPC to the scene

    // Log the NPC's initial position
    if (debugMode) console.log('NPC6 initial position:', npc6.position);

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
    if (debugMode) console.error('An error occurred while loading the NPC6 model: ' + error.message);
  });
};

export { loadNPC, loadNPC2, loadNPC3, loadNPC4, loadNPC5, loadNPC6 };