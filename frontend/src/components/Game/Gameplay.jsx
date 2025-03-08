// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import axios from 'axios';
// import { loadCharacter } from './Character';
// import Map from './Map';
// import Menu from './Menu';
// import Stats from './Stats';
// import Mission from './Mission';
// import { onPointerMove, onMouseClick } from './Interaction/helper';
// import StatsJS from 'stats.js';
// import Quest1 from '../Quest/Quest1/Quest1';
// import SideQuest1 from '../Quest/SideQuest/SideQuest1';
// import Modal6RentDecision from '../Quest/Quest1/Modal6';
// // import { toggleSystemNarrationModal } from './Interaction/NPC4Interaction';  

// // MUI Imports
// import { Box, Button, Typography } from '@mui/material';
// import { motion } from 'framer-motion';

// // Debug mode
// let debugMode = false;

// const Gameplay = () => {
//   const mountRef = useRef(null);
//   const rendererRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [popupContent, setPopupContent] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);
//   // const [quest1Completed, setQuest1Completed] = useState(false); // Commented out
//   const [playerStats, setPlayerStats] = useState(null);
//   const [showRentDecisionModal, setShowRentDecisionModal] = useState(false);
//   const [characterPosition, setCharacterPosition] = useState(new THREE.Vector3());

//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//   // Layers
//   const roadLayer = new THREE.Group();
//   const buildingLayer = new THREE.Group();
//   const vehicleLayer = new THREE.Group();

//   const fetchPlayerStats = async () => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       setPlayerStats(response.data);
//     } catch (error) {
//       console.error('Error fetching player stats:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPlayerStats();
//   }, []);

//   const initializeScene = () => {
//     if (!mountRef.current || rendererRef.current) return;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 7.5);
//     scene.add(directionalLight);
//     scene.add(new THREE.AmbientLight(0xffffff, 0.5));

//     const stats = new StatsJS();
//     stats.showPanel(0);
//     document.body.appendChild(stats.dom);

//     let animationId;
//     const initialPosition = new THREE.Vector3(playerStats.location.x, playerStats.location.y, playerStats.location.z);
//     loadCharacter(vehicleLayer, (character, mixer) => {
//       camera.rotation.y = Math.PI;
//       camera.position.set(0, 2, -5);
//       camera.lookAt(0, 0, 0);

//       const animate = () => {
//         stats.begin();
//         animationId = requestAnimationFrame(animate);
//         if (mixer) mixer.update(0.01);
//         if (character) {
//           setCharacterPosition(character.position);
//           const offset = new THREE.Vector3(0, 2, -5);
//           camera.position.lerp(offset.applyMatrix4(character.matrixWorld), 0.05);
//           camera.lookAt(character.position);
//         }
//         renderer.render(scene, camera);
//         stats.end();
//       };
//       animate();
//     }, camera, initialPosition);

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     scene.add(roadLayer, buildingLayer, vehicleLayer);
//     window.addEventListener('pointermove', onPointerMove);
//     window.addEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('pointermove', onPointerMove);
//       window.removeEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));
//       if (animationId) cancelAnimationFrame(animationId);
//       if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
//       renderer.dispose();
//       document.body.removeChild(stats.dom);
//     };
//   };

//   useEffect(() => {
//     if (gameStarted && playerStats) {
//       initializeScene();
//     }
//   }, [gameStarted, playerStats]);

//   const handleBuildingClick = (buildingName) => setPopupContent(buildingName);
//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const startGame = () => setGameStarted(true);

//   const handleRentDecision = (choice) => {
//     setShowRentDecisionModal(false);
//   };

//   // Cloud Animation Data
//   const clouds = [
//     { id: 1, speed: 15, size: '10vw', top: '1%' },
//     { id: 2, speed: 20, size: '12vw', top: '20%' },
//     { id: 3, speed: 27, size: '8vw', top: '10%' },
//     { id: 4, speed: 13, size: '13vw', top: '15%' },
//     { id: 5, speed: 25, size: '15vw', top: '5%' },
//   ];

