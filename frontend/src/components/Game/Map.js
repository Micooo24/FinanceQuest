import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { loadBuildings } from './Terrain/Building';
import { loadCars } from './Terrain/Car';
import { onPointerMove, onMouseClick, pointer } from './Interaction/helper';
import { loadNPC, loadNPC2, loadNPC3, loadNPC4, loadNPC5, loadNPC6 } from './Terrain/NPC';

// Global debug mode variable
const debugMode = false;

const Map = ({ scene, camera }) => {
  const assets = {
    road_4way: require('../../assets/game/road_4way.glb'),
    road_straight: require('../../assets/game/road_straight.glb'),
    road_close: require('../../assets/game/road_Close.glb'),
    traflight: require('../../assets/game/trafficlight_C.fbx'),
    stopsign: require('../../assets/game/stopsign.obj'),
    stopsignTexture: require('../../assets/game/stopsign.png'),
  };

  useEffect(() => {
    if (!scene) {
      if (debugMode) console.error('Scene is not defined in Map component');
      return;
    }
    if (!camera) {
      if (debugMode) console.error('Camera is not defined in Map component');
      return;
    }

    if (debugMode) console.log('Scene and camera are defined in Map component:', scene, camera);

    const gltfLoader = new GLTFLoader();
    const fbxLoader = new FBXLoader();
    const objLoader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

    // Create groups for each layer
    const roadLayer = new THREE.Group();
    const buildingLayer = new THREE.Group();
    const vehicleLayer = new THREE.Group();
    const extraLayer = new THREE.Group();

    // Add a ground plane
    const planeGeometry = new THREE.PlaneGeometry(71, 71);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x848884 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    roadLayer.add(plane);

    // Add lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -32;
    directionalLight.shadow.camera.right = 32;
    directionalLight.shadow.camera.top = 32;
    directionalLight.shadow.camera.bottom = -32;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Function to load and place assets
    const loadAsset = (path, position, rotation = [0, 0, 0], scale = [1, 1, 1], layer, loader, texturePath = null) => {
      loader.load(path, (model) => {
        const object = model.scene || model;
        object.position.set(...position);
        object.rotation.set(...rotation);
        object.scale.set(...scale);

        // Apply texture if provided
        if (texturePath) {
          const texture = textureLoader.load(texturePath);
          object.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({ map: texture });
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        } else {
          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        }

        layer.add(object);
        if (debugMode) console.log(`${path} loaded and added to the scene`);
      }, undefined, (error) => {
        if (debugMode) console.error(`An error occurred while loading ${path}: ${error.message}`);
      });
    };

    // Define the positions and rotations for the road pieces
    const layout = [
      { type: 'road_4way', position: [0, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [10, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [20, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [30, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [-10, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [-20, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [-30, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, 10], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, 20], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, 30], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, -10], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, -20], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_straight', position: [0, 0, -30], rotation: [0, Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'traflight', position: [5, 0.5, -5], scale: [5, 5, 5], layer: extraLayer, loader: fbxLoader },
      { type: 'stopsign', position: [35, 0, 0], rotation: [0, 0, 0], scale: [0.01, 0.01, 0.01], layer: extraLayer, loader: objLoader, texturePath: assets.stopsignTexture }, //left side of the map
      { type: 'stopsign', position: [-35, 0, 0], rotation: [0, Math.PI, 0], scale: [0.01, 0.01, 0.01], layer: extraLayer, loader: objLoader, texturePath: assets.stopsignTexture },//right side of the map
      { type: 'stopsign', position: [0, 0, 35], rotation: [0, -Math.PI / 2, 0], scale: [0.01, 0.01, 0.01], layer: extraLayer, loader: objLoader, texturePath: assets.stopsignTexture }, //top side of the map
      { type: 'stopsign', position: [0, 0, -35], rotation: [0, -Math.PI / 2, 0], scale: [0.01, 0.01, 0.01], layer: extraLayer, loader: objLoader, texturePath: assets.stopsignTexture }, //bottom side of the map
      { type: 'road_close', position: [35, 0, 0], rotation: [0, 0, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_close', position: [-35, 0, 0], rotation: [0, Math.PI, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_close', position: [0, 0, 35], rotation: [0, -Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
      { type: 'road_close', position: [0, 0, -35], rotation: [0, -Math.PI / 2, 0], layer: roadLayer, loader: gltfLoader },
    ];

    // Load and place each asset
    layout.forEach(({ type, position, rotation, scale, layer, loader, texturePath }) => {
      loadAsset(assets[type], position, rotation, scale, layer, loader, texturePath);
    });

    // Load buildings and cars
    loadBuildings(scene, buildingLayer, camera);
    loadCars(scene, vehicleLayer);

    // Load NPC
    loadNPC(scene);
    loadNPC2(scene);
    loadNPC3(scene);
    loadNPC4(scene);
    loadNPC5(scene);
    loadNPC6(scene);

    // Add layers to the scene
    scene.add(roadLayer);
    scene.add(buildingLayer);
    scene.add(vehicleLayer);
    scene.add(extraLayer);

    // Add a skybox
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      'path/to/px.jpg', // right
      'path/to/nx.jpg', // left
      'path/to/py.jpg', // top
      'path/to/ny.jpg', // bottom
      'path/to/pz.jpg', // front
      'path/to/nz.jpg', // back
    ]);
    scene.background = texture;

    // Add event listeners
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));

    // Clean up on component unmount
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', (event) => onMouseClick(event, camera, scene, handleBuildingClick));
    };
  }, [scene, camera]);

  const handleBuildingClick = (buildingName) => {
    if (debugMode) console.log(`Building clicked: ${buildingName}`);
    // Handle building click logic here
  };

  return null;
};

export default Map;