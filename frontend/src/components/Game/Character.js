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
  interactionButton.style.padding = '30px 60px'; // Increased padding for larger button
  interactionButton.style.fontSize = '25px'; // Increased font size
  interactionButton.style.backgroundColor = '#4CAF50';
  interactionButton.style.color = 'white';
  interactionButton.style.border = 'none';
  interactionButton.style.borderRadius = '5px';
  interactionButton.style.cursor = 'pointer';
  interactionButton.style.display = 'none'; // Initially hidden
  interactionButton.innerText = 'Talk to Person';
  document.body.appendChild(interactionButton);

  // Create a modal for the bank pop-up
  const bankModal = document.createElement('div');
  bankModal.style.position = 'fixed';
  bankModal.style.top = '50%';
  bankModal.style.left = '50%';
  bankModal.style.transform = 'translate(-50%, -50%)';
  bankModal.style.width = '600px'; // Set a fixed width
  bankModal.style.height = '400px'; // Set a fixed height
  bankModal.style.backgroundColor = '#FFFFFF';
  bankModal.style.borderRadius = '10px';
  bankModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  bankModal.style.zIndex = '1000';
  bankModal.style.display = 'none'; // Initially hidden
  bankModal.style.backgroundImage = 'url("https://example.com/bank-interior.jpg")'; // Add a bank interior background image
  bankModal.style.backgroundSize = 'cover';
  bankModal.style.backgroundPosition = 'center';
  bankModal.style.overflow = 'hidden';
  bankModal.innerHTML = `
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6);"></div>
    <div style="position: relative; z-index: 1; text-align: center; padding: 20px;">
      <h2 style="color: #FFD700; font-size: 30px; margin-bottom: 20px;">Welcome to the Bank</h2>
      <div style="display: flex; flex-direction: column; gap: 15px;">
        <button id="deposit" style="padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: 2px solid #FFD700; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
          Deposit
        </button>
        <button id="withdraw" style="padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: 2px solid #FFD700; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
          Withdraw
        </button>
        <button id="checkBalance" style="padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: 2px solid #FFD700; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
          Check Balance
        </button>
        <button id="closeBankModal" style="padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
          Exit Bank
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(bankModal);

  // Create a modal for the NPC interaction
  const npcModal = document.createElement('div');
  npcModal.style.position = 'fixed';
  npcModal.style.top = '50%';
  npcModal.style.left = '50%';
  npcModal.style.transform = 'translate(-50%, -50%)';
  npcModal.style.width = '400px';
  npcModal.style.height = '200px';
  npcModal.style.backgroundColor = '#FFFFFF';
  npcModal.style.borderRadius = '10px';
  npcModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  npcModal.style.zIndex = '1000';
  npcModal.style.display = 'none'; // Initially hidden
  npcModal.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2 id="npcMessage" style="margin-bottom: 20px;">How are you doing?</h2>
      <div id="npcChoices">
        <button id="okay" style="padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">I'm okay</button>
        <button id="ignore" style="padding: 10px 20px; background-color: #C0C0C0; color: black; border: none; border-radius: 5px; cursor: pointer;">Ignore</button>
      </div>
    </div>
  `;
  document.body.appendChild(npcModal);

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
      toast('How are you?');
      npcModal.style.display = 'block'; // Show the NPC modal
    } else if (interactionButton.innerText === 'Go to Bank') {
      bankModal.style.display = 'block'; // Show the bank modal
    }
  });

  // Event listeners for NPC modal buttons
  npcModal.querySelector('#okay').addEventListener('click', () => {
    toast('You responded: I\'m okay');
    npcModal.style.display = 'none'; // Hide the NPC modal
  });

  npcModal.querySelector('#ignore').addEventListener('click', () => {
    toast('You ignored the NPC');
    npcModal.style.display = 'none'; // Hide the NPC modal
  });

  // Event listeners for bank modal buttons
  bankModal.querySelector('#deposit').addEventListener('click', () => {
    toast('Deposit selected!');
    // Add deposit logic here
  });

  bankModal.querySelector('#withdraw').addEventListener('click', () => {
    toast('Withdraw selected!');
    // Add withdraw logic here
  });

  bankModal.querySelector('#checkBalance').addEventListener('click', () => {
    toast('Check Balance selected!');
    // Add check balance logic here
  });

  bankModal.querySelector('#closeBankModal').addEventListener('click', () => {
    bankModal.style.display = 'none'; // Hide the bank modal
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
      document.body.removeChild(bankModal); // Remove the bank modal on cleanup
      document.body.removeChild(npcModal); // Remove the NPC modal on cleanup
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