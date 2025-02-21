import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadCharacter } from './Character';
import Map from './Map';
import Menu from './Menu';
import Stats from './Stats';
import Mission from './Mission';
import { onPointerMove, onMouseClick } from './Interaction/helper';
import StatsJS from 'stats.js';
<<<<<<< Updated upstream
import './Gameplay.css'; // Import the CSS file
// const backgroundMusic = 'https://res.cloudinary.com/dwp8u82sd/video/upload/v1739117255/music_oxl9oy.mp3'; // URL of the MP3 file
=======
import Quest1 from '../Quest/Quest1/Quest1';
import SideQuest1 from '../Quest/SideQuest/SideQuest1';
import { toggleSystemNarrationModal } from './Interaction/NPC4Interaction';

// MUI Imports
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
>>>>>>> Stashed changes

// Debug mode
let debugMode = false;

const Gameplay = () => {
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [quest1Completed, setQuest1Completed] = useState(false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Layers
  const roadLayer = new THREE.Group();
  const buildingLayer = new THREE.Group();
  const vehicleLayer = new THREE.Group();

  useEffect(() => {
    if (!mountRef.current || !gameStarted) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const stats = new StatsJS();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    let animationId;
    loadCharacter(vehicleLayer, (character, mixer) => {
      camera.rotation.y = Math.PI;
      camera.position.set(0, 2, -5);
      camera.lookAt(0, 0, 0);

      const animate = () => {
        stats.begin();
        animationId = requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01);
        if (character) {
          const offset = new THREE.Vector3(0, 2, -5);
          camera.position.lerp(offset.applyMatrix4(character.matrixWorld), 0.05);
          camera.lookAt(character.position);
        }
        renderer.render(scene, camera);
        stats.end();
      };
      animate();
    }, camera);

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
  }, [gameStarted]);

<<<<<<< Updated upstream
  const handleBuildingClick = (buildingName) => {
    if (debugMode) console.log(`Building clicked: ${buildingName}`);
    setPopupContent(buildingName);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDebugMode = () => {
    debugMode = !debugMode;
  };

  const startGame = () => {
    setGameStarted(true);
  };
  
  return (
    <div ref={mountRef} className="gameplay-container">
=======
  const handleBuildingClick = (buildingName) => setPopupContent(buildingName);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const startGame = () => setGameStarted(true);

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
>>>>>>> Stashed changes
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
          <Button variant="h6" sx={{ mt: 2, fontFamily: "'Fraunces', serif" }} onClick={startGame}>
            Begin Adventure
          </Button>
        </Box>
      )}

      {gameStarted && (
        <>
<<<<<<< Updated upstream
          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
=======
          <Quest1 onComplete={() => setQuest1Completed(true)} />
          {quest1Completed && <SideQuest1 />}

          <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
>>>>>>> Stashed changes
            <Stats health={100} exp={75} level={5} money={1500} />
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
