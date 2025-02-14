import * as THREE from 'three';
import toast from 'react-hot-toast';

const npcCoordinates = new THREE.Vector3(-3.827592715703327, 0.6999999999999995, -5.437556845461079);
const proximityThreshold = 2;

const investingFacts = [
  "Investing can help you grow your wealth over time.",
  "Diversifying your investments can reduce risk.",
  "Investing in stocks has historically provided higher returns than other asset classes.",
  "Compound interest allows your investments to grow exponentially.",
  "It's important to start investing early to take advantage of compound interest."
];

let currentFactIndex = 0;
const initializeNPCInteraction = () => {
  // Create a modal for the NPC interaction
  const npcModal = document.createElement('div');
  npcModal.id = 'npcModal';
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
      <div id="npcChoices" style="display: flex; justify-content: center; align-items: center;">
        <button id="leftArrow" style="padding: 10px; background-color: transparent; border: none; cursor: pointer;">&#9664;</button>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <button id="yes" style="padding: 10px 20px; margin-bottom: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
          <button id="no" style="padding: 10px 20px; background-color: #C0C0C0; color: black; border: none; border-radius: 5px; cursor: pointer;">No</button>
        </div>
        <button id="rightArrow" style="padding: 10px; background-color: transparent; border: none; cursor: pointer;">&#9654;</button>
      </div>
    </div>
  `;
  document.body.appendChild(npcModal);

  let selectedButton = 'yes';

  const updateSelection = () => {
    document.getElementById('yes').style.backgroundColor = selectedButton === 'yes' ? '#4CAF50' : '#C0C0C0';
    document.getElementById('no').style.backgroundColor = selectedButton === 'no' ? '#4CAF50' : '#C0C0C0';
  };

  document.getElementById('leftArrow').addEventListener('click', () => {
    selectedButton = selectedButton === 'yes' ? 'no' : 'yes';
    updateSelection();
  });

  document.getElementById('rightArrow').addEventListener('click', () => {
    selectedButton = selectedButton === 'yes' ? 'no' : 'yes';
    updateSelection();
  });

  document.getElementById('yes').addEventListener('click', () => {
    if (currentFactIndex < investingFacts.length) {
      toast(investingFacts[currentFactIndex]);
      currentFactIndex++;
    } else {
      toast('Thank you for listening to all the facts!');
      const npcChoices = document.getElementById('npcChoices');
      npcChoices.innerHTML = `
        <button id="thanks" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Thanks for the info!</button>
      `;
      document.getElementById('thanks').addEventListener('click', () => {
        toast('You thanked the NPC for the information.');
        npcModal.style.display = 'none'; // Hide the NPC modal
        currentFactIndex = 0; // Reset the fact index for the next interaction
      });
    }
  });

  document.getElementById('no').addEventListener('click', () => {
    toast('You declined the offer.');
    npcModal.style.display = 'none'; // Hide the NPC modal
    currentFactIndex = 0; // Reset the fact index for the next interaction
  });

  updateSelection(); // Initialize the selection
};

const updateNPCInteractionButton = (characterPosition, interactionButton) => {
  const distanceToNPC = characterPosition.distanceTo(npcCoordinates);

  if (distanceToNPC <= proximityThreshold) {
    interactionButton.innerText = 'Talk to Person';
    interactionButton.style.display = 'block';
    return true;
  }
  return false;
};

const handleNPCInteractionClick = (interactionButton) => {
  if (interactionButton.innerText === 'Talk to Person') {
    toast('Hello, are you interested in investing?');
    document.getElementById('npcModal').style.display = 'block'; // Show the NPC modal
  }
};

const createInteractionButton = () => {
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
  return interactionButton;
};

export { initializeNPCInteraction, updateNPCInteractionButton, handleNPCInteractionClick, createInteractionButton };