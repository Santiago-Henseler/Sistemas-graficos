import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

// Edificio 1
const colorE1 = textureLoader.load('textures/edificio1/edificio1_color.png');
const normalE1 = textureLoader.load('textures/edificio1/edificio1_Normal.png');
const roughnessE1 = textureLoader.load('textures/edificio1/edificio1_Roughness.png');
const metalnessE1 = textureLoader.load('textures/edificio1/edificio1_Metalness.png');
const displacementE1 = textureLoader.load('textures/edificio1/edificio1_Displacement.png');

// Ground
const colorG = textureLoader.load('textures/ground/ground_Color.jpg');
const normalG = textureLoader.load('textures/ground/ground_Normal.jpg');
const roughnessG = textureLoader.load('textures/ground/ground_Roughness.jpg');
const displacementG = textureLoader.load('textures/ground/ground_Displacement.jpg');
const ambientOclusionG = textureLoader.load('textures/ground/ground_AmbientOcclusion.jpg');
const repeatXG = 10;
const repeatYG = 10;

[colorG, normalG, roughnessG, displacementG, ambientOclusionG].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatXG, repeatYG);
});

// Edificio 2
const colorE2 = textureLoader.load('textures/edificio2/edificio2_Color.jpg');
const normalE2 = textureLoader.load('textures/edificio2/edificio2_Normal.jpg');
const roughnessE2 = textureLoader.load('textures/edificio2/edificio2_Roughness.jpg');
const metalnessE2 = textureLoader.load('textures/edificio2/edificio2_Metalness.jpg');
const displacementE2 = textureLoader.load('textures/edificio2/edificio2_Displacement.jpg');

// Edificio 3
const colorE3 = textureLoader.load('textures/edificio3/edificio3_Color.jpg');
const normalE3 = textureLoader.load('textures/edificio3/edificio3_Normal.jpg');
const roughnessE3 = textureLoader.load('textures/edificio3/edificio3_Roughness.jpg');
const metalnessE3 = textureLoader.load('textures/edificio3/edificio3_Metalness.jpg');
const displacementE3 = textureLoader.load('textures/edificio3/edificio3_Displacement.jpg');
const ambientOclusionE3 = textureLoader.load('textures/edificio3/edificio3_AmbientOcclusion.jpg');
const emissionE3 = textureLoader.load('textures/edificio3/edificio3_Emission.jpg');

// Light
const colorL = textureLoader.load('textures/light/light_Color.jpg');
const normalL = textureLoader.load('textures/light/light_Normal.jpg');
const roughnessL = textureLoader.load('textures/light/light_Roughness.jpg');
const metalnessL = textureLoader.load('textures/light/light_Metalness.jpg');
const displacementL = textureLoader.load('textures/light/light_Displacement.jpg');

export const materials = {
    "ground": new THREE.MeshStandardMaterial  ( {map: colorG, normalMap: normalG, side: THREE.DoubleSide ,aoMap:ambientOclusionG , roughnessMap: roughnessG, displacementScale: 0.1,displacementMap:displacementG }),
    "build1": new THREE.MeshStandardMaterial  ( {map: colorE1, normalMap: normalE1, side: THREE.DoubleSide ,  metalnessMap: metalnessE1, roughnessMap: roughnessE1, displacementScale: 0.1, displacementMap:displacementE1 }),
    "build2": new THREE.MeshStandardMaterial  ( {map: colorE2, normalMap: normalE2, side: THREE.DoubleSide ,  metalnessMap: metalnessE2, roughnessMap: roughnessE2, displacementScale: 0.1, displacementMap:displacementE2 }),
    "build3": new THREE.MeshStandardMaterial  ( {map: colorE3, normalMap: normalE3, side: THREE.DoubleSide , emissiveMap: emissionE3,aoMap: ambientOclusionE3,  metalnessMap: metalnessE3, roughnessMap: roughnessE3, displacementScale: 0.1,displacementMap:displacementE3 }),
    "light": new THREE.MeshStandardMaterial  ( {map: colorL, normalMap: normalL, side: THREE.DoubleSide , metalnessMap: metalnessL, roughnessMap: roughnessL, displacementScale: 0.1,displacementMap:displacementL }),
    
}