import * as THREE from 'three';
import toast from 'react-hot-toast';

const bankCoordinates = new THREE.Vector3(-11.689241930178186, 0.6999999999999995, -4.860459359877381);
const proximityThreshold = 2;

const initializeBankInteraction = () => {
  // Add CSS styles
  const style = document.createElement('style');
  style.innerHTML = `
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic);

    /* Global */
    body {
      font-family: 'Open Sans';
      line-height: 200%;
      background: #d75f70;
    }

    .main {
      width: 800px;
      margin: 160px auto;
      text-align: center;
    }

    h1, h2, h3 {
      color: #fff;
    }

    h1 {
      margin-bottom: 30px;
      font-size: 44px;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 32px;
    }

    h3 {
      font-size: 21px;
    }

    p {
      font-size: 18px;
      color: #ffd5df;
    }

    .btn {
      margin-top: 30px;
      padding: 2.2% 5.5%;
      display: inline-block;
      transition: all linear 0.15s;
      border-radius: 3px;
      background: #fff;
      font-size: 22px;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      color: #333;
    }

    .btn:hover {
      opacity: 0.75;
    }

    /* Popup */
    .popup-wrap {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      top: 0px;
      left: 0px;
      content: '';
      background: rgba(0, 0, 0, 0.85);
    }

    .popup-box {
      width: 400px;
      padding: 70px;
      transform: translate(-50%, -50%) scale(0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
      border-radius: 3px;
      background: #fff;
      text-align: center;
    }

    .popup-box h2 {
      color: #1a1a1a;
    }

    .popup-box h3 {
      color: #888;
    }

    .popup-box .close-btn {
      width: 35px;
      height: 35px;
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      transition: all ease 0.5s;
      border-radius: 1000px;
      background: #d75f70;
      font-weight: bold;
      text-decoration: none;
      color: #fff;
      line-height: 190%;
    }

    .popup-box .close-btn:hover {
      transform: rotate(180deg);
    }

    .transform-in, .transform-out {
      display: block;
      transition: all ease 0.5s;
    }

    .transform-in {
      transform: translate(-50%, -50%) scale(1);
    }

    .transform-out {
      transform: translate(-50%, -50%) scale(0.5);
    }

    /* Bouncing effect */
    @keyframes bounceIn {
      0%, 20%, 50%, 80%, 100% {
        transform: translate(-50%, -50%) scale(0.5);
      }
      40% {
        transform: translate(-50%, -50%) scale(1.2);
      }
      60% {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .bounce-in {
      animation: bounceIn 0.5s ease;
    }
  `;
  document.head.appendChild(style);

  // Create a modal for the bank pop-up
  const bankModal = document.createElement('div');
  bankModal.id = 'bankModal';
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
  bankModal.style.backgroundImage = 'url("https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077519/bank_c0ka8r.jpg")'; // Add a bank interior background image
  bankModal.style.backgroundSize = 'cover';
  bankModal.style.backgroundPosition = 'center';
  bankModal.style.overflow = 'hidden';
  bankModal.classList.add('bank-modal'); // Add a class for animation
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
    bankModal.classList.remove('bounce-in');
    bankModal.classList.add('transform-out');
    setTimeout(() => {
      bankModal.style.display = 'none';
      bankModal.classList.remove('transform-out');
    }, 500); // Match the transition duration
  });
};

const updateBankInteractionButton = (characterPosition, interactionButton) => {
  const distanceToBank = characterPosition.distanceTo(bankCoordinates);

  if (distanceToBank <= proximityThreshold) {
    interactionButton.innerText = 'Go to Bank';
    interactionButton.style.display = 'block';
    return true;
  }
  return false;
};

const handleBankInteractionClick = () => {
  const bankModal = document.getElementById('bankModal');
  bankModal.style.display = 'block'; // Show the bank modal
  bankModal.classList.add('bounce-in'); // Add the bounce-in class for animation

  // Remove the bounce-in class after the animation ends
  bankModal.addEventListener('animationend', () => {
    bankModal.classList.remove('bounce-in');
  }, { once: true });
};

export { initializeBankInteraction, updateBankInteractionButton, handleBankInteractionClick };