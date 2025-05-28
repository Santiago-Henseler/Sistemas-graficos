import * as THREE from "three";

export function cilindricBuilding(height, radius, angle1, angle2) {
	return function (u, v, target) {

		let x = radius * Math.cos(u*2*Math.PI) + angle1 * Math.sin(v*Math.PI*2) + angle2 * Math.sin(u*Math.PI*2);
		let z = radius * Math.sin(u*2*Math.PI) + angle1 * Math.sin(v*Math.PI*2) + angle2 * Math.sin(u*Math.PI*2);
		
		let y = height * v;

		target.set(x, y, z);
	};
}

export function rectangleBuilding(height, width, angle) {
	return function (u, v, target) {
		const face = Math.floor(u * 6);
		const localU = (u * 6) % 1;
	
		let x = 0, y = v * height, z = 0;
	
		switch (face) {
			case 0: // frontal
				x = (localU - 0.5) * width;
				z = width / 2;
				break;
			case 1: // derecha
				x = width / 2;
				z = (0.5 - localU) * width;
				break;
			case 2: // trasera
				x = (0.5 - localU) * width;
				z = -width / 2;
				break;
			case 3: // izquierda
				x = -width / 2;
				z = (localU - 0.5) * width;
				break;

		}
	
		let twistedX = Math.cos( v * angle) * x -  Math.sin( v * angle) * z;
		let twistedZ =  Math.sin( v * angle) * x + Math.cos( v * angle) * z;

		target.set(twistedX, y, twistedZ);
	};
}

export function ovalBuild(height, radius1, radius2, tope) {
    return function (u, v, target) {
		let x = (radius1 * Math.cos(u*2*Math.PI))*(1+tope-v);
		let z = (radius2 * Math.sin(u*2*Math.PI))*(1+tope-v);
		
		let y = height * v;

		target.set(x, y, z);
    }
}