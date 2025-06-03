import * as THREE from "three";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

import { cilindricBuilding , rectangleBuilding,  ovalBuild } from "./buildsGenerator.js";
import { buildRoad } from "./roadGenerator.js";
import { getRandomFloat, getRandomInt } from "./utils.js"
import {materials} from "./textures.js";

export function cityGenerator(physicsSimulator) {
  let city = new THREE.Group();

  const groundGeometry = new THREE.PlaneGeometry( 120, 120 );
  let ground = new THREE.Mesh( groundGeometry, materials["ground"]);

  ground.rotateX(Math.PI/2);
  ground.receiveShadow = true;

  const notPos = {
                1: [],
                2: [5,6,7],
                3: [4,5,6,7,8],
                4: [3,8,9],
                5: [2,4,5,6,9],
                6: [2,4,5,6,9],
                7: [2,4,5,6,9,10],
                8: [2,3,4,5,6,9,10],
                9: [6,7,8],
               10: [],
  }

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (notPos[i].includes(j)) {
        continue;
      }

      let builds = createBuilds((i-1) * 10 - 50, (j-1) * 10 - 50, physicsSimulator);
      city.add(builds);
    }
  }

  city.add(ground);

  let {road, rigidBodys} = buildRoad();

  city.add(road);

  const tunelGeometry = new THREE.BoxGeometry(14.8, 0.5, 4);
	const tunel1 = new THREE.Mesh(tunelGeometry, materials["tunel"]);
  tunel1.rotation.x = Math.PI/2;
  tunel1.position.set(10, 1,-5);

  const tunel2 = new THREE.Mesh(tunelGeometry, materials["tunel"]);
  tunel2.rotation.x = Math.PI/2;
  tunel2.position.set(10, 1, -15);

  physicsSimulator.addRigidBody(tunel2,0,0)
  physicsSimulator.addRigidBody(tunel1,0,0);
  rigidBodys.forEach((rg)=>{
    physicsSimulator.addRigidBody(rg,0,0);
  })

  return city;
}

function createBuilds(x, z, physicsSimulator){

  let neighborhood = new THREE.Group(); 
  
  let {fn, tapa} = getParametricFunction();

  let geometry = new ParametricGeometry(fn, 100, 100);

  const mat = () => {
    switch (getRandomInt(1,4)){
      case 1: return materials["build1"];
      case 2: return materials["build2"];
      case 3: return materials["build3"];
      case 4: return materials["build4"];
    }
  }

	let meshWall = new THREE.Mesh(geometry, mat());

  let xpos = x + getRandomFloat(2,8);
  let zpos = z + getRandomFloat(2, 8);

  const rigidBody = new THREE.CylinderGeometry(2.5, 2.5, 5, 16);
  const column = new THREE.Mesh(rigidBody, new THREE.MeshPhongMaterial({transparent:true, opacity: 0} ));
  column.position.set(xpos, 2.5, zpos);

  physicsSimulator.addRigidBody(column, 0, 0);

  neighborhood.add(column)

  meshWall.position.set(xpos, 0, zpos);

  meshWall.add(tapa)
  meshWall.castShadow = true;
  meshWall.receiveShadow = true;

  neighborhood.add(meshWall);
  
  return neighborhood;
}

function getParametricFunction(){

  const height = getRandomFloat(15, 25);
  const radiusC = getRandomFloat(1, 2);
  const angle1C = getRandomFloat(0, 1);
  const angle2C = getRandomFloat(0, 1);

  const width = getRandomFloat(2, 3);
  const angleR = getRandomFloat(Math.PI, Math.PI*2);

  const radius1 = getRandomFloat(0.5,1.5);
  const radius2 = getRandomFloat(0.5,1.5);
  const tope = getRandomInt(0.5,1);

  const type = getRandomInt(1,3);
  switch (type){
    case 1: const tapaC = new THREE.Mesh(createCapFromParametric(cilindricBuilding( height,  radiusC, angle1C, angle2C)), materials["road"]);
            tapaC.position.set(0, height,0);
            tapaC.rotation.x = Math.PI / 2;
            return { 
                    fn: cilindricBuilding( height,  radiusC, angle1C, angle2C),
                    tapa: tapaC
                  };
    case 2: let geometriaPlano = new THREE.PlaneGeometry(width || 2, width || 2);
            const tapaR = new THREE.Mesh(geometriaPlano, materials["techo"]);
            tapaR.rotation.x = Math.PI / 2;
            tapaR.rotation.z = angleR;
            tapaR.position.set(0, height,0);
            return {
                  fn: rectangleBuilding( height, width, angleR),
                  tapa: tapaR
                };
    case 3: const tapaO = new THREE.Mesh(createCapFromParametric(ovalBuild(height, radius1,  radius2, tope)), materials["road"]);
            tapaO.position.set(0, height, 0);
            tapaO.rotation.x = Math.PI / 2;
            return {
                    fn: ovalBuild(height, radius1,  radius2, tope),
                    tapa:  tapaO
                  };
  }
}

function createCapFromParametric(fn, segmentsU = 50) {
  const points = [];

  for (let i = 0; i <= segmentsU; i++) {
    const u = i / segmentsU;
    const target = new THREE.Vector3();
    fn(u, 1, target);
    points.push(new THREE.Vector2(target.x, target.z));
  }

  const shape = new THREE.Shape(points);
  const geometry = new THREE.ShapeGeometry(shape);

  return geometry;
}