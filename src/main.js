import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from 'three/addons/libs/stats.module.js';
import * as dat from "dat.gui";

import { PhysicsSimulator } from './PhysicsSimulator.js';
import { cityGenerator } from "./cityGenerator.js";
import {Car} from "./carGenerator.js";

let scene, camera, renderer, container;
let physicsSimulator;
let car;
let dayTime, sol;

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

function buildScene() {
  dayTime = 0;
  scene.add(cityGenerator());
  car = new Car();
  scene.add(car.getCar());

  sol = new THREE.DirectionalLight(0xFFFFFFF, 2);

  let helper = new  THREE.DirectionalLightHelper(sol, 10);

  sol.position.set(0, 40, 0);
  sol.lookAt(0,0,0);

  scene.add(new THREE.AmbientLight(0xFFFFFF, 1.5));
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

function animate() {
  requestAnimationFrame(animate);
  physicsSimulator.update();
  car.updateVehicleTransforms(physicsSimulator);

  dayTime += 0.005; 

  renderer.render(scene, camera);
}

setupThreeJs();
buildScene();
initPhysics();

animate();
