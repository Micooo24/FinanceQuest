// utils/proximity.js
import * as THREE from 'three';

// Define the NPC4 position
const npc4Position = new THREE.Vector3(-12.01533346391676, 0.2, 28.505300981009736);

const npc7Position = new THREE.Vector3(-4.565246672190189, 0.5, -21.978682238028398);

const checkProximityToNPC4 = (characterPosition) => {
  const distanceToNPC4 = characterPosition.distanceTo(npc4Position);
  return distanceToNPC4 < 5; // Adjust the distance threshold as needed
};

const checkProximityToNPC7 = (characterPosition) => {
    const distanceToNPC7 = characterPosition.distanceTo(npc7Position);
    return distanceToNPC7 < 5; // Adjust the distance threshold as needed
    }
    
export { checkProximityToNPC4, checkProximityToNPC7 };