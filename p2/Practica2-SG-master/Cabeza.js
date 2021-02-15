class Cabeza extends THREE.Object3D {
    constructor() {
        super();

        this.tronco = this.crearCabeza();

        this.tronco.position.y = 10.6;
        
        this.add(this.tronco);    
    
    }
    
    crearCabeza(){
            
        var cilindroGGrande = new THREE.CylinderGeometry(1.2, 1, 1.5, 40);
        var cilindroGPEquenio = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 40);
        var esferaGGrande = new THREE.SphereGeometry (1, 40, 40);
        var esferaGPequeña = new THREE.SphereGeometry (1.2, 40, 40);
        var naranja = new THREE.MeshPhongMaterial({color: 0xFF8000});
        var gris = new THREE.MeshPhongMaterial({color: 0xc6c6c6});

        this.craneo = new THREE.Mesh (esferaGPequeña,naranja);
        this.craneo.position.y = 0.75;

        this.cara = new THREE.Mesh (cilindroGGrande,naranja);
        
        this.varbilla = new THREE.Mesh (esferaGGrande,naranja);
        this.varbilla.position.y = -0.65;

        this.cuello = new THREE.Mesh (cilindroGPEquenio, gris);
        this.cuello.position.y = -1.65;

        this.ojos = this.crearOjos();
        this.ojos.position.set(1,0.25,0);

        this.boca = this.crearBoca();
        this.boca.position.set(1,-0.75,0);

        this.cejas = this.crearCejas();
        this.cejas.position.set(1.1,0.6,0);

        var cabeza = new THREE.Object3D();
        
        cabeza.add(this.cara);
        cabeza.add(this.craneo);
        cabeza.add(this.varbilla);
        cabeza.add(this.cuello);
        cabeza.add(this.ojos);
        cabeza.add(this.boca);
        cabeza.add(this.cejas);

        return cabeza;

    }

    crearOjos(){
        var esferaG = new THREE.SphereGeometry (0.25, 40, 40);
        var cilindroG = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 40);
        var blanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        var negro = new THREE.MeshPhongMaterial({color: 0x000000});

        this.ojoIzq = new THREE.Mesh(esferaG,blanco);
        this.ojoIzq.position.z = -0.5;
        this.pupilaIzq = new THREE.Mesh(cilindroG,negro);
        this.pupilaIzq.position.x = 0.225;
        this.pupilaIzq.position.z = -0.5;
        this.pupilaIzq.rotation.z = Math.PI/2;

        this.ojoDer = new THREE.Mesh(esferaG,blanco);
        this.ojoDer.position.z = 0.5;
        this.pupilaDer = new THREE.Mesh(cilindroG,negro);
        this.pupilaDer.position.x = 0.225;
        this.pupilaDer.position.z = 0.5;
        this.pupilaDer.rotation.z = Math.PI/2;

        var ojos = new THREE.Object3D();
        ojos.add(this.ojoIzq);
        ojos.add(this.ojoDer);
        ojos.add(this.pupilaIzq);
        ojos.add(this.pupilaDer);

        return ojos;
    }

    crearBoca(){
        var barraG = new THREE.BoxGeometry( 0.1, 0.1, 0.4);
        var blanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

        this.izq = new THREE.Mesh (barraG, blanco);
        this.centro = new THREE.Mesh (barraG, blanco);
        this.der = new THREE.Mesh (barraG, blanco);

        this.izq.rotation.x = -0.3;
        this.izq.position.y = 0.05;
        this.izq.position.z = 0.35;

        this.der.rotation.x = 0.3;
        this.der.position.y = 0.05;
        this.der.position.z = -0.35;

        var boca = new THREE.Object3D();
        boca.add(this.izq);
        boca.add(this.centro);
        boca.add(this.der);
        
        return boca;

    }

    crearCejas(){
        var barraG = new THREE.BoxGeometry( 0.1, 0.1, 0.4);
        var negro = new THREE.MeshPhongMaterial({color: 0x000000});

        this.izq = new THREE.Mesh (barraG, negro);
        this.der = new THREE.Mesh (barraG, negro);

        this.izq.position.z = 0.5;
        this.der.position.z = -0.5;

        var cejas = new THREE.Object3D();
        cejas.add(this.izq);
        cejas.add(this.der);
        
        return cejas;

    }

    update () {
      
    }
}