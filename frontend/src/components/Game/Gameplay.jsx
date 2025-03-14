// import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
// import Quest3 from '../Quest/Quest3/Quest3';
// import SideQuest1 from '../Quest/SideQuest/SideQuest1';
// import Modal6RentDecision from '../Quest/Quest1/Modal6';
// import FinancialTips from "./FinancialTips";
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { debounce } from 'lodash';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IconButton } from '@mui/material';

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
//   const [playerStats, setPlayerStats] = useState(null);
//   const [showRentDecisionModal, setShowRentDecisionModal] = useState(false);
//   const [characterPosition, setCharacterPosition] = useState(new THREE.Vector3());
//   const [awardedMedals, setAwardedMedals] = useState([]);
//   const navigate = useNavigate();

//   const scene = useMemo(() => new THREE.Scene(), []);
//   const camera = useMemo(() => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000), []);

//   // Layers
//   const roadLayer = useMemo(() => new THREE.Group(), []);
//   const buildingLayer = useMemo(() => new THREE.Group(), []);
//   const vehicleLayer = useMemo(() => new THREE.Group(), []);

//   const fetchPlayerStats = useCallback(async () => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       setPlayerStats(response.data);
//       setAwardedMedals(response.data.medals || []);
//     } catch (error) {
//       console.error('Error fetching player stats:', error);
//     }
//   }, []);

//   const checkAndAwardMedals = useCallback(debounce(async () => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       const response = await axios.put('http://127.0.0.1:8000/stats/check-and-award-medals', {}, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       const newMedals = response.data.medals.filter(medal => !awardedMedals.includes(medal));
//       newMedals.forEach((medal) => {
//         toast.success(`Congratulations! You have been awarded the ${medal.replace('_', ' ').toUpperCase()} medal!`);
//       });
//       setAwardedMedals(response.data.medals);
//       setPlayerStats((prevStats) => ({
//         ...prevStats,
//         medals: response.data.medals,
//       }));
//     } catch (error) {
//       console.error('Error checking and awarding medals:', error);
//     }
//   }, 3000), [awardedMedals]);

//   useEffect(() => {
//     if (gameStarted) {
//       fetchPlayerStats();
//     }
//   }, [gameStarted, fetchPlayerStats]);

//   useEffect(() => {
//     if (gameStarted && playerStats) {
//       initializeScene();
//       checkAndAwardMedals();
//     }
//   }, [gameStarted, playerStats, checkAndAwardMedals]);

//   const initializeScene = useCallback(() => {
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
//   }, [scene, camera, roadLayer, buildingLayer, vehicleLayer, playerStats]);

//   const handleBuildingClick = useCallback((buildingName) => setPopupContent(buildingName), []);
//   const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
//   const startGame = useCallback(() => setGameStarted(true), []);

//   const handleRentDecision = useCallback((choice) => {
//     setShowRentDecisionModal(false);
//   }, []);

//   const updateGameplayDone = useCallback(async () => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       await axios.put('http://127.0.0.1:8000/stats/update/gameplay_done', {}, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log('Gameplay status updated successfully');
//     } catch (error) {
//       console.error('Error updating gameplay status:', error);
//     }
//   }, []);

//   // Cloud Animation Data
//   const clouds = useMemo(() => [
//     { id: 1, speed: 15, size: '10vw', top: '1%' },
//     { id: 2, speed: 20, size: '12vw', top: '20%' },
//     { id: 3, speed: 27, size: '8vw', top: '10%' },
//     { id: 4, speed: 13, size: '13vw', top: '15%' },
//     { id: 5, speed: 25, size: '15vw', top: '5%' },
//   ], []);

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
//           <Button variant="h6" sx={{ mt: 2, mb: 5 ,fontFamily: "'Fraunces', serif", color: "#000" }} onClick={startGame}>
//             Start Quest
//           </Button>

//           <FinancialTips />
//         </Box>
//       )}

