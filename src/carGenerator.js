import * as THREE from "three";

export class Car {

    chassis;
    wheels=[];

    constructor() {
        // chassis
        const geometry = new THREE.BoxGeometry(2, 1, 4);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.chassis = new THREE.Mesh(geometry, material);   

        // add spolight on the front of the car
        const light = new THREE.SpotLight(0xffDD99, 100);    
        light.decay = 1;
        light.penumbra = 0.5;
        
        light.position.set(0, 0, -2);
        light.target.position.set(0, 0,-10);
        this.chassis.add(light.target);
        this.chassis.add(light );  

        // wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 16);
        wheelGeometry.rotateZ(Math.PI * 0.5);
        const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, wireframe: true });

        for (let i = 0; i < 4; i++) {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);                
            this.chassis.add(wheel);
            wheel.position.set(10*i,2,20*i)
            this.wheels.push(wheel);
        };
    }   

    getCar() {
        return this.chassis;
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
                    wheel.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
                }
            })
        }
      }

}
