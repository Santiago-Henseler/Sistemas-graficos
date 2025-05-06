import * as THREE from "three";


export function buildRoad(){
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


	const roadWidth = 5;
	const roadHeight = 0.1;

	const shape = new THREE.Shape();
	shape.moveTo(-roadWidth / 2, -roadHeight / 2);
	shape.lineTo(roadWidth / 2, -roadHeight / 2);
	shape.lineTo(roadWidth / 2, roadHeight / 2);
	shape.lineTo(-roadWidth / 2, roadHeight / 2);
	shape.lineTo(-roadWidth / 2, -roadHeight / 2);

	const geometry = new THREE.ExtrudeGeometry(shape, {steps: 200,extrudePath: path});
	const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
}




