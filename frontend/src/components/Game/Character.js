import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import toast from 'react-hot-toast';

const idlePath = require('../../assets/game/Idle.fbx');
const walkPath = require('../../assets/game/Walking.fbx');
const jumpPath = require('../../assets/game/Jumping.fbx');

// Coordinates for the bank and NPC
const bankCoordinates = new THREE.Vector3(-8.084952974061496, 0.6999999999999995, -6.289548765549087);
const npcCoordinates = new THREE.Vector3(-6.571751181307473, 0.5, -5.713296781757897);

// Proximity threshold (e.g., 2 units)
const proximityThreshold = 2;

const loadCharacter = (vehicleLayer, onLoad, camera) => {
  const fbxLoader = new FBXLoader();
  let character, mixer, idleAction, walkAction, jumpAction;
  const clock = new THREE.Clock();

  // Rotate the camera 180 degrees around the Y-axis
  camera.rotation.y = Math.PI;

  // Create a button for interaction
  const interactionButton = document.createElement('button');
  interactionButton.style.position = 'absolute';
  interactionButton.style.bottom = '20px';
  interactionButton.style.left = '50%';
  interactionButton.style.transform = 'translateX(-50%)';
  interactionButton.style.padding = '20px 40px'; // Increased padding for larger button
  interactionButton.style.fontSize = '20px'; // Increased font size
  interactionButton.style.backgroundColor = '#4CAF50';
  interactionButton.style.color = 'white';
  interactionButton.style.border = 'none';
  interactionButton.style.borderRadius = '5px';
  interactionButton.style.cursor = 'pointer';
  interactionButton.style.display = 'none'; // Initially hidden
  interactionButton.innerText = 'Talk to Person';
  document.body.appendChild(interactionButton);

  // Function to calculate distance between two points
  const calculateDistance = (position1, position2) => {
    return position1.distanceTo(position2);
  };

  // Function to show/hide the button based on proximity
  const updateInteractionButton = (characterPosition) => {
    const distanceToNPC = calculateDistance(characterPosition, npcCoordinates);
    const distanceToBank = calculateDistance(characterPosition, bankCoordinates);

    if (distanceToNPC <= proximityThreshold) {
      interactionButton.innerText = 'Talk to Person';
      interactionButton.style.display = 'block';
    } else if (distanceToBank <= proximityThreshold) {
      interactionButton.innerText = 'Go to Bank';
      interactionButton.style.display = 'block';
    } else {
      interactionButton.style.display = 'none';
    }
  };

  // Event listeners for button clicks
  interactionButton.addEventListener('click', () => {
    if (interactionButton.innerText === 'Talk to Person') {
      toast('You are talking to the NPC!');
    } else if (interactionButton.innerText === 'Go to Bank') {
      toast('You are going to the bank!');
    }
  });

  fbxLoader.load(idlePath, (fbx) => {
    character = fbx;
    character.scale.set(1, 1, 1);
    character.rotation.y = Math.PI;
    character.position.set(-6.599999726980053, 0.5, 32.054316962328315);
    vehicleLayer.add(character);

    // Log the character's initial rotation
    console.log('Character initial rotation:', character.rotation);

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
      walkAction.setLoop(THREE.LoopRepeat);
      walkAction.setDuration(1.0);
      walkAction.setEffectiveTimeScale(1.0);
      walkAction.setEffectiveWeight(1);
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
    const targetPosition = new THREE.Vector3(-6.599999726980053, 0.7, 32.054316962328315);
    const targetRotation = new THREE.Euler();

    const handleKeyDown = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
          targetPosition.z += moveSpeed * Math.cos(character.rotation.y);
          targetPosition.x += moveSpeed * Math.sin(character.rotation.y);
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
            idleAction.fadeOut(0.2);
            walkAction.reset().fadeIn(0.2).play();
          }
          walkAction.setEffectiveTimeScale(1.0);
          break;
        case 's':
          targetPosition.z -= moveSpeed * Math.cos(character.rotation.y);
          targetPosition.x -= moveSpeed * Math.sin(character.rotation.y);
          if (walkAction && !walkAction.isRunning()) {
            console.log('Starting walk animation');
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
      console.log(`Character position: ${character.position.x}, ${character.position.y}, ${character.position.z}`);
    };

    // Handle key up events
    const handleKeyUp = (event) => {
      if (!character) return;
      switch (event.key) {
        case 'w':
        case 's':
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