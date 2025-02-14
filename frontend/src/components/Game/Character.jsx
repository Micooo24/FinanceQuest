import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import toast from 'react-hot-toast';
import { initializeBankInteraction, updateBankInteractionButton, handleBankInteractionClick } from './Interaction/BankInteraction';
import { initializeNPCInteraction, updateNPCInteractionButton, handleNPCInteractionClick, createInteractionButton } from './Interaction/NPCInteraction';

const idlePath = 'https://res.cloudinary.com/dwp8u82sd/raw/upload/v1739077535/Idle_dng8de.fbx';
const walkPath = 'https://res.cloudinary.com/dwp8u82sd/raw/upload/v1739094607/Walking_c7lfpe.fbx';
const jumpPath = 'https://res.cloudinary.com/dwp8u82sd/raw/upload/v1739077533/Jumping_hxqlkv.fbx';

// Global debug mode variable
const debugMode = true;

const loadCharacter = (vehicleLayer, onLoad, camera) => {
  const fbxLoader = new FBXLoader();
  let character, mixer, idleAction, walkAction, jumpAction;
  const clock = new THREE.Clock();

  // Create a button for interaction
  const interactionButton = createInteractionButton();

  // Initialize NPC interaction
  initializeNPCInteraction();

  // Initialize bank interaction
  initializeBankInteraction();

  // Function to calculate distance between two points
  const calculateDistance = (position1, position2) => {
    return position1.distanceTo(position2);
  };

  // Function to show/hide the button based on proximity
  const updateInteractionButton = (characterPosition) => {
    if (updateNPCInteractionButton(characterPosition, interactionButton)) {
      // NPC interaction button update handled in NPCInteraction.js
    } else if (updateBankInteractionButton(characterPosition, interactionButton)) {
      // Bank interaction button update handled in BankInteraction.js
    } else {
      interactionButton.style.display = 'none';
    }
  };

  // Event listeners for button clicks
  interactionButton.addEventListener('click', () => {
    if (interactionButton.innerText === 'Talk to Person') {
      handleNPCInteractionClick(interactionButton);
    } else if (interactionButton.innerText === 'Go to Bank') {
      handleBankInteractionClick(interactionButton);
    }
  });

  fbxLoader.load(idlePath, (fbx) => {
    character = fbx;
    character.scale.set(1, 1, 1);
    // character.rotation.y = Math.PI * 2; // Rotates 360 degrees
    character.position.set(-6.599999726980053, 0.5, 32.054316962328315);
    vehicleLayer.add(character);

    // Log the character's initial rotation
    if (debugMode) console.log('Character initial rotation:', character.rotation);

    // Set up animation mixer
    mixer = new THREE.AnimationMixer(character);

    // Load the idle animation
    fbxLoader.load(idlePath, (anim) => {
      const idleClip = anim.animations[0];
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
      if (debugMode) console.log('Idle animation loaded:', idleAction);
    }, undefined, (error) => {
      if (debugMode) console.error('Error loading idle animation:', error);
    });

    // Load the walk animation
    fbxLoader.load(walkPath, (anim) => {
      const walkClip = anim.animations[0];
      walkAction = mixer.clipAction(walkClip);
      walkAction.setLoop(THREE.LoopRepeat);
      walkAction.setDuration(1.0); // Increase duration to make the animation slower
      walkAction.setEffectiveTimeScale(1.0);
      walkAction.setEffectiveWeight(1);
      if (debugMode) console.log('Walk animation loaded:', walkAction);
    }, undefined, (error) => {
      if (debugMode) console.error('Error loading walk animation:', error);
    });

    // Load the jump animation
    fbxLoader.load(jumpPath, (anim) => {
      const jumpClip = anim.animations[0];
      jumpAction = mixer.clipAction(jumpClip);
      if (debugMode) console.log('Jump animation loaded:', jumpAction);
    }, undefined, (error) => {
      if (debugMode) console.error('Error loading jump animation:', error);
    });

    const moveSpeed = 0.2;
    const dampingFactor = 0.1;
    const targetPosition = new THREE.Vector3(-6.599999726980053, 0.7, 32.054316962328315);
    const targetRotation = new THREE.Euler();

    const handleKeyDown = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
          targetPosition.z += moveSpeed * Math.cos(character.rotation.y);
          targetPosition.x += moveSpeed * Math.sin(character.rotation.y);
          if (walkAction && !walkAction.isRunning()) {
            if (debugMode) console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          walkAction.setEffectiveTimeScale(1.0);
          break;
        case 's':
          targetPosition.z -= moveSpeed * Math.cos(character.rotation.y);
          targetPosition.x -= moveSpeed * Math.sin(character.rotation.y);
          if (walkAction && !walkAction.isRunning()) {
            if (debugMode) console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          walkAction.setEffectiveTimeScale(-1.0);
          break;
        case 'd':
          targetRotation.y -= Math.PI / 2;
          break;
        case 'a':
          targetRotation.y += Math.PI / 2;
          break;
        case ' ':
          if (jumpAction && !jumpAction.isRunning()) {
            if (debugMode) console.log('Starting jump animation');
            if (walkAction && walkAction.isRunning()) walkAction.stop();
            if (idleAction && idleAction.isRunning()) idleAction.stop();
            jumpAction.reset().setLoop(THREE.LoopOnce).clampWhenFinished = true;
            jumpAction.setDuration(0.5).play();
            jumpAction.onFinish = () => {
              if (debugMode) console.log('Jump animation finished');
              if (idleAction) idleAction.fadeIn(0.2).play();
            };
          }
          break;
        default:
          break;
      }
      if (debugMode) console.log(`Character position: ${character.position.x}, ${character.position.y}, ${character.position.z}`);
    };

    // Handle key up events
    const handleKeyUp = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
        case 's':
          if (walkAction && walkAction.isRunning()) {
            if (debugMode) console.log('Stopping walk animation');
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
        // Rotate the character 180 degrees
        character.rotation.y = Math.PI;

        character.position.lerp(targetPosition, dampingFactor);
        character.rotation.y += (targetRotation.y - character.rotation.y) * dampingFactor;

        // Update the interaction button based on proximity
        updateInteractionButton(character.position);
      }
    };
    animate();

    // Call the onLoad callback with the character and mixer
    onLoad(character, mixer);

    // Clean up event listeners and dispose of resources on unload
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.removeChild(interactionButton); // Remove the button on cleanup
      document.getElementById('npcModal')?.remove(); // Remove the NPC modal on cleanup
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
    if (debugMode) console.error('An error occurred while loading the character model: ' + error.message);
  });
};

export { loadCharacter };