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

// Edificio 2
const colorE4 = textureLoader.load('textures/edificio4/edificio4_Color.jpg');
const normalE4 = textureLoader.load('textures/edificio4/edificio4_Normal.jpg');
const roughnessE4 = textureLoader.load('textures/edificio4/edificio4_Roughness.jpg');
const metalnessE4 = textureLoader.load('textures/edificio4/edificio4_Metalness.jpg');
const repeatE4 = 2;

[colorE4, normalE4, roughnessE4, metalnessE4].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatE4, repeatE4);
});

// Light
const colorL = textureLoader.load('textures/light/light_Color.jpg');
const normalL = textureLoader.load('textures/light/light_Normal.jpg');
const roughnessL = textureLoader.load('textures/light/light_Roughness.jpg');
const metalnessL = textureLoader.load('textures/light/light_Metalness.jpg');

// Sky1
const skyTexture1 = textureLoader.load('textures/cielo/DaySky.jpg');
skyTexture1.mapping = THREE.EquirectangularReflectionMapping;

// Road
const colorR = textureLoader.load('textures/road/road_Color.jpg');
const normalR = textureLoader.load('textures/road/road_Normal.jpg');
const roughnessR = textureLoader.load('textures/road/road_Roughness.jpg');

const repeatR = 3;

[colorR, normalR, roughnessR].forEach(tex => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(30, 1);
});

// Tunel
const colorT = textureLoader.load('textures/tunel/tunel_Color.jpg');
const normalT = textureLoader.load('textures/tunel/tunel_Normal.jpg');
const roughnessT = textureLoader.load('textures/tunel/tunel_Roughness.jpg');
const metalnessT = textureLoader.load('textures/tunel/tunel_Metalness.jpg');
const ambientOclusionT = textureLoader.load('textures/tunel/tunel_AmbientOcclusion.jpg');
const emissionT = textureLoader.load('textures/tunel/tunel_Emission.jpg');

// Techo
const colorTecho = textureLoader.load('textures/techo/techo_Color.jpg');
const normalTecho = textureLoader.load('textures/techo/techo_Normal.jpg');
const roughnessTecho = textureLoader.load('textures/techo/techo_Roughness.jpg');
const ambientOclusionTecho = textureLoader.load('textures/techo/techo_AmbientOcclusion.jpg');

// Chasis
const colorChasis = textureLoader.load('textures/chasis/chasis_Color.jpg');
const normalChasis = textureLoader.load('textures/chasis/chasis_Normal.jpg');

const wheel =  textureLoader.load('textures/wheel/wheel.png');

export const materials = {
    "ground": new THREE.MeshStandardMaterial  ( {map: colorG, normalMap: normalG , side: THREE.DoubleSide , aoMap:ambientOclusionG , roughnessMap: roughnessG}),
    "build1": new THREE.MeshStandardMaterial  ( {map: colorE1, normalMap: normalE1 , side: THREE.DoubleSide ,  metalness:1, roughness:0.1, envMap:skyTexture1}),
    "build2": new THREE.MeshStandardMaterial  ( {map: colorE2, normalMap: normalE2 ,  side: THREE.DoubleSide ,  metalness:1, roughness:0.1, envMap:skyTexture1}),
    "build3": new THREE.MeshStandardMaterial  ( {map: colorE3 , emissiveMap: emissionE3, side: THREE.DoubleSide , normalMap:normalE3, aoMap: ambientOclusionE3,  metalnessMap: metalnessE3, roughnessMap: roughnessE3, envMap:skyTexture1 }),
    "build4": new THREE.MeshStandardMaterial  ( {map: colorE2, normalMap: normalE2 ,  side: THREE.DoubleSide ,  metalnessMap:metalnessE4, roughnessMap:roughnessE4}),
    "light": new THREE.MeshStandardMaterial  ( {map: colorL, normalMap: normalL, side: THREE.DoubleSide , metalnessMap: metalnessL, roughnessMap: roughnessL }),
    "sky1": new THREE.MeshBasicMaterial({ map: skyTexture1, side: THREE.BackSide}),
    "road": new THREE.MeshStandardMaterial({map:colorR, normalMap:normalR,side:THREE.DoubleSide, roughnessMap: roughnessR}),
    "tunel": new THREE.MeshStandardMaterial  ( {map: colorT, normalMap:normalT, side: THREE.DoubleSide , emissiveMap: emissionT, aoMap: ambientOclusionT,  metalnessMap: metalnessT, roughnessMap: roughnessT, envMap:skyTexture1 }),
    "techo": new THREE.MeshStandardMaterial({map: colorTecho, normalMap:normalTecho, side: THREE.DoubleSide,roughnessMap:roughnessTecho, aoMap:ambientOclusionTecho }),
    "chasis": new THREE.MeshStandardMaterial({map: colorChasis, normalMap:normalChasis, side: THREE.DoubleSide,  envMap: skyTexture1, roughness:0.1, metalness:1 }),
    "wheel" : new THREE.MeshStandardMaterial({ map: wheel }),
}