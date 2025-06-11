import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from 'three/addons/objects/Sky.js';
import * as dat from 'dat.gui';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import { PhysicsSimulator } from './PhysicsSimulator.js';
import { cityGenerator } from "./cityGenerator.js";
import {Car} from "./carGenerator.js";

let scene, camera, renderer, container;
let physicsSimulator;
let car;
let sky, sol;

let moveForward = false,moveRight = false, moveLeft = false, moveBackward = false;
let pov = false;
let velocity = new THREE.Vector3();
let ang = 0;
let x_pos = 0;

const params = {
  cameras: 'orbital',
};

const cameraOrbital = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
cameraOrbital.position.set(80, 50, 60);
cameraOrbital.lookAt(0, 0, 0);

const cameraPov = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
cameraPov.position.set(0, 2, 0);

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

  // Movimiento
  if (pov) {
    const speed = 0.1;
    const direction = new THREE.Vector3();

    camera.getWorldDirection(direction);
    direction.normalize();
  
    if (moveForward) {
      camera.position.addScaledVector(direction, speed);
    }
    if (moveBackward) {
      camera.position.addScaledVector(direction, -speed);
    }
  }

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
        pov = false;
        break;
      case 'vehiculo1':
        camera = car.getCam1();
        pov = false;
        break;
      case 'vehiculo2':
        camera = car.getCam2();
        pov = false;
        break;
      case 'peaton':
        pov = true;
        camera = cameraPov;
        break;
    }
	});

  var obj = { 'Reset physics':function(){ physicsSimulator.resetVehicle(); }};

  gui.add(obj,'Reset physics');
}

document.addEventListener( 'keydown', ( event ) => {
  switch (event.key) {
    case 'r':
      physicsSimulator.resetVehicle();
      break;
    case 'ArrowUp':
			moveForward = true;
			break;
    case 'ArrowLeft':
			moveLeft = true;
			break;
    case 'ArrowDown':
			moveBackward = true;
			break;
    case 'ArrowRight':
			moveRight = true;
			break;
    case '1':
      camera = cameraOrbital;
      pov = false;
      break;
    case '2':
      camera = car.getCam1();
      pov = false;
      break;
    case '3':
      camera = car.getCam2();
      pov = false;
      break;
    case '4':
      pov = true;
      camera = cameraPov;
      break;
  } 
});

document.addEventListener( 'keyup', (event)=> {
  switch ( event.key ) {
    case 'ArrowUp':
			  moveForward = false;
				break;
    case 'ArrowLeft':
				moveLeft = false;
				break;
    case 'ArrowDown':
				moveBackward = false;
				break;
    case 'ArrowRight':
				moveRight = false;
				break;
    }
});

document.addEventListener('mousemove', (event)=> {
  const sensitivity = 0.002;
  ang -= event.movementX * sensitivity;
  if(pov){
    camera.rotation.set(0, ang*2, 0);
  }
}, false);

async function main() {
  setupThreeJs();
  await initPhysics();
  buildScene();
  createUI();
  animate();
}
main();
        