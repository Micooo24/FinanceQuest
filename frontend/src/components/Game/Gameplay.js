import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadCharacter } from './Character';
import Map from './Map';
import Menu from './Menu';
import Stats from './Stats';
import Mission from './Mission';

const Gameplay = () => {  
  const mountRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Define the scene and camera variables outside the useEffect hook
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Create groups for each layer
  const roadLayer = new THREE.Group();
  const buildingLayer = new THREE.Group();
  const vehicleLayer = new THREE.Group();

  useEffect(() => {
    if (!mountRef.current) {
      console.error('Mount ref is not available');
      return;
    }

    console.log('Mount ref is available');

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    console.log('Scene, camera, and renderer set up');

    // Add lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    console.log('Lights added');

    // Load the character model
    let animationId;
    loadCharacter(vehicleLayer, (character, mixer) => {
      // Position the camera behind and above the character for a third-person view
      camera.position.set(0, 10, -15); // Adjust the height and distance as needed
      camera.lookAt(0, 0, 0); // Look at the center of the scene

      const targetPosition = new THREE.Vector3();
      const targetLookAt = new THREE.Vector3();

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01);

        // Make the camera follow the character
        if (character) {
          const offset = new THREE.Vector3(0, 10, -15); // Offset from the character
          const relativeCameraOffset = offset.applyMatrix4(character.matrixWorld);
          targetPosition.copy(relativeCameraOffset);
          targetLookAt.copy(character.position);

          // Interpolate the camera's position and lookAt target
          camera.position.lerp(targetPosition, 0.05); // Increase the interpolation factor for smoother movement
          camera.lookAt(targetLookAt);

          // console.log(`Updated camera position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
          // console.log(`Updated camera lookAt: ${camera.getWorldDirection(new THREE.Vector3()).x}, ${camera.getWorldDirection(new THREE.Vector3()).y}, ${camera.getWorldDirection(new THREE.Vector3()).z}`);
        }

        renderer.render(scene, camera);
      };
      animate();
    }, camera);

    console.log('Camera and character set up');

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    console.log('Resize handler added');

    // Add layers to the scene in the correct order
    scene.add(roadLayer);
    scene.add(buildingLayer);
    scene.add(vehicleLayer);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
        <Stats health={100} exp={75} level={5} money={1500} />
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
        <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
        <Mission />
      </div>
      <Map scene={scene} camera={camera} />
    </div>  
  );
};

export default Gameplay;