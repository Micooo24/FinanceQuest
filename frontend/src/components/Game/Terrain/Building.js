import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

const assets = {
  building_01: require('../../../assets/game/building_01.fbx'),
  hospital: require('../../../assets/game/hospital.obj'),
  hospitalTexture: require('../../../assets/game/hospitalSurface_Color.png'),
  house1: require('../../../assets/game/house.glb'),
  largeBuilding: require('../../../assets/game/Large Building.glb'),
  apartmentBuilding: require('../../../assets/game/Apartment building.glb'),
  houses: require('../../../assets/game/Houses.glb'),
  school: require('../../../assets/game/school.glb'),
  schoolTexture: require('../../../assets/game/school.png'),
  Bank: require('../../../assets/game/Bank.glb'),
  shop: require('../../../assets/game/shop.glb'),
};

const loadBuildings = (scene, buildingLayer) => {
  const fbxLoader = new FBXLoader();
  const objLoader = new OBJLoader();
  const gltfLoader = new GLTFLoader();
  const textureLoader = new TextureLoader();
  const clock = new THREE.Clock();

  const createCustomTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(0.5, '#dbe1e3');
    gradient.addColorStop(1, '#0000ff');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#a7c7cb';
    context.beginPath();
    context.arc(256, 256, 100, 0, Math.PI * 2);
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const createShiningEdgesMaterial = () => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffd700) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = abs(sin(time * 5.0));
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
      transparent: true
    });
  };

  const loadAsset = (path, position, rotation = [0, 0, 0], scale = [1, 1, 1], isFBX = false, isOBJ = false, texturePath = null, highlightEdges = false, pulseEffect = false) => {
    const loader = isFBX ? fbxLoader : (isOBJ ? objLoader : gltfLoader);
    if (!loader) return;

    loader.load(path, (model) => {
      const object = model.scene || model;
      object.position.set(...position);
      object.rotation.set(...rotation);
      object.scale.set(...scale);
      if (path === assets.Bank) {
        object.name = 'Bank';
      }

      if (isOBJ && texturePath) {
        const texture = textureLoader.load(texturePath);
        texture.flipY = false;
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ map: texture });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      } else if (isFBX && path === assets.building_01) {
        const customTexture = createCustomTexture();
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ map: customTexture });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      } else if (path === assets.school) {
        const texture = textureLoader.load(assets.schoolTexture);
        texture.flipY = false;
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

      if (highlightEdges) {
        object.traverse((child) => {
          if (child.isMesh) {
            const edges = new THREE.EdgesGeometry(child.geometry);
            const edgeLines = new THREE.LineSegments(edges, createShiningEdgesMaterial());
            child.add(edgeLines);
          }
        });
      }

      if (pulseEffect) {
        const initialScale = object.scale.clone();
        const pulseSpeed = 1.5;
        const pulseScale = 1.1;

        const pulse = () => {
          const time = clock.getElapsedTime();
          const scaleFactor = 1 + Math.sin(time * pulseSpeed) * (pulseScale - 1);
          object.scale.set(
            initialScale.x * scaleFactor,
            initialScale.y * scaleFactor,
            initialScale.z * scaleFactor
          );
          requestAnimationFrame(pulse);
        };
        pulse();
      }

      buildingLayer.add(object);
      console.log(`${path} loaded and added to the scene`);
    }, undefined, (error) => {
      console.error(`An error occurred while loading ${path}: ${error.message}`);
    });
  };

  const layout = [
    { type: 'building_01', position: [25, 0, 18], scale: [0.01, 0.01, 0.01], isFBX: true, highlightEdges: true },
    { type: 'house1', position: [-15, 3, 30], rotation: [0, -Math.PI / 2, 0], scale: [5, 5, 5], highlightEdges: true, pulseEffect: true },
    { type: 'hospital', position: [-30, 3, -30], scale: [0.03, 0.03, 0.03], isOBJ: true, texturePath: assets.hospitalTexture, highlightEdges: true },
    { type: 'largeBuilding', position: [-15, 0, 20], rotation: [0, Math.PI / 2, 0], scale: [8, 8, 8], highlightEdges: true },
    { type: 'apartmentBuilding', position: [-15, 0, 8], rotation: [0, Math.PI / -1, 0], scale: [0.8, 0.8, 0.8], highlightEdges: true },
    { type: 'houses', position: [-27, 0, 15], scale: [8, 8, 8], highlightEdges: true },
    { type: 'school', position: [30.4, 0, -21], rotation: [0, Math.PI / -1, 0], scale: [0.8, 0.8, 0.8], highlightEdges: true, pulseEffect: true },
    { type: 'Bank', position: [-11, 0, -11], rotation: [0, Math.PI / -2, 0], scale: [0.02, 0.02, 0.02], highlightEdges: true, pulseEffect: true },
    { type: 'shop', position: [12, 0, 20], rotation: [0, Math.PI / -2, 0], scale: [70, 70, 70], highlightEdges: true, pulseEffect: true },
  ];

  layout.forEach(({ type, position, rotation, scale, isFBX, isOBJ, texturePath, highlightEdges, pulseEffect }) => {
    loadAsset(assets[type], position, rotation, scale, isFBX, isOBJ, texturePath, highlightEdges, pulseEffect);
  });

  scene.add(buildingLayer);

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    buildingLayer.traverse((child) => {
      if (child.isMesh && child.material && child.material.uniforms) {
        child.material.uniforms.time.value += delta;
      }
    });
  };
  animate();
};

export { loadBuildings };