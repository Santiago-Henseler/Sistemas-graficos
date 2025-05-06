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
  scene.add(makeLamp())
  let directionalLight = new THREE.DirectionalLight(0xFFFFFFF, 0.2);
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


function makeLamp(){

  const path = new THREE.CurvePath();

	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 5, 0),
		new THREE.Vector3(0, 5, 0),
		new THREE.Vector3(0, 5, 0)
	  ));

  path.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 5, 0),
      new THREE.Vector3(0, 6, 0),
      new THREE.Vector3(0, 6, 0),
      new THREE.Vector3(-3, 6, 0)
      ));
	      
  const tubeGeometry = new THREE.TubeGeometry(path, 200, 0.2, 8, false);
  const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const lamp =  new THREE.Mesh(tubeGeometry, material);

  const spotLight = new THREE.SpotLight(0xffDD99, 100);
  spotLight.position.set(-3, 6, 0);
  spotLight.target.position.set(0, 0, -10); 

  lamp.add(spotLight);
  lamp.add(spotLight.target);

  return lamp
}