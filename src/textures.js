import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

// Edificio 1
const colorE1 = textureLoader.load('textures/edificio1/edificio1_color.png');
const normalE1 = textureLoader.load('textures/edificio1/edificio1_Normal.png');
const roughnessE1 = textureLoader.load('textures/edificio1/edificio1_Roughness.png');
const metalnessE1 = textureLoader.load('textures/edificio1/edificio1_Metalness.png');
const repeatE1 = 3;

[colorE1, normalE1, roughnessE1, metalnessE1].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatE1, repeatE1);
});

// Ground
const colorG = textureLoader.load('textures/ground/ground_Color.jpg');
const normalG = textureLoader.load('textures/ground/ground_Normal.jpg');
const roughnessG = textureLoader.load('textures/ground/ground_Roughness.jpg');
const ambientOclusionG = textureLoader.load('textures/ground/ground_AmbientOcclusion.jpg');
const repeatXG = 15;
const repeatYG = 15;

[colorG, normalG, roughnessG, ambientOclusionG].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatXG, repeatYG);
});

// Edificio 2
const colorE2 = textureLoader.load('textures/edificio2/edificio2_Color.jpg');
const normalE2 = textureLoader.load('textures/edificio2/edificio2_Normal.jpg');
const roughnessE2 = textureLoader.load('textures/edificio2/edificio2_Roughness.jpg');
const metalnessE2 = textureLoader.load('textures/edificio2/edificio2_Metalness.jpg');
const repeatE2 = 2;

[colorE2, normalE2, roughnessE2, metalnessE2].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatE2, repeatE2);
});

// Edificio 3
const colorE3 = textureLoader.load('textures/edificio3/edificio3_Color.jpg');
const normalE3 = textureLoader.load('textures/edificio3/edificio3_Normal.jpg');
const roughnessE3 = textureLoader.load('textures/edificio3/edificio3_Roughness.jpg');
const metalnessE3 = textureLoader.load('textures/edificio3/edificio3_Metalness.jpg');
const ambientOclusionE3 = textureLoader.load('textures/edificio3/edificio3_AmbientOcclusion.jpg');
const emissionE3 = textureLoader.load('textures/edificio3/edificio3_Emission.jpg');
const repeatE3 = 3;

[colorE3, normalE3, roughnessE3, metalnessE3, ambientOclusionE3, emissionE3].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatE3, repeatE3);
});

// Light
const colorL = textureLoader.load('textures/light/light_Color.jpg');
const normalL = textureLoader.load('textures/light/light_Normal.jpg');
const roughnessL = textureLoader.load('textures/light/light_Roughness.jpg');
const metalnessL = textureLoader.load('textures/light/light_Metalness.jpg');

// Sky1
const skyTexture1 = textureLoader.load('textures/cielo/DaySky.jpg');

export const materials = {
    "ground": new THREE.MeshStandardMaterial  ( {map: colorG, normalMap: normalG, side: THREE.DoubleSide ,aoMap:ambientOclusionG , roughnessMap: roughnessG, envMap:skyTexture1}),
    "build1": new THREE.MeshStandardMaterial  ( {map: colorE1, normalMap: normalE1, side: THREE.DoubleSide ,  metalnessMap: metalnessE1, roughnessMap: roughnessE1 , envMap:skyTexture1}),
    "build2": new THREE.MeshStandardMaterial  ( {map: colorE2, normalMap: normalE2, side: THREE.DoubleSide ,  metalnessMap: metalnessE2, roughnessMap: roughnessE2 , envMap:skyTexture1}),
    "build3": new THREE.MeshStandardMaterial  ( {map: colorE3,side: THREE.DoubleSide , emissiveMap: emissionE3,aoMap: ambientOclusionE3,  metalnessMap: metalnessE3, roughnessMap: roughnessE3, envMap:skyTexture1 }),
    "light": new THREE.MeshStandardMaterial  ( {map: colorL, normalMap: normalL, side: THREE.DoubleSide , metalnessMap: metalnessL, roughnessMap: roughnessL }),
    "sky1": new THREE.MeshBasicMaterial({ map: skyTexture1, side: THREE.BackSide})
}