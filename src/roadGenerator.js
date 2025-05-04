import * as THREE from "three";


export function buildRoad(){

	let curvas = [];

	const curve1 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(10, 0, 0),
		new THREE.Vector3(20, 0, 0)
	);
	curvas.push(curve1);
	const curve2 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, 0),
		new THREE.Vector3(24, 0, -2.5),
		new THREE.Vector3(26, 0, -5.5),
		new THREE.Vector3(20, 0, -8)
	);
	curvas.push(curve2);
	const curve3 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(20, 0, -8),
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-20, 0, -18)
	);
	curvas.push(curve3);
	const curve4 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-20, 0, -18),
		new THREE.Vector3(-26, 0, -18),
		new THREE.Vector3(-27, 0, -10),
		new THREE.Vector3(-27, 0, -10)
	);
	curvas.push(curve4);
	const curve5 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-27, 0, -10),
		new THREE.Vector3(-28, 0, 0),
		new THREE.Vector3(-28, 0, 5),
		new THREE.Vector3(-20, 0, 8)
	);
	curvas.push(curve5);
	const curve6 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-20, 0, 8),
		new THREE.Vector3(-10, 0, 10)
	);
	curvas.push(curve6);
	const curve7 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-10, 0, 10),
		new THREE.Vector3(-10, 0, 10),
		new THREE.Vector3(-10, 0, 30),
		new THREE.Vector3(-10, 0, 30)
	);
	curvas.push(curve7);
	const curve8 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(4, 0, -5),
		new THREE.Vector3(3.8, 0, -7),
		new THREE.Vector3(2.5, 0, -7.8),
		new THREE.Vector3(0, 0, -7.65)
	);
	//curvas.push(curve8);
	const curve9 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, -7.65),
		new THREE.Vector3(-3.2, 0, -6.9),
		new THREE.Vector3(-3.5, 0, -5),
		new THREE.Vector3(-3.88, 0, -3.2)
	);
	//curvas.push(curve9);
	const curve10 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-3.88, 0, -3.2),
		new THREE.Vector3(-3.88, 0, -3.2),
		new THREE.Vector3(-4, 0, -3.2),
		new THREE.Vector3(-4.28, 0, -3.2)
	);
	//curvas.push(curve10);
	const curve11 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-4.28, 0, -3.2),
		new THREE.Vector3(-4.28, 0, -3.2),
		new THREE.Vector3(-4.28, 0, -3.2),
		new THREE.Vector3(-4.28, 0, -8.57)
	);
	//curvas.push(curve11);
	const curve12 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-4.28, 0, -8.57),
		new THREE.Vector3(-4.28, 0, -8.57),
		new THREE.Vector3(-4.28, 0, -8.57),
		new THREE.Vector3(-3.88, 0, -8.57)
	);
	//curvas.push(curve12);
	const curve13 = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-3.88, 0, -8.57),
		new THREE.Vector3(-3.5, 0, -6.8),
		new THREE.Vector3(-2.3, 0, -8.1),
		new THREE.Vector3(0, 0, -8.5)
	);
	//curvas.push(curve13);
	
	let points = []
	for(let i of curvas){
		points = points.concat(i.getPoints(50));
	}

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial({ color: 0xffffff });
	const curveObject = new THREE.Line(geometry, material);


/*

	const path = new THREE.CurvePath();
	path.add()

	const roadWidth = 2;
	const roadHeight = 0.01;

	const shape = new THREE.Shape();
	shape.moveTo(-roadWidth / 2, 0);
	shape.lineTo( roadWidth / 2, 0);
	shape.lineTo( roadWidth / 2, -roadHeight);
	shape.lineTo(-roadWidth / 2, -roadHeight);
	shape.lineTo(-roadWidth / 2, 0);

	const geometry = new THREE.ExtrudeGeometry(shape, {steps: 100,extrudePath: path});
	const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);*/

    return curveObject;
}




