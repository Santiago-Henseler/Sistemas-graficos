import * as THREE from "three";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

import {materials} from "./textures.js"

const roadWidth = 5;
const roadHeight = 0.1;

export function buildRoad(){
	let rigidBodys = [];

	const path = makePath();

	const width = 5;
	const lengthSegments = 400;
	const widthSegments = 5;

	const paramFunc = (u, v, target) => {
		const point = path.getPointAt(u);
		const tangent = path.getTangentAt(u).normalize();
		const up = new THREE.Vector3(0, 1, 0);
		const side = new THREE.Vector3().crossVectors(up, tangent).normalize();
	  
		const offset = side.multiplyScalar((v - 0.5) * width);
		target.copy(point).add(offset);
	};

	const geometry = new ParametricGeometry(paramFunc, lengthSegments, widthSegments);
	const road = new THREE.Mesh(geometry, materials["road"]);

	road.position.y = 0.1;

	let lamps = getLamps(path);

	lamps.forEach((lamp)=>{
		road.add(lamp);

		const rigidBody = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
		const column = new THREE.Mesh(rigidBody, new THREE.MeshPhongMaterial({transparent:true, opacity: 0} ));
		column.position.set(lamp.position.x, 0.5, lamp.position.z);

		road.add(column)
		rigidBodys.push(column);
	})

	const ramp1 = makeRamp();

	const pointRamp1 = path.getPointAt(0.65);
	ramp1.position.x = pointRamp1.x;
	ramp1.position.y = pointRamp1.y;
	ramp1.position.z = pointRamp1.z;

	ramp1.rotation.y += Math.PI/8;

	road.add(ramp1);
	rigidBodys.push(ramp1);

	const ramp2 = makeRamp();

	const pointRamp2 = path.getPointAt(0.15);
	ramp2.position.x = pointRamp2.x;
	ramp2.position.y = pointRamp2.y;
	ramp2.position.z = pointRamp2.z;

	ramp2.rotation.y -= Math.PI/2;

	road.add(ramp2);
	rigidBodys.push(ramp2);

	const tunel = makeTun();

	const pointTun = path.getPointAt(0.93);
	tunel.position.x = pointTun.x+10;
	tunel.position.z = pointTun.z;
	
	road.add(tunel);
	
    return {
			road: road,
			rigidBodys: rigidBodys
			};
}

function getLamps(path){

	let lamps =  [];

	for (let i = 1; i < 4; i++) {
		const t = i / 4;
		const point = path.getPointAt(t);
	  
		const tangent = path.getTangentAt(t).normalize(); 

		const offset = roadWidth/2 + 0.5;
		const left1 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(offset)).add(tangent.clone().multiplyScalar(3));
		const right1 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, -1, 0)).normalize().multiplyScalar(offset));
	  
		const leftLamp1 = makeLamp();
		leftLamp1.lookAt(point);
		leftLamp1.position.set(left1.x, left1.y, left1.z);
		lamps.push(leftLamp1);
	  
		const rightLamp1 = makeLamp();
		rightLamp1.lookAt(point);
		rightLamp1.rotation.y += Math.PI;
		rightLamp1.position.set(right1.x, right1.y, right1.z);
		lamps.push(rightLamp1);

		const left2 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(offset)).add(tangent.clone().multiplyScalar(-3));
		const right2 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, -1, 0)).normalize().multiplyScalar(offset)).add(tangent.clone().multiplyScalar(6));
	  
		const leftLamp2 = makeLamp();
		leftLamp2.lookAt(point);
		leftLamp2.position.set(left2.x, left2.y, left2.z);
		lamps.push(leftLamp2);
	  
		const rightLamp2 = makeLamp();
		rightLamp2.lookAt(point);
		rightLamp2.rotation.y += Math.PI;
		rightLamp2.position.set(right2.x, right2.y, right2.z);
		lamps.push(rightLamp2);
	}
	return lamps;
}

function makeTun(){
	const geometry = new THREE.CylinderGeometry(5, 5, 15, 200, 200,true, 0, Math.PI);

	const tunel = new THREE.Mesh(geometry, materials["tunel"]);

	tunel.rotation.x = Math.PI*2;
	tunel.rotation.z = Math.PI/2;

	return tunel
}

function makeRamp(){

	const rampaGeometry = new THREE.BoxGeometry(roadWidth, 0.5, roadWidth);
	
	const rampa = new THREE.Mesh(rampaGeometry, materials["tunel"]);
	rampa.rotation.z = -Math.atan(0.5);
  
	return rampa
  }

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
		new THREE.Vector3(0, 6, 3)
		));
			
	const tubeGeometry = new THREE.TubeGeometry(path, 200, 0.2, 8, false);
	const lamp =  new THREE.Mesh(tubeGeometry, materials["light"]);
  
	const spotLight = new THREE.SpotLight(0xffDD99, 100, 10, Math.PI/2);
	spotLight.position.set(0, 6, 3);
	spotLight.target.position.set(0, 0, 0); 
  
	lamp.add(spotLight);
	lamp.add(spotLight.target);
  
	return lamp
}

function makePath(){
	const path = new THREE.CurvePath();

	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(5, 0, 0),
		new THREE.Vector3(15, 0, 0),
		new THREE.Vector3(20, 0, 0)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, 0),
		new THREE.Vector3(30, 0, 0),
		new THREE.Vector3(35, 0, 10),
		new THREE.Vector3(35, 0, 20)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(35, 0, 20),
		new THREE.Vector3(35, 0, 30),
		new THREE.Vector3(25, 0, 40),
		new THREE.Vector3(15, 0, 40)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(15, 0, 40),
		new THREE.Vector3(5, 0, 40),
		new THREE.Vector3(-5, 0, 35),
		new THREE.Vector3(-15, 0, 30)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(-15, 0, 30),
		new THREE.Vector3(-25, 0, 25),
		new THREE.Vector3(-30, 0, 15),
		new THREE.Vector3(-30, 0, 0)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(-30, 0, 0),
		new THREE.Vector3(-30, 0, -15),
		new THREE.Vector3(-20, 0, -25),
		new THREE.Vector3(-10, 0, -30)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(-10, 0, -30),
		new THREE.Vector3(0, 0, -35),
		new THREE.Vector3(10, 0, -35),
		new THREE.Vector3(20, 0, -30)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, -30),
		new THREE.Vector3(30, 0, -25),
		new THREE.Vector3(30, 0, -10),
		new THREE.Vector3(20, 0, -10)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, -10),
		new THREE.Vector3(10, 0, -10),
		new THREE.Vector3(5, 0, -10),
		new THREE.Vector3(0, 0, -10)
	  ));
	  
	path.add(new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, -10),
		new THREE.Vector3(-10, 0, -10),
		new THREE.Vector3(-10, 0, 0),
		new THREE.Vector3(0, 0, 0) 
	  ));

	return path;
}