//   return (
//     <Box
//       ref={mountRef}
//       sx={{
//         margin: 0,
//         padding: 0,
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden',
//         backgroundImage: 'url("https://res.cloudinary.com/dwp8u82sd/image/upload/v1739112641/1_wkftfu.png")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//       }}
//     >
//       {!gameStarted && (
//         <Box
//           sx={{
//             mt: 5,
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             textAlign: 'center',
//             fontFamily: "'Oi', serif",
//             color: '#000000',
//           }}
//         >
//           {clouds.map((cloud) => (
//             <motion.img
//               key={cloud.id}
//               src="/assets/cloudim.png"
//               alt={`Cloud ${cloud.id}`}
//               style={{
//                 position: 'absolute',
//                 top: cloud.top,
//                 left: '100%',
//                 width: cloud.size,
//                 zIndex: -1,
//               }}
//               animate={{ x: ['100vw', '-100vw'] }}
//               transition={{ repeat: Infinity, duration: cloud.speed, ease: 'easeInOut' }}
//             />
//           ))}

//           <Typography variant="h2" color="rgba(94, 2, 94, 0.9)" sx={{ mb: 2, fontSize: 100 , fontFamily: "'Oi', serif",}}>
//             FINANCE QUEST
//           </Typography>
//           <Button variant="h6" sx={{ mt: 2, fontFamily: "'Fraunces', serif" }} onClick={startGame}>
//             Begin Adventure
//           </Button>
//         </Box>
//       )}

//       {gameStarted && playerStats && (
//         <>
//           {!playerStats.q1_done && (
//             <>
//               <Quest1 onComplete={() => setPlayerStats((prevStats) => ({ ...prevStats, q1_done: true }))} setPlayerStats={setPlayerStats} characterPosition={characterPosition} />
//               {showRentDecisionModal && (
//                 <Modal6RentDecision onSelectChoice={handleRentDecision} setPlayerStats={setPlayerStats} />
//               )}
//             </>
//           )}
//           {playerStats.q1_done && !playerStats.sq1_done && (
//             <SideQuest1 setPlayerStats={setPlayerStats} characterPosition={characterPosition} />
//           )}

//           <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
//             <Stats health={playerStats.health} exp={playerStats.experience} level={playerStats.level} money={playerStats.money} />
//           </Box>

//           <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
//             <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
//           </Box>
          
//           <Map scene={scene} camera={camera} />

//           {popupContent && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: 200,
//                 backgroundColor: 'white',
//                 padding: '20px',
//                 border: '1px solid black',
//                 textAlign: 'center',
//               }}
//             >
//               <Typography variant="h5">{popupContent}</Typography>
//               <Button onClick={() => setPopupContent(null)}>Close</Button>
//             </Box>
//           )}
//         </>
//       )}
//     </Box>
//   );  
// };

// export default Gameplay;

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import { loadCharacter } from './Character';
import Map from './Map';
import Menu from './Menu';
import Stats from './Stats';
import Mission from './Mission';
import { onPointerMove, onMouseClick } from './Interaction/helper';
import StatsJS from 'stats.js';
import Quest1 from '../Quest/Quest1/Quest1';
import Quest2 from '../Quest/Quest2/Quest2';
import Quest3 from '../Quest/Quest3/Quest3';
import SideQuest1 from '../Quest/SideQuest/SideQuest1';
import Modal6RentDecision from '../Quest/Quest1/Modal6';
import FinancialTips from "./FinancialTips";
// import { toggleSystemNarrationModal } from './Interaction/NPC4Interaction';  

// MUI Imports
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Debug mode
let debugMode = false;

