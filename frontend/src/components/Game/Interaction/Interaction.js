let isPopupOpen = false;
let currentPopup = null;

const createPopupScreen = (message) => {
  if (isPopupOpen) return;
  
  // Add Font Awesome CDN
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  document.head.appendChild(fontAwesome);
  
  isPopupOpen = true;
  const popup = document.createElement('div');
  currentPopup = popup;
  
  // Base styles remain the same
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%) scale(0)';
  popup.style.width = '900px';
  popup.style.height = '700px';
  popup.style.padding = '20px';
  popup.style.background = '#f5f5f5';
  popup.style.borderRadius = '15px';
  popup.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)';
  popup.style.zIndex = '1000';

  popup.innerHTML = `
  <style>
    .bank-section {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    .bank-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%);
      z-index: 1;
    }
    .bank-section:hover {
      transform: scale(1.08) translateZ(30px);
      box-shadow: 0 0 25px rgba(255,255,255,0.3);
      border-color: rgba(255,255,255,0.5);
      z-index: 2;
      animation: pulse 1.5s infinite;
    }
    .section-info {
      position: absolute;
      background: rgba(0,0,0,0.9);
      color: #fff;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
      opacity: 0;
      transition: all 0.3s;
      pointer-events: none;
      border: 1px solid rgba(255,255,255,0.2);
      backdrop-filter: blur(5px);
      transform: translateY(10px);
    }
    .bank-section:hover .section-info {
      opacity: 1;
      transform: translateY(0);
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 15px rgba(255,255,255,0.2); }
      50% { box-shadow: 0 0 25px rgba(255,255,255,0.4); }
      100% { box-shadow: 0 0 15px rgba(255,255,255,0.2); }
    }
  </style>
  <div style="position:relative; width:100%; height:100%; background:linear-gradient(135deg, #1a1f3c 0%, #2b1b41 100%); border-radius:15px;">
    <!-- Header -->
    <div style="background:linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); color:white; padding:20px; border-radius:15px 15px 0 0; text-align:center;">
      <h2 style="margin:0; font-size:28px;"><i class="fas fa-landmark"></i> Bank Floor Plan</h2>
      <p style="margin:5px 0 0; font-size:16px;">Main Branch</p>
    </div>

    <!-- Floor Plan Container -->
    <div style="position:relative; width:100%; height:calc(100% - 70px); padding:20px; box-sizing:border-box;">
      <div style="position:absolute; top:20px; left:20px; right:20px; bottom:20px; border:3px solid rgba(255,255,255,0.2); border-radius:15px; background:rgba(255,255,255,0.05);">
        
        <!-- Entrance -->
        <div class="bank-section" style="position:absolute; bottom:-3px; left:50%; transform:translateX(-50%); width:120px; height:45px; background:linear-gradient(45deg, #00c6ff, #0072ff); color:white; text-align:center; line-height:45px; font-weight:bold; border-radius:10px 10px 0 0;">
          <i class="fas fa-door-open"></i> ENTRANCE
          <div class="section-info">⚡ Main Entrance</div>
        </div>

        <!-- Security Desk -->
        <div class="bank-section" style="position:absolute; bottom:60px; left:50%; transform:translateX(-50%); width:90px; height:90px; background:linear-gradient(45deg, #ff512f, #dd2476); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">
          <i class="fas fa-shield-alt fa-2x"></i>
          <div class="section-info">🛡️ Security Checkpoint</div>
        </div>

        <!-- Waiting Area -->
        <div class="bank-section" style="position:absolute; bottom:160px; left:50%; transform:translateX(-50%); width:320px; height:130px; background:linear-gradient(45deg, #4facfe, #00f2fe); border-radius:15px; padding:15px;">
          <div style="font-weight:bold; color:white;"><i class="fas fa-chair"></i> WAITING AREA</div>
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; padding:10px;">
            ${Array(8).fill('<div style="background:rgba(255,255,255,0.2); height:25px; border-radius:5px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-chair" style="color:white; font-size:14px;"></i></div>').join('')}
          </div>
          <div class="section-info">🪑 Waiting Zone</div>
        </div>

        <!-- Teller Counters -->
        <div class="bank-section" style="position:absolute; top:80px; left:50%; transform:translateX(-50%); width:500px; background:linear-gradient(45deg, #11998e, #38ef7d); padding:20px; border-radius:15px; display:flex; justify-content:space-around;">
          ${Array(5).fill('<div style="background:rgba(255,255,255,0.2); width:80px; height:40px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white;"><i class="fas fa-user"></i></div>').join('')}
          <div class="section-info">💼 Teller Services</div>
        </div>

        <!-- ATM Gallery -->
        <div class="bank-section" style="position:absolute; top:50%; right:40px; transform:translateY(-50%); width:100px; background:linear-gradient(45deg, #b24592, #f15f79); padding:15px; border-radius:15px; color:white;">
          <div style="text-align:center; font-weight:bold; margin-bottom:10px;"><i class="fas fa-credit-card"></i> ATM</div>
          ${Array(3).fill('<div style="background:rgba(255,255,255,0.2); height:30px; margin:5px 0; border-radius:5px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-credit-card" style="color:white;"></i></div>').join('')}
          <div class="section-info">💳 24/7 ATM Services</div>
        </div>

        <!-- Consultation Rooms -->
        <div class="bank-section" style="position:absolute; top:50%; left:40px; transform:translateY(-50%); width:120px;">
          ${Array(3).fill('<div style="background:linear-gradient(45deg, #6441a5, #2a0845); color:white; padding:15px; margin:10px 0; border-radius:8px; text-align:center;"><i class="fas fa-users"></i> Room</div>').join('')}
          <div class="section-info">🤝 Private Consultation</div>
        </div>

        <!-- Vault Area -->
        <div class="bank-section" style="position:absolute; top:40px; right:40px; width:120px; height:120px; background:linear-gradient(45deg, #f85032, #e73827); border-radius:15px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; text-align:center; flex-direction:column;">
          <i class="fas fa-vault fa-2x"></i>
          <div style="margin-top:8px;">VAULT</div>
          <div class="section-info">🔒 Secure Vault (Restricted)</div>
        </div>

        <!-- Customer Service -->
        <div class="bank-section" style="position:absolute; top:40px; left:40px; width:120px; height:80px; background:linear-gradient(45deg, #FF8008, #FFC837); border-radius:15px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; text-align:center; flex-direction:column;">
          <i class="fas fa-headset fa-2x"></i>
          <div style="margin-top:8px;">Service</div>
          <div class="section-info">🎧 Customer Support</div>
        </div>
      </div>
    </div>
  </div>
`;
  // Close button and event handlers remain the same
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '<i class="fa-solid fa-times"></i>';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '15px';
  closeButton.style.right = '15px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.fontSize = '24px';
  closeButton.style.color = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.style.zIndex = '1001';

  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);

  const handleClose = () => {
    isPopupOpen = false;
    popup.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => {
      if (currentPopup === popup) {
        document.body.removeChild(popup);
        currentPopup = null;
      }
    }, 300);
  };

  closeButton.addEventListener('click', handleClose);
};

export { createPopupScreen, isPopupOpen, currentPopup };