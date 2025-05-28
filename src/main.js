import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from 'three/addons/objects/Sky.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { PhysicsSimulator } from './PhysicsSimulator.js';
import { cityGenerator } from "./cityGenerator.js";
import {Car} from "./carGenerator.js";
import {materials} from "./textures.js";

let scene, camera, renderer, container;
let physicsSimulator;
let car;
let sky,sol;

function setupThreeJs() {
  container = document.getElementById("container3D");

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();

  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(80, 50, 60);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onResize);
  onResize();
}
let sunlightHelper;
function buildScene() {
  scene.add(cityGenerator());
  car = new Car();
  scene.add(car.getCar());

  // luces 
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.3));

  sol = new THREE.DirectionalLight(0xffffff, 2);
  sol.position.set(0, 0, 0);
  sol.target.position.set(0, 0, 0);

  sol.castShadow = true;
  sol.shadow.mapSize.width = 2048;
  sol.shadow.mapSize.height = 2048;

  scene.add(sol);

  sunlightHelper = new THREE.DirectionalLightHelper(sol, 10, 0xffff00); // tamaño, color opcional
  scene.add(sunlightHelper);
  
  sky = new Sky();
  sky.scale.setScalar( 450000 );
  scene.add( sky );

}

async function initPhysics() {
  physicsSimulator = new PhysicsSimulator();
  await physicsSimulator.initSimulation();
}

function onResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.005;

  // fisicas
  physicsSimulator.update();
  car.updateVehicleTransforms(physicsSimulator);

  sunlightHelper.update();

  // luces
  sol.position.set(
    70 * Math.cos(time+0.1),
    70 * Math.sin(time+0.1),
    0                       
  );

  const uniforms = sky.material.uniforms;
  uniforms[ 'turbidity' ].value = 0;
  uniforms[ 'rayleigh' ].value = Math.sin(time)+1;
  uniforms[ 'mieCoefficient' ].value = 0;
  uniforms[ 'mieDirectionalG' ].value = 0;
  uniforms[ 'sunPosition' ].value.copy(new THREE.Vector3(1,4,-180));


  renderer.render(scene, camera);
}

setupThreeJs();
buildScene();
initPhysics();

animate();

