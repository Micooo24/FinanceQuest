import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

const assets = {
  building_01: 'https://res.cloudinary.com/dwp8u82sd/raw/upload/v1739077544/building_01_mv5zsp.fbx',
  hospital: 'https://res.cloudinary.com/dwp8u82sd/raw/upload/v1739077537/hospital_r41wiq.obj',
  hospitalTexture: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077536/hospitalSurface_Color_agyz6e.png',
  house1: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077531/house_o0jgic.glb',
  largeBuilding: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077531/Large_Building_popyev.glb',
  apartmentBuilding: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077530/Apartment_building_vguzuy.glb',
  houses: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077530/Houses_rg89nr.glb',
  school: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077530/school_fv9uw1.glb',
  schoolTexture: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077543/school_umdm2b.png',
  Bank: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077526/Bank_cfyenl.glb',
  shop: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739077525/shop_tvtc8d.glb',
  supermarket: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739099166/supermarket_kteqr7.glb',
  coffee_shop: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739099164/coffeeshop_dnlpie.glb',
  donut_shop: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739101338/Donut_Store_gmynji.glb',
  private_school: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1739374560/privateschool_dvoxlm.glb' // Add the new building
};

// Global debug mode variable
const debugMode = false;

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

  const loadAsset = (path, position, rotation = [0, 0, 0], scale = [1, 1, 1], isFBX = false, isOBJ = false, texturePath = null, highlightEdges = false, pulseEffect = false, name = '') => {
    const loader = isFBX ? fbxLoader : (isOBJ ? objLoader : gltfLoader);
    if (!loader) return;

    loader.load(path, (model) => {
      const object = model.scene || model;
      object.position.set(...position);
      object.rotation.set(...rotation);
      object.scale.set(...scale);
      object.name = name; // Set the name of the object

      if (debugMode) console.log(`Loaded ${name} at position:`, position, 'with scale:', scale);

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

      // if (pulseEffect) {
      //   const initialScale = object.scale.clone();
      //   const pulseSpeed = 1.5;
      //   const pulseScale = 1.1;

      //   const pulse = () => {
      //     const time = clock.getElapsedTime();
      //     const scaleFactor = 1 + Math.sin(time * pulseSpeed) * (pulseScale - 1);
      //     object.scale.set(
      //       initialScale.x * scaleFactor,
      //       initialScale.y * scaleFactor,
      //       initialScale.z * scaleFactor
      //     );
      //     requestAnimationFrame(pulse);
      //   };
      //   pulse();
      // }

      buildingLayer.add(object);
      if (debugMode) console.log(`${path} loaded and added to the scene`);
    }, undefined, (error) => {
      if (debugMode) console.error(`An error occurred while loading ${path}: ${error.message}`);
    });
  };

  const layout = [
    { type: 'building_01', position: [25, 0, 18], scale: [0.01, 0.01, 0.01], isFBX: true, highlightEdges: true },
    { type: 'house1', position: [-15, 3, 30], rotation: [0, -Math.PI / 2, 0], scale: [5, 5, 5], highlightEdges: true, name: 'house1' },
    { type: 'hospital', position: [-30, 3, -30], scale: [0.03, 0.03, 0.03], isOBJ: true, texturePath: assets.hospitalTexture, highlightEdges: true },
    { type: 'largeBuilding', position: [-15, 0, 20], rotation: [0, Math.PI / 2, 0], scale: [8, 8, 8], highlightEdges: true },
    { type: 'apartmentBuilding', position: [-15, 0, 8], rotation: [0, Math.PI / -1, 0], scale: [0.8, 0.8, 0.8], highlightEdges: true },
    { type: 'houses', position: [-28.011252865906858, 0, 27], rotation: [0, Math.PI, 0], scale: [7, 7, 7], highlightEdges: true },
    { type: 'school', position: [30.4, 0, -21], rotation: [0, Math.PI / -1, 0], scale: [0.8, 0.8, 0.8], highlightEdges: true, name: 'school' },
    { type: 'Bank', position: [-11, 0, -11], rotation: [0, Math.PI / -2, 0], scale: [0.02, 0.02, 0.02], highlightEdges: true,  name: 'Bank' },
    { type: 'shop', position: [12, 0, 27], rotation: [0, Math.PI / -2, 0], scale: [70, 70, 70], highlightEdges: true,  name: 'shop' },
    { type: 'supermarket', position: [-10, 0, -22.6663653383522], rotation: [0, -Math.PI / 2, 0], scale: [8, 8, 8], highlightEdges: true,  name: 'supermarket' },
    { type: 'coffee_shop', position: [-23, 0, -12], rotation: [0, 0, 0], scale: [5, 5, 5], highlightEdges: true, name: 'coffee_shop' },
    { type: 'donut_shop', position: [13, 2, 12.681531645492328], rotation: [0, Math.PI / 2, 0], scale: [2, 2, 2], highlightEdges: true, name: 'bakery' },
    { type: 'private_school', position: [-29.086473248892965, 0, 12],  rotation:[0, Math.PI, 0], scale: [0.8, 0.8, 0.8], highlightEdges: true, name: 'private_school' } // Add the new building
  ];

  layout.forEach(({ type, position, rotation, scale, isFBX, isOBJ, texturePath, highlightEdges, pulseEffect, name }) => {
    loadAsset(assets[type], position, rotation, scale, isFBX, isOBJ, texturePath, highlightEdges, pulseEffect, name);
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