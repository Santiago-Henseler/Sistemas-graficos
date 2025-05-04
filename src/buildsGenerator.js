

export function cilindricBuilding(height, radius) {
	return function (u, v, target) {

		const x = radius * Math.cos(u*2*Math.PI) + 0.3 * Math.sin(v*Math.PI*2) + 0.5 * Math.sin(u*Math.PI*2);
		const z = radius * Math.sin(u*2*Math.PI) +  0.3 * Math.sin(v*Math.PI*2) + 0.5 * Math.sin(u*Math.PI*2);
		
		const y = height * v;
		
		target.set(x, y, z);
	};
}