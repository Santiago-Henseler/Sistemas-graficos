import * as THREE from "three";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

import { cilindricBuilding , rectangleBuilding } from "./buildsGenerator.js";
import { buildRoad } from "./roadGenerator.js";
import { getRandomFloat, getRandomInt } from "./utils.js"


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

  const notPos = {
                1: [],
                2: [5,6,7],
                3: [4,5,6,7,8],
                4: [3,8,9],
                5: [2,4,5,6,9],
                6: [2,4,5,6,9],
                7: [2,4,5,6,9,10],
                8: [3,4,5,6,9],
                9: [6,7,8],
                10: [],
  }

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (notPos[i].includes(j)) {
        continue;
      }

      let builds = createBuilds((i-1) * 10 - 50, (j-1) * 10 - 50);
      city.add(builds);
    }
  }

  city.add(ground);

  city.add(buildRoad());

  return city;
}

function createBuilds(x, z){

  let neighborhood = new THREE.Group(); 

  let geometry = new ParametricGeometry(getParametricFunction(), 100, 100);
	let mesh = new THREE.Mesh(geometry, materials["build"]);

  mesh.position.set(x+ getRandomFloat(2, 6), 0, z+getRandomFloat(2, 6));
  neighborhood.add(mesh);
  
  return neighborhood;
}

function getParametricFunction(){
  const fn = getRandomInt(1,2);

  switch (fn){
    case 1: return cilindricBuilding( getRandomFloat(9, 15),  getRandomFloat(1, 2), getRandomFloat(0, 1), getRandomFloat(0, 1));
    case 2: return rectangleBuilding( getRandomFloat(9, 15), getRandomFloat(2, 3), getRandomFloat(Math.PI, Math.PI*2));
  }
   
}
