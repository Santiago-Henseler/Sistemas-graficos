import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { cityGenerator } from "./cityGenerator.js";
import * as dat from "dat.gui";

let scene, camera, renderer, container;

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
  scene.add(cityGenerator());

  let directionalLight = new THREE.DirectionalLight(0xeeeeff, 0.2);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);
}

function onResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

setupThreeJs();
buildScene();
animate();