//       {gameStarted && playerStats && (
//         <>
//           {!playerStats.q1_done && (
//             <>
//               <Quest1 
//                   onComplete={() => {
//                     setPlayerStats((prevStats) => ({ ...prevStats, q1_done: true }));
//                     fetchPlayerStats();
//                   }} 
//                   setPlayerStats={setPlayerStats} 
//                   characterPosition={characterPosition} 
//                   fetchPlayerStats={fetchPlayerStats}
//                 />
//             </>
//           )}

//           {playerStats.q1_done && !playerStats.sq1_done && (
//             <>
//             <SideQuest1 
//               onComplete={() => {
//                 setPlayerStats((prevStats) => ({ ...prevStats, sq1_done: true }));
//                 fetchPlayerStats();
//               }}
//               setPlayerStats={setPlayerStats} 
//               characterPosition={characterPosition} 
//               fetchPlayerStats={fetchPlayerStats}
//             />
//             </>
//           )}
//           {playerStats.sq1_done && !playerStats.q2_done && (
//             <>
//               <Quest2 
//                 onComplete={() => {
//                   setPlayerStats((prevStats) => ({ ...prevStats, q2_done: true }));
//                   fetchPlayerStats();
//                 }}
//                 setPlayerStats={setPlayerStats}
//                 characterPosition={characterPosition} 
//                 fetchPlayerStats={fetchPlayerStats}
//               />
//             </>
//           )}
//           {playerStats.q2_done && !playerStats.q3_done && (
//             <>
//               <Quest3 
//                 onComplete={() => {
//                   setPlayerStats((prevStats) => ({ ...prevStats, q3_done: true }));
//                   fetchPlayerStats();
//                 }}
//                 setPlayerStats={setPlayerStats}
//                 characterPosition={characterPosition} 
//                 fetchPlayerStats={fetchPlayerStats}
//               />
//               </>
//           )}

//           {playerStats.q1_done && playerStats.sq1_done && playerStats.q2_done && playerStats.q3_done && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 textAlign: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 padding: '20px',
//                 borderRadius: '10px',
//                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <Typography variant="h4" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
//                 🎉 Congratulations! 🎉
//               </Typography>
//               <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
//                 You have successfully completed all the quests!
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
//                 Great job on navigating through the challenges and making wise financial decisions. Keep up the good work and continue to apply what you've learned in real life!
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
//                 Remember, the journey doesn't end here. There are always new adventures and opportunities to improve your financial skills. Have fun and keep exploring!
//               </Typography>
//               <Button 
//                 variant="contained" 
//                 sx={{ mt: 2, fontFamily: "'Cinzel', serif", backgroundColor: '#00cac9', color: 'white', "&:hover": { backgroundColor: '#009797' } }} 
//                 onClick={async () => {
//                   await updateGameplayDone();
//                   navigate('/gameplayanalysis');
//                 }}
//               >
//                 Continue
//               </Button>
//             </Box>
//           )}

//       <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
//             <Stats pts={playerStats.points} money={playerStats.money} />
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
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import { loadCharacter } from './Character';
import Map from './Map';
import Stats from './Stats';
import { onPointerMove, onMouseClick } from './Interaction/helper';
import Quest1 from '../Quest/Quest1/Quest1';
import Quest2 from '../Quest/Quest2/Quest2';
import Quest3 from '../Quest/Quest3/Quest3';
import SideQuest1 from '../Quest/SideQuest/SideQuest1';

import FinancialTips from "./FinancialTips";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';


// MUI Imports
import { Box, Button, Typography } from '@mui/material';

// Debug mode
let debugMode = false;

