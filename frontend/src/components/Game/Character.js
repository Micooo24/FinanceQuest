import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const idlePath = require('../../assets/game/Idle.fbx');
const walkPath = require('../../assets/game/Walking.fbx');
const jumpPath = require('../../assets/game/Jumping.fbx');

const loadCharacter = (vehicleLayer, onLoad) => {
  const fbxLoader = new FBXLoader();
  let character, mixer, idleAction, walkAction, jumpAction;
  const clock = new THREE.Clock();

  fbxLoader.load(idlePath, (fbx) => {
    character = fbx;
    character.scale.set(1, 1, 1); // Adjust the scale here to make the character larger
    character.position.y = 0.5; // Set the y position to ensure the character is above the road
    character.position.z = 1; // Set the z position to 1
    vehicleLayer.add(character); // Add character to vehicleLayer

    // Set up animation mixer
    mixer = new THREE.AnimationMixer(character);

    // Load the idle animation
    fbxLoader.load(idlePath, (anim) => {
      const idleClip = anim.animations[0];
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
      console.log('Idle animation loaded:', idleAction);
    }, undefined, (error) => {
      console.error('Error loading idle animation:', error);
    });

    // Load the walk animation
    fbxLoader.load(walkPath, (anim) => {
      const walkClip = anim.animations[0];
      walkAction = mixer.clipAction(walkClip);
      walkAction.setLoop(THREE.LoopRepeat); // Ensure the walk animation loops
      walkAction.setDuration(1.0); // Adjust the duration to make the walk smoother
      walkAction.setEffectiveTimeScale(1.0); // Adjust the time scale to match the movement speed
      walkAction.setEffectiveWeight(1); // Adjust the weight if needed
      console.log('Walk animation loaded:', walkAction);
    }, undefined, (error) => {
      console.error('Error loading walk animation:', error);
    });

    // Load the jump animation
    fbxLoader.load(jumpPath, (anim) => {
      const jumpClip = anim.animations[0];
      jumpAction = mixer.clipAction(jumpClip);
      console.log('Jump animation loaded:', jumpAction);
    }, undefined, (error) => {
      console.error('Error loading jump animation:', error);
    });

    const moveSpeed = 0.2;
    const dampingFactor = 0.1;
    const targetPosition = new THREE.Vector3();
    const targetRotation = new THREE.Euler();

    const handleKeyDown = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
          targetPosition.z += moveSpeed;
          targetRotation.y = 0; // Face forward
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 's':
          targetPosition.z -= moveSpeed;
          targetRotation.y = Math.PI; // Face backward
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 'a':
          targetPosition.x -= moveSpeed;
          targetRotation.y = -Math.PI / 2; // Face left
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case 'd':
          targetPosition.x += moveSpeed;
          targetRotation.y = Math.PI / 2; // Face right
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          break;
        case ' ':
          if (jumpAction && !jumpAction.isRunning()) {
            console.log('Starting jump animation');
            if (walkAction && walkAction.isRunning()) walkAction.stop();
            if (idleAction && idleAction.isRunning()) idleAction.stop();
            jumpAction.reset().setLoop(THREE.LoopOnce).clampWhenFinished = true;
            jumpAction.setDuration(0.5).play();
            jumpAction.onFinish = () => {
              console.log('Jump animation finished');
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
            console.log('Stopping walk animation');
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      // Smoothly interpolate character's position and rotation
      if (character) {
        character.position.lerp(targetPosition, dampingFactor);
        character.rotation.y += (targetRotation.y - character.rotation.y) * dampingFactor;
      }
    };
    animate();

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