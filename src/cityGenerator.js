import * as THREE from "three";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

import { cilindricBuilding } from "./buildsGenerator.js";
import { buildRoad } from "./roadGenerator.js";


const materials = {
  "ground": new THREE.MeshPhongMaterial ( {color: 0xF38E87, side: THREE.DoubleSide} ),
  "build": new THREE.MeshPhongMaterial  ( {color: 0xFFFFFF, side: THREE.DoubleSide} ),

}

export function cityGenerator() {
  let city = new THREE.Group();

  const gridHelper = new THREE.GridHelper(100, 10);
  city.add(gridHelper);

  const groundGeometry = new THREE.PlaneGeometry( 100, 100 );
  let ground = new THREE.Mesh( groundGeometry, materials["ground"] );
  ground.rotateX(Math.PI/2);

  for(let i = 0; i < 2; i++){
    for(let j = 0; j < 2; j++){
      let builds = createBuilds(i*10-50, j*10-50);
      //city.add(builds);
    }
  }

  city.add(ground);


  city.add(buildRoad())
  return city;
}

function createBuilds(x, z){

  let neighborhood = new THREE.Group(); 

  let geometry = new ParametricGeometry(cilindricBuilding(5, 1), 100, 100);
	let mesh = new THREE.Mesh(geometry, materials["build"]);

  mesh.position.set(x+1, 0, z+1);
  neighborhood.add(mesh);
  
  let mesh2 = mesh.clone()

  mesh2.position.set(x+5, 0, z+5);

  neighborhood.add(mesh2);

  return neighborhood;
}
