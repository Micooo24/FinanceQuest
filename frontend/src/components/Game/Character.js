import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const idlePath = require('../../assets/game/Idle.fbx');
const walkPath = require('../../assets/game/Walking.fbx');
const jumpPath = require('../../assets/game/Jumping.fbx');

const loadCharacter = (vehicleLayer, onLoad) => {
  const fbxLoader = new FBXLoader();
  let character, mixer, idleAction, walkAction, jumpAction;

  fbxLoader.load(idlePath, (fbx) => {
    character = fbx;
    character.scale.set(1, 1, 1); // Adjust the scale here to make the character larger
    character.position.y = 0.5; // Set the y position to ensure the character is above the road
    vehicleLayer.add(character); // Add character to vehicleLayer

    // Set up animation mixer
    mixer = new THREE.AnimationMixer(character);

    // Load the idle animation
    fbxLoader.load(idlePath, (anim) => {
      const idleClip = anim.animations[0];
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
    });

    // Load the walk animation
    fbxLoader.load(walkPath, (anim) => {
      const walkClip = anim.animations[0];
      walkAction = mixer.clipAction(walkClip);
      walkAction.setLoop(THREE.LoopRepeat); // Ensure the walk animation loops
      walkAction.setDuration(0.5); // Adjust the duration to make the walk smoother
      walkAction.setEffectiveTimeScale(2); // Increase the time scale to make the walk faster
      walkAction.setEffectiveWeight(1); // Adjust the weight if needed
    });

    // Load the jump animation
    fbxLoader.load(jumpPath, (anim) => {
      const jumpClip = anim.animations[0];
      jumpAction = mixer.clipAction(jumpClip);
    });

    const handleKeyDown = (event) => {
      if (!character) return;
      switch (event.key) {
        case 's':
          character.position.z += 0.2; // Increase movement speed to match animation speed
          character.rotation.y = 0; // Face forward
          if (walkAction && !walkAction.isRunning()) {
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 'w':
          character.position.z -= 0.2; // Increase movement speed to match animation speed
          character.rotation.y = Math.PI; // Face backward
          if (walkAction && !walkAction.isRunning()) {
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 'a':
          character.position.x -= 0.2; // Increase movement speed to match animation speed
          character.rotation.y = -Math.PI / 2; // Face left
          if (walkAction && !walkAction.isRunning()) {
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 'd':
          character.position.x += 0.2; // Increase movement speed to match animation speed
          character.rotation.y = Math.PI / 2; // Face right
          if (walkAction && !walkAction.isRunning()) {
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case ' ':
          if (jumpAction && !jumpAction.isRunning()) {
            if (walkAction && walkAction.isRunning()) walkAction.stop();
            if (idleAction && idleAction.isRunning()) idleAction.stop();
            jumpAction.reset().setLoop(THREE.LoopOnce).clampWhenFinished = true;
            jumpAction.setDuration(0.5).play();
            jumpAction.onFinish = () => {
              if (idleAction) idleAction.fadeIn(0.2).play();
            };
          }
          break;
        default:
          break;
      }
    };

    // Handle key up events
    const handleKeyUp = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
          if (walkAction && walkAction.isRunning()) {
            walkAction.fadeOut(0.2);
            idleAction.reset().fadeIn(0.2).play();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Call the onLoad callback with the character and mixer
    onLoad(character, mixer);

    // Clean up event listeners and dispose of resources on unload
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (character) {
        vehicleLayer.remove(character);
        character.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (child.material.isMaterial) {
              child.material.dispose();
            } else {
              for (const material of child.material) {
                material.dispose();
              }
            }
          }
        });
      }
      if (mixer) mixer.uncacheRoot(character);
    };
  }, undefined, (error) => {
    console.error('An error occurred while loading the character model: ' + error.message);
  });
};

export { loadCharacter };

