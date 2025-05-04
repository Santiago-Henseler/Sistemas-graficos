import * as THREE from "three";


export function buildRoad(){

	const path = new THREE.CurvePath();
	
	const curve1 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(10, 0, 0),
		new THREE.Vector3(20, 0, 0)
	);
	path.add(curve1);
	const curve2 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, 0),
		new THREE.Vector3(24, 0, -2.5),
		new THREE.Vector3(26, 0, -5.5),
		new THREE.Vector3(20, 0, -8)
	);
	path.add(curve2);
	const curve3 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, -8),
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-20, 0, -18)
	);
	path.add(curve3);
	const curve4 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-26, 0, -18),
		new THREE.Vector3(-27, 0, -10),
		new THREE.Vector3(-27, 0, -10)
	);
	path.add(curve4);
	const curve5 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-27, 0, -10),
		new THREE.Vector3(-28, 0, 0),
		new THREE.Vector3(-28, 0, 5),
		new THREE.Vector3(-20, 0, 8)
	);
	path.add(curve5);
	const curve6 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-9, 0, 10)
	);
	path.add(curve6);
	const curve7 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-9, 0, 10),
		new THREE.Vector3(-8, 0, 10),
		new THREE.Vector3(-8, 0, 30),
		new THREE.Vector3(-8, 0, 30)
	);
	path.add(curve7);
	const curve8 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-8, 0, 30),
		new THREE.Vector3(-8, 0, 38),
		new THREE.Vector3(-8, 0, 38),
		new THREE.Vector3(0, 0, 38)
	);
	path.add(curve8);
	const curve9 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 38),
		new THREE.Vector3(0, 0, 38),
		new THREE.Vector3(0, 0, 38),
		new THREE.Vector3(10, 0, 38)
	);
	path.add(curve9);
	const curve10 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(10, 0, 38),
		new THREE.Vector3(22, 0, 38),
		new THREE.Vector3(25, 0, 38),
		new THREE.Vector3(20, 0, 28)
	);
	path.add(curve10);
	const curve11 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, 28),
		new THREE.Vector3(20, 0, 28),
		new THREE.Vector3(20, 0, 28),
		new THREE.Vector3(0, 0, 10)
	);
	path.add(curve11);
	const curve12 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 10),
		new THREE.Vector3(-8, 0, 2),
		new THREE.Vector3(-5, 0, 0),
		new THREE.Vector3(0, 0, 0)
	);
	path.add(curve12);
	const curve13 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-3.88, 0, -8.57),
		new THREE.Vector3(-3.5, 0, -6.8),
		new THREE.Vector3(-2.3, 0, -8.1),
		new THREE.Vector3(0, 0, -8.5)
	);
	
	const roadWidth = 2;
	const roadHeight = 0.05;

	const shape = new THREE.Shape();
	shape.moveTo(-roadWidth / 2, 0);
	shape.lineTo( roadWidth / 2, 0);
	shape.lineTo( roadWidth / 2, -roadHeight);
	shape.lineTo(-roadWidth / 2, -roadHeight);
	shape.lineTo(-roadWidth / 2, 0);

	const geometry = new THREE.ExtrudeGeometry(shape, {steps: 1000,extrudePath: path});
	const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);

    return curveObject;
}




