class Tronco extends THREE.Object3D {
    constructor() {
        super();

        this.tronco = this.crearTronco();

        this.tronco.position.y = 5.8;
        
        this.add(this.tronco);    
    
    }
    
    crearTronco(){

        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});
            
        var cilindroG = new THREE.CylinderGeometry(1.5, 1.2, 3, 40);
        var esferaG = new THREE.SphereGeometry (1.5, 40, 40);
        var material = new THREE.MeshPhongMaterial({color: 0xFF8000});
        this.pecho = new THREE.Mesh (cilindroG,metalNaranja);
        this.esfera = new THREE.Mesh (esferaG,metalNaranja);
        this.esfera.position.y = 1.6;

        this.esferas = this.crearEsferas();

        this.tuercaD = this.crearTuerca();
        this.tuercaD.position.z = 1.4;
        this.tuercaI = this.crearTuerca();
        this.tuercaI.position.z = -1.4;


        var tronco = new THREE.Object3D();
        
        tronco.add(this.pecho);
        tronco.add(this.esfera);
        tronco.add(this.esferas);
        tronco.add(this.tuercaI);
        tronco.add(this.tuercaD);

        return tronco;

    }

    crearEsferas(){

        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var esferaG = new THREE.SphereGeometry (0.25, 40, 40);
        var material = new THREE.MeshPhongMaterial({color: 0xc6c6c6});

        this.bola1 = new THREE.Mesh (esferaG,Metal);
        this.bola1.position.x = 1.1;
        this.bola1.position.z = -0.46;


        this.bola2 = new THREE.Mesh (esferaG,Metal);
        this.bola2.position.x = 0.46;
        this.bola2.position.z = -1.1;


        this.bola3 = new THREE.Mesh (esferaG,Metal);
        this.bola3.position.x = -0.46;
        this.bola3.position.z = -1.1;


        this.bola4 = new THREE.Mesh (esferaG,Metal);
        this.bola4.position.x = -1.1;
        this.bola4.position.z = -0.46;

        this.bola5 = new THREE.Mesh (esferaG,Metal);
        this.bola5.position.x = -1.1;
        this.bola5.position.z = 0.46;

        this.bola6 = new THREE.Mesh (esferaG,Metal);
        this.bola6.position.x = -0.46;
        this.bola6.position.z = 1.1;

        this.bola7 = new THREE.Mesh (esferaG,Metal);
        this.bola7.position.x = 0.46;
        this.bola7.position.z = 1.1;

        this.bola8 = new THREE.Mesh (esferaG,Metal);
        this.bola8.position.x = 1.1;
        this.bola8.position.z = 0.46;

        var esferas = new THREE.Object3D();
        
        esferas.add(this.bola1);
        esferas.add(this.bola2);
        esferas.add(this.bola3);
        esferas.add(this.bola4);
        esferas.add(this.bola5);
        esferas.add(this.bola6);
        esferas.add(this.bola7);
        esferas.add(this.bola8);

        esferas.position.y = -0.75;

        return esferas;
    }

    crearTuerca(){
        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var cilindroG = new THREE.CylinderGeometry(0.5, 0.5, .5, 6);
        var cilindroP = new THREE.CylinderGeometry(0.3, 0.3, .5, 40);

        var material = new THREE.MeshPhongMaterial({color: 0xc6c6c6});

        var cilGBSP = new ThreeBSP(cilindroG);
        var cilPBSP = new ThreeBSP(cilindroP);

        var conHueco = cilGBSP.subtract(cilPBSP);
        this.tuerca = conHueco.toMesh(Metal);

        this.tuerca.rotateX(Math.PI/2);
        this.tuerca.rotateY(0.55);
        this.tuerca.position.y = 1.5;

        return this.tuerca;
    }

    update () {
      
    }
}