const Gameplay = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  // const [quest1Completed, setQuest1Completed] = useState(false); // Commented out
  const [playerStats, setPlayerStats] = useState(null);
  const [showRentDecisionModal, setShowRentDecisionModal] = useState(false);
  const [characterPosition, setCharacterPosition] = useState(new THREE.Vector3());
  

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Layers
  const roadLayer = new THREE.Group();
  const buildingLayer = new THREE.Group();
  const vehicleLayer = new THREE.Group();

  const fetchPlayerStats = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPlayerStats(response.data);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      fetchPlayerStats();
    }
  }, [gameStarted]);

  const initializeScene = () => {
    if (!mountRef.current || rendererRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const stats = new StatsJS();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    let animationId;
    const initialPosition = new THREE.Vector3(playerStats.location.x, playerStats.location.y, playerStats.location.z);
    loadCharacter(vehicleLayer, (character, mixer) => {
      camera.rotation.y = Math.PI;
      camera.position.set(0, 2, -5);
      camera.lookAt(0, 0, 0);

      const animate = () => {
        stats.begin();
        animationId = requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01);
        if (character) {
          setCharacterPosition(character.position);
          const offset = new THREE.Vector3(0, 2, -5);
          camera.position.lerp(offset.applyMatrix4(character.matrixWorld), 0.05);
          camera.lookAt(character.position);
        }
        renderer.render(scene, camera);
        stats.end();
      };
      animate();
    }, camera, initialPosition);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    scene.add(roadLayer, buildingLayer, vehicleLayer);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      document.body.removeChild(stats.dom);
    };
  };

  useEffect(() => {
    if (gameStarted && playerStats) {
      initializeScene();
    }
  }, [gameStarted, playerStats]);

  const handleBuildingClick = (buildingName) => setPopupContent(buildingName);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const startGame = () => setGameStarted(true);

  const handleRentDecision = (choice) => {
    setShowRentDecisionModal(false);
  };

  // Cloud Animation Data
  const clouds = [
    { id: 1, speed: 15, size: '10vw', top: '1%' },
    { id: 2, speed: 20, size: '12vw', top: '20%' },
    { id: 3, speed: 27, size: '8vw', top: '10%' },
    { id: 4, speed: 13, size: '13vw', top: '15%' },
    { id: 5, speed: 25, size: '15vw', top: '5%' },
  ];  

  return (

    
    <Box
      ref={mountRef}
      sx={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url("https://res.cloudinary.com/dwp8u82sd/image/upload/v1739112641/1_wkftfu.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {!gameStarted && (
        <Box
          sx={{
            mt: 5,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            fontFamily: "'Oi', serif",
            color: '#000000',
          }}
        >
          {clouds.map((cloud) => (
            <motion.img
              key={cloud.id}
              src="/assets/cloudim.png"
              alt={`Cloud ${cloud.id}`}
              style={{
                position: 'absolute',
                top: cloud.top,
                left: '100%',
                width: cloud.size,
                zIndex: -1,
              }}
              animate={{ x: ['100vw', '-100vw'] }}
              transition={{ repeat: Infinity, duration: cloud.speed, ease: 'easeInOut' }}
            />
          ))}

          <Typography variant="h2" color="rgba(94, 2, 94, 0.9)" sx={{ mb: 2, fontSize: 100 , fontFamily: "'Oi', serif",}}>
            FINANCE QUEST
          </Typography>
          <Button variant="h6" sx={{ mt: 2, mb: 5 ,fontFamily: "'Fraunces', serif", color: "#000" }} onClick={startGame}>
            Start Quest
          </Button>

          <FinancialTips />
        </Box>
      )}

      {gameStarted && playerStats && (
        <>
          {!playerStats.q1_done && (
            <>
              <Quest1 
                  onComplete={() => {
                    setPlayerStats((prevStats) => ({ ...prevStats, q1_done: true }));
                    fetchPlayerStats(); // Fetch player stats when quest 1 is completed
                  }} 
                  setPlayerStats={setPlayerStats} 
                  characterPosition={characterPosition} 
                  fetchPlayerStats={fetchPlayerStats} // Pass the fetchPlayerStats function
                />
            </>
          )}

          {playerStats.q1_done && !playerStats.sq1_done && (
            <>
            <SideQuest1 
              setPlayerStats={setPlayerStats} 
              characterPosition={characterPosition} 
              fetchPlayerStats={fetchPlayerStats}
              // Optional: Uncomment if using local state tracking
              // onComplete={() => setSideQuestCompleted(true)}
            />
            </>
          )}
          {playerStats.sq1_done && !playerStats.q2_done && (
            <>
              <Quest2 
                onComplete={() => setPlayerStats((prevStats) => ({ ...prevStats, q2_done: true }))}
                setPlayerStats={setPlayerStats}
                characterPosition={characterPosition} 
                fetchPlayerStats={fetchPlayerStats}
              />
            </>
          )}
          {playerStats.q2_done && !playerStats.q3_done && (
            <>
              <Quest3 
                onComplete={() => setPlayerStats((prevStats) => ({ ...prevStats, q3_done: true }))}
                setPlayerStats={setPlayerStats}
                characterPosition={characterPosition} 
                fetchPlayerStats={fetchPlayerStats}
              />
              </>
            )}


          <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
            <Stats pts={playerStats.points} money={playerStats.money} />
          </Box>

          <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
          </Box>
          
          <Map scene={scene} camera={camera} />

          {popupContent && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 200,
                backgroundColor: 'white',
                padding: '20px',
                border: '1px solid black',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5">{popupContent}</Typography>
              <Button onClick={() => setPopupContent(null)}>Close</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );  
};

export default Gameplay;


// import React, { useEffect, useRef, useState, useContext } from 'react';
// import * as THREE from 'three';
// import axios from 'axios';
// import { loadCharacter } from './Character';
// import Map from './Map';
// import Menu from './Menu';
// import Stats from './Stats';
// import Mission from './Mission';
// import { onPointerMove, onMouseClick } from './Interaction/helper';
// import StatsJS from 'stats.js';
// import Quest1 from '../Quest/Quest1/Quest1';
// import Quest2 from '../Quest/Quest2/Quest2';
// import SideQuest1 from '../Quest/SideQuest/SideQuest1';
// import Modal6RentDecision from '../Quest/Quest1/Modal6';
// import {GameContext} from "./Context/GameContext"
// // import { toggleSystemNarrationModal } from './Interaction/NPC4Interaction';  

// // MUI Imports
// import { Box, Button, Typography } from '@mui/material';
// import { motion } from 'framer-motion';

// const Gameplay = () => {
//   const { playerStats, setPlayerStats, characterPosition, setCharacterPosition } = useContext(GameContext);
//   const mountRef = useRef(null);
//   const rendererRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [popupContent, setPopupContent] = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [showRentDecisionModal, setShowRentDecisionModal] = useState(false);

//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//   // Layers
//   const roadLayer = new THREE.Group();
//   const buildingLayer = new THREE.Group();
//   const vehicleLayer = new THREE.Group();

//   const initializeScene = () => {
//     if (!mountRef.current || rendererRef.current) return;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 7.5);
//     scene.add(directionalLight);
//     scene.add(new THREE.AmbientLight(0xffffff, 0.5));

//     const stats = new StatsJS();
//     stats.showPanel(0);
//     document.body.appendChild(stats.dom);

//     let animationId;
//     const initialPosition = new THREE.Vector3(playerStats.location.x, playerStats.location.y, playerStats.location.z);
//     loadCharacter(vehicleLayer, (character, mixer) => {
//       camera.rotation.y = Math.PI;
//       camera.position.set(0, 2, -5);
//       camera.lookAt(0, 0, 0);

//       const animate = () => {
//         stats.begin();
//         animationId = requestAnimationFrame(animate);
//         if (mixer) mixer.update(0.01);
//         if (character) {
//           setCharacterPosition(character.position);
//           const offset = new THREE.Vector3(0, 2, -5);
//           camera.position.lerp(offset.applyMatrix4(character.matrixWorld), 0.05);
//           camera.lookAt(character.position);
//         }
//         renderer.render(scene, camera);
//         stats.end();
//       };
//       animate();
//     }, camera, initialPosition);

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     scene.add(roadLayer, buildingLayer, vehicleLayer);
//     window.addEventListener('pointermove', onPointerMove);
//     window.addEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('pointermove', onPointerMove);
//       window.removeEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));
//       if (animationId) cancelAnimationFrame(animationId);
//       if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
//       renderer.dispose();
//       document.body.removeChild(stats.dom);
//     };
//   };

//   useEffect(() => {
//     if (gameStarted && playerStats) {
//       initializeScene();
//     }
//   }, [gameStarted, playerStats]);

//   const handleBuildingClick = (buildingName) => setPopupContent(buildingName);
//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const startGame = () => setGameStarted(true);

//   const handleRentDecision = (choice) => {
//     setShowRentDecisionModal(false);
//   };

//   // Cloud Animation Data
//   const clouds = [
//     { id: 1, speed: 15, size: '10vw', top: '1%' },
//     { id: 2, speed: 20, size: '12vw', top: '20%' },
//     { id: 3, speed: 27, size: '8vw', top: '10%' },
//     { id: 4, speed: 13, size: '13vw', top: '15%' },
//     { id: 5, speed: 25, size: '15vw', top: '5%' },
//   ];

//   return (
//     <Box
//       ref={mountRef}
//       sx={{
//         margin: 0,
//         padding: 0,
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden',
//         backgroundImage: 'url("https://res.cloudinary.com/dwp8u82sd/image/upload/v1739112641/1_wkftfu.png")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//       }}
//     >
//       {!gameStarted && (
//         <Box
//           sx={{
//             mt: 5,
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             textAlign: 'center',
//             fontFamily: "'Oi', serif",
//             color: '#000000',
//           }}
//         >
//           {clouds.map((cloud) => (
//             <motion.img
//               key={cloud.id}
//               src="/assets/cloudim.png"
//               alt={`Cloud ${cloud.id}`}
//               style={{
//                 position: 'absolute',
//                 top: cloud.top,
//                 left: '100%',
//                 width: cloud.size,
//                 zIndex: -1,
//               }}
//               animate={{ x: ['100vw', '-100vw'] }}
//               transition={{ repeat: Infinity, duration: cloud.speed, ease: 'easeInOut' }}
//             />
//           ))}

//           <Typography variant="h2" color="rgba(94, 2, 94, 0.9)" sx={{ mb: 2, fontSize: 100 , fontFamily: "'Oi', serif",}}>
//             FINANCE QUEST
//           </Typography>
//           <Button variant="h6" sx={{ mt: 2, fontFamily: "'Fraunces', serif" }} onClick={startGame}>
//             Begin Adventure
//           </Button>
//         </Box>
//       )}

//       {gameStarted && playerStats && (
//         <>
//           {!playerStats.q1_done && (
//             <>
//               <Quest1 onComplete={() => setPlayerStats((prevStats) => ({ ...prevStats, q1_done: true }))} setPlayerStats={setPlayerStats} characterPosition={characterPosition} />
//               {showRentDecisionModal && (
//                 <Modal6RentDecision onSelectChoice={handleRentDecision} setPlayerStats={setPlayerStats} />
//               )}
//             </>
//           )}

//           {playerStats.q1_done && !playerStats.sq1_done && (
//             <>
//             <SideQuest1 
//               setPlayerStats={setPlayerStats} 
//               characterPosition={characterPosition} 
//               // Optional: Uncomment if using local state tracking
//               // onComplete={() => setSideQuestCompleted(true)}
//             />
//             </>
//           )}
//           {playerStats.sq1_done && !playerStats.q2_done && (
//                 <>
//                   <Quest2 
//                     setPlayerStats={setPlayerStats}
//                     characterPosition={characterPosition} 
//                   />
//                 </>
//               )}

//           <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
//             <Stats health={playerStats.health} pts={playerStats.points} level={playerStats.level} money={playerStats.money} />
//           </Box>

//           <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
//             <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
//           </Box>
          
//           <Map scene={scene} camera={camera} />

//           {popupContent && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: 200,
//                 backgroundColor: 'white',
//                 padding: '20px',
//                 border: '1px solid black',
//                 textAlign: 'center',
//               }}
//             >
//               <Typography variant="h5">{popupContent}</Typography>
//               <Button onClick={() => setPopupContent(null)}>Close</Button>
//             </Box>
//           )}
//         </>
//       )}
//     </Box>
//   );  
// };

// export default Gameplay;