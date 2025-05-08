import * as THREE from "three";

const roadWidth = 5;
const roadHeight = 0.1;

export function buildRoad(){
	const path = makePath();

	const shape = new THREE.Shape();
	shape.moveTo(-roadWidth / 2, -roadHeight / 2);
	shape.lineTo(roadWidth / 2, -roadHeight / 2);
	shape.lineTo(roadWidth / 2, roadHeight / 2);
	shape.lineTo(-roadWidth / 2, roadHeight / 2);
	shape.lineTo(-roadWidth / 2, -roadHeight / 2);

	const geometry = new THREE.ExtrudeGeometry(shape, {steps: 200,extrudePath: path});
	const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
	const road = new THREE.Mesh(geometry, material);

	addlamps(road, path);

	const ramp1 = makeRamp();

	const pointRamp1 = path.getPointAt(0.65);
	ramp1.position.x = pointRamp1.x;
	ramp1.position.y = pointRamp1.y;
	ramp1.position.z = pointRamp1.z;

	ramp1.rotation.y += Math.PI/8;

	road.add(ramp1);

	const ramp2 = makeRamp();

	const pointRamp2 = path.getPointAt(0.15);
	ramp2.position.x = pointRamp2.x;
	ramp2.position.y = pointRamp2.y;
	ramp2.position.z = pointRamp2.z;

	ramp2.rotation.y += Math.PI/2;

	road.add(ramp2);

	const tunel = makeTun();

	const pointTun = path.getPointAt(0.93);
	tunel.position.x = pointTun.x;
	tunel.position.y -= 0.5;
	tunel.position.z = pointTun.z;
	tunel.rotation.y = Math.PI/2;

	road.add(tunel);

    return road;
}

function addlamps(road, path){
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
		road.add(leftLamp1);
	  
		const rightLamp1 = makeLamp();
		rightLamp1.lookAt(point);
		rightLamp1.rotation.y += Math.PI;
		rightLamp1.position.set(right1.x, right1.y, right1.z);
		road.add(rightLamp1);

		const left2 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(offset)).add(tangent.clone().multiplyScalar(-3));
		const right2 = point.clone().add(tangent.clone().cross(new THREE.Vector3(0, -1, 0)).normalize().multiplyScalar(offset)).add(tangent.clone().multiplyScalar(6));
	  
		const leftLamp2 = makeLamp();
		leftLamp2.lookAt(point);
		leftLamp2.position.set(left2.x, left2.y, left2.z);
		road.add(leftLamp2);
	  
		const rightLamp2 = makeLamp();
		rightLamp2.lookAt(point);
		rightLamp2.rotation.y += Math.PI;
		rightLamp2.position.set(right2.x, right2.y, right2.z);
		road.add(rightLamp2);


	}
}

function makeTun(){
	const outerRadius = 5;
	const thickness = 0.3;
	const depth = 15; 

	const shape = new THREE.Shape();
	shape.absarc(0, 0, outerRadius, Math.PI, 0, false);
	shape.lineTo(-outerRadius, 0);

	const hole = new THREE.Path();
	hole.absarc(0, 0, outerRadius - thickness, Math.PI, 0, false);
	shape.holes.push(hole);

	const geometry = new THREE.ExtrudeGeometry(shape, {steps: 1,depth: depth, bevelEnabled: false});

	const material = new THREE.MeshPhongMaterial({ color: 0x8888ff });
	const tunel = new THREE.Mesh(geometry, material);

	tunel.rotation.x = Math.PI;

	return tunel
}

function makeRamp(){

	const rampaGeometry = new THREE.BoxGeometry(roadWidth, 0.5, roadWidth);
	const rampaMaterial = new THREE.MeshPhongMaterial({ color: 0xff5533 });
	
	const rampa = new THREE.Mesh(rampaGeometry, rampaMaterial);
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
	const material = new THREE.MeshPhongMaterial({ color: 0x424949 });
	const lamp =  new THREE.Mesh(tubeGeometry, material);
  
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