const Gameplay = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerStats, setPlayerStats] = useState(null);
  const [showRentDecisionModal, setShowRentDecisionModal] = useState(false);
  const [characterPosition, setCharacterPosition] = useState(new THREE.Vector3());
  const [awardedMedals, setAwardedMedals] = useState([]);
  const navigate = useNavigate();

  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(() => new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000), []);

  // Layers
  const roadLayer = useMemo(() => new THREE.Group(), []);
  const buildingLayer = useMemo(() => new THREE.Group(), []);
  const vehicleLayer = useMemo(() => new THREE.Group(), []);

  const fetchPlayerStats = useCallback(async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPlayerStats(response.data);
      setAwardedMedals(response.data.medals || []);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  }, []);

  const checkAndAwardMedals = useCallback(debounce(async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.put('http://127.0.0.1:8000/stats/check-and-award-medals', {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const newMedals = response.data.medals.filter(medal => !awardedMedals.includes(medal));
      newMedals.forEach((medal) => {
        toast.success(`Congratulations! You have been awarded the ${medal.replace('_', ' ').toUpperCase()} medal!`);
      });
      setAwardedMedals(response.data.medals);
      setPlayerStats((prevStats) => ({
        ...prevStats,
        medals: response.data.medals,
      }));
    } catch (error) {
      console.error('Error checking and awarding medals:', error);
    }
  }, 3000), [awardedMedals]);

  useEffect(() => {
    if (gameStarted) {
      fetchPlayerStats();
    }
  }, [gameStarted, fetchPlayerStats]);

  useEffect(() => {
    if (gameStarted && playerStats) {
      initializeScene();
      checkAndAwardMedals();
    }
  }, [gameStarted, playerStats, checkAndAwardMedals]);

  const initializeScene = useCallback(() => {
    if (!mountRef.current || rendererRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let animationId;
    const initialPosition = new THREE.Vector3(playerStats.location.x, playerStats.location.y, playerStats.location.z);
    loadCharacter(vehicleLayer, (character, mixer) => {
      camera.rotation.y = Math.PI;
      camera.position.set(0, 2, -5);
      camera.lookAt(0, 0, 0);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01);
        if (character) {
          setCharacterPosition(character.position);
          const offset = new THREE.Vector3(0, 2, -5);
          camera.position.lerp(offset.applyMatrix4(character.matrixWorld), 0.05);
          camera.lookAt(character.position);
        }
        renderer.render(scene, camera);
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
    };
  }, [scene, camera, roadLayer, buildingLayer, vehicleLayer, playerStats]);

  const handleBuildingClick = useCallback((buildingName) => setPopupContent(buildingName), []);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const startGame = useCallback(() => setGameStarted(true), []);

  const handleRentDecision = useCallback((choice) => {
    setShowRentDecisionModal(false);
  }, []);

  const updateGameplayDone = useCallback(async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.put('http://127.0.0.1:8000/stats/update/gameplay_done', {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Gameplay status updated successfully');
    } catch (error) {
      console.error('Error updating gameplay status:', error);
    }
  }, []);

  // Cloud Animation Data
  const clouds = useMemo(() => [
    { id: 1, speed: 15, size: '10vw', top: '1%' },
    { id: 2, speed: 20, size: '12vw', top: '20%' },
    { id: 3, speed: 27, size: '8vw', top: '10%' },
    { id: 4, speed: 13, size: '13vw', top: '15%' },
    { id: 5, speed: 25, size: '15vw', top: '5%' },
  ], []);

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
                    fetchPlayerStats();
                    checkAndAwardMedals();
                  }} 
                  setPlayerStats={setPlayerStats} 
                  characterPosition={characterPosition} 
                  fetchPlayerStats={fetchPlayerStats}
                />
            </>
          )}

          {playerStats.q1_done && !playerStats.sq1_done && (
            <>
            <SideQuest1 
              onComplete={() => {
                setPlayerStats((prevStats) => ({ ...prevStats, sq1_done: true }));
                fetchPlayerStats();
                checkAndAwardMedals();
              }}
              setPlayerStats={setPlayerStats} 
              characterPosition={characterPosition} 
              fetchPlayerStats={fetchPlayerStats}
            />
            </>
          )}
          {playerStats.sq1_done && !playerStats.q2_done && (
            <>
              <Quest2 
                onComplete={() => {
                  setPlayerStats((prevStats) => ({ ...prevStats, q2_done: true }));
                  fetchPlayerStats();
                  checkAndAwardMedals();
                }}
                setPlayerStats={setPlayerStats}
                characterPosition={characterPosition} 
                fetchPlayerStats={fetchPlayerStats}
              />
            </>
          )}
          {playerStats.q2_done && !playerStats.q3_done && (
            <>
              <Quest3 
                onComplete={() => {
                  setPlayerStats((prevStats) => ({ ...prevStats, q3_done: true }));
                  fetchPlayerStats();
                  checkAndAwardMedals();
                }}
                setPlayerStats={setPlayerStats}
                characterPosition={characterPosition} 
                fetchPlayerStats={fetchPlayerStats}
              />
              </>
          )}

          {playerStats.q1_done && playerStats.sq1_done && playerStats.q2_done && playerStats.q3_done && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
                🎉 Congratulations! 🎉
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
                You have successfully completed all the quests!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
                Great job on navigating through the challenges and making wise financial decisions. Keep up the good work and continue to apply what you've learned in real life!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Cinzel', serif", color: '#000' }}>
                Remember, the journey doesn't end here. There are always new adventures and opportunities to improve your financial skills. Have fun and keep exploring!
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2, fontFamily: "'Cinzel', serif", backgroundColor: '#00cac9', color: 'white', "&:hover": { backgroundColor: '#009797' } }} 
                onClick={async () => {
                  await updateGameplayDone();
                  navigate('/gameplayanalysis');
                }}
              >
                Continue
              </Button>
            </Box>
          )}

          <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
            <Stats pts={playerStats.points} money={playerStats.money} />
          </Box>

          {/* Modern Burger Menu */}
          <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 150 }}>
            {/* Burger Button */}
            <Box 
              component={motion.div}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 110,
                position: 'relative',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
            >
              <Box 
                component={motion.div}
                sx={{ 
                  width: 24,
                  height: 3,
                  backgroundColor: '#333',
                  borderRadius: 1,
                  position: 'absolute',
                  transformOrigin: 'center',
                }}
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -8,
                }}
              />
              <Box 
                component={motion.div}
                sx={{ 
                  width: 24,
                  height: 3,
                  backgroundColor: '#333',
                  borderRadius: 1,
                  position: 'absolute',
                  transformOrigin: 'center',
                }}
                animate={{
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <Box 
                component={motion.div}
                sx={{ 
                  width: 24,
                  height: 3,
                  backgroundColor: '#333',
                  borderRadius: 1,
                  position: 'absolute',
                  transformOrigin: 'center',
                }}
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 8,
                }}
              />
            </Box>
            
            {/* Menu Panel */}
            <AnimatePresence>
              {menuOpen && (
                <Box
                  component={motion.div}
                  sx={{
                    position: 'absolute',
                    top: 60,
                    right: 0,
                    width: 200,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflow: 'hidden',
                  }}
                  initial={{ opacity: 0, x: 50, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 50, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Typography 
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    sx={{ fontWeight: 'bold', fontSize: 18, borderBottom: '1px solid #ddd', pb: 1 }}
                  >
                    Menu
                  </Typography>

                  <Button 
                    component={motion.button}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    onClick={() => navigate('/')}
                  >
                    Home
                  </Button>
                  
                  <Button 
                    component={motion.button}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    onClick={() => navigate('/user-profile')}
                  >
                    Profile
                  </Button>
                  
                  <Button 
                    component={motion.button}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    onClick={() => navigate('/leaderboards')}
                  >
                    Leaderboards

                  </Button>
                  <Button 
                    component={motion.button}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    onClick={() => navigate('/start')}
                  >
                    Back to Start
                  </Button>

                </Box>
              )}
            </AnimatePresence>
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