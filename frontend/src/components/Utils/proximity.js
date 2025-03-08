// utils/proximity.js
import * as THREE from 'three';

// Define the NPC4 position
const npc4Position = new THREE.Vector3(-12.01533346391676, 0.2, 28.505300981009736);

const npc7Position = new THREE.Vector3(-4.565246672190189, 0.5, -21.978682238028398);

const npcPosition = new  THREE.Vector3(-14.046558652575328, 0.2, -6.1948453448203065);

const npc6Position = new THREE.Vector3(-7.764510595057404, 0.2, 8.341813689568157);

const fast_foodPosition = new THREE.Vector3(-21.189163987877485, 0.5, -4.928802163568273);


const coffee_shopPosition = new THREE.Vector3(8.5836958462589, 0.5, 11.187607315187366);

const checkProximityToNPC4 = (characterPosition) => {
  const distanceToNPC4 = characterPosition.distanceTo(npc4Position);
  return distanceToNPC4 < 5; // Adjust the distance threshold as needed
};

const checkProximityToNPC7 = (characterPosition) => {
    const distanceToNPC7 = characterPosition.distanceTo(npc7Position);  
    return distanceToNPC7 < 5; // Adjust the distance threshold as needed
    }

const checkProximityToNPC = (characterPosition) => {
  const distanceToNPC = characterPosition.distanceTo(npcPosition);
  return distanceToNPC < 5; // Adjust the distance threshold as needed
};

const checkProximityToNPC6 = (characterPosition) => {
  const distanceToNPC6 = characterPosition.distanceTo(npc6Position);
  return distanceToNPC6 < 5; // Adjust the distance threshold as needed
};

const checkProximitytoFastFood = (characterPosition) => {
  const distanceToFastFood = characterPosition.distanceTo(fast_foodPosition);
  return distanceToFastFood < 5;
};

const checkProximitytoCoffeeShop = (characterPosition) => {
  const distanceToCoffeeShop = characterPosition.distanceTo(coffee_shopPosition);
  return distanceToCoffeeShop < 5;
}


    
export { checkProximityToNPC4, checkProximityToNPC7, checkProximityToNPC, checkProximityToNPC6, checkProximitytoFastFood, checkProximitytoCoffeeShop };