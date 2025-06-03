import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {materials} from "./textures.js";

export class Car {

    chassis;
    wheels=[];
    cam1;
    cam2;

    constructor(scene) {
        const loader = new GLTFLoader();
        loader.load('models/cybertruck.glb', (gltf) => {
            gltf.scene;
    
            gltf.scene.traverse((child)=>{
                if(child.name == "chassis"){
                    child.material=materials["chasis"];
                }
                if(child.name == "rearLights"){
                    child.material = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xff0000, emissiveIntensity: 1.0  })
                }
                if(child.name == "windows"){
                    child.material = new THREE.MeshPhysicalMaterial({color: 0xffffff, metalness: 0, roughness: 0, transmission: 1.0, thickness: 0.1, transparent: true, opacity: 0.2});
                      
                }

            })

            const target = gltf.scene.getObjectByName("person");
            gltf.scene.remove(target)

            this.chassis = gltf.scene.getObjectByName("cybertruck");

            this.wheels.push(this.chassis.getObjectByName("wheelBackLeft"));
            this.wheels.push(this.chassis.getObjectByName("wheelBackRight"));
            this.wheels.push(this.chassis.getObjectByName("wheelFrontLeft"));
            this.wheels.push(this.chassis.getObjectByName("wheelFrontRight"));

            // add spolight on the front of the car
            const light = new THREE.SpotLight(0xffDD99, 100);    
            light.decay = 1;
            light.penumbra = 0.5;
            
            light.position.set(0, 0.2, -2.7);
            light.target.position.set(0, 0, -10);
            this.chassis.add(light.target);
            this.chassis.add(light);  

            let camera1 = new THREE.PerspectiveCamera(
                100,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.cam1 = camera1;
            this.chassis.add(this.cam1);
            this.cam1.position.set(0, 1, -1.6);

            let camera2 = new THREE.PerspectiveCamera(
                100,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.cam2 = camera1;
            this.chassis.add(this.cam2);
            this.cam2.position.set(0, 4, 4);

            scene.add(this.chassis)
          });
    }   

    getCam1(){
        return this.cam1;
    }


    getCam2(){
        return this.cam2;
    }


    updateVehicleTransforms(physicsSimulator) {
        const vt = physicsSimulator.getVehicleTransform();
        if (this.chassis && vt) {
            const { position, quaternion } = vt;                
            this.chassis.position.set(position.x, position.y, position.z);
            this.chassis.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w); 
            
            this.wheels.forEach((wheel, index) => {
                const wheelTransform = physicsSimulator.getWheelTransform(index);
                if (wheelTransform) {
                    const { position, quaternion } = wheelTransform;
                    wheel.position.set(position.x, position.y, position.z);
                    
                }
            })
        }
      }

}
