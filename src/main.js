import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from 'three/addons/objects/Sky.js';
import * as dat from 'dat.gui';

import { PhysicsSimulator } from './PhysicsSimulator.js';
import { cityGenerator } from "./cityGenerator.js";
import {Car} from "./carGenerator.js";

const params = {
  cameras: 'orbital',
};

let scene, camera, renderer, container;
let physicsSimulator;
let car;
let sky, sol;

let cameraVehiculo1;
let cameraVehiculo2;
const cameraOrbital = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
cameraOrbital.position.set(80, 50, 60);
cameraOrbital.lookAt(0, 0, 0);

function setupThreeJs() {
  container = document.getElementById("container3D");

  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene = new THREE.Scene();

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(cameraOrbital, renderer.domElement);
  camera = cameraOrbital;

  window.addEventListener("resize", onResize);
  onResize();
}

function buildScene() {
  // objects
  scene.add(cityGenerator(physicsSimulator));
  car = new Car(scene);

  // luces 
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.3));

  sol = new THREE.DirectionalLight(0xffffff, 2);
  sol.position.set(0, 0, 0);
  sol.target.position.set(0, 0, 0);

  sol.castShadow = true;
  sol.shadow.mapSize.width = 2048;
  sol.shadow.mapSize.height = 2048;

  scene.add(sol);
  
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

function createUI() {
	const gui = new dat.GUI();

	gui.add(params, 'cameras', ['vehiculo1', 'vehiculo2','orbital', 'peaton']).onChange((value) => {
    switch (value){
      case 'orbital':
        camera = cameraOrbital;
        break;
      case 'vehiculo1':
        camera = car.getCam1();
        break;
      case 'vehiculo2':
        camera = car.getCam2();
        break;
      case 'peaton':
        break;
    }
	});
}

setupThreeJs();
await initPhysics();
buildScene();
createUI();
animate();


document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'r':
      physicsSimulator.resetVehicle()
  }
});