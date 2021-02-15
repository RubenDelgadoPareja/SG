class Cabeza extends THREE.Object3D {
    constructor() {
        super();

        this.tronco = this.crearCabeza();

        this.tronco.position.y = 10.6;
        
        this.add(this.tronco);    
    
    }
    
    crearCabeza(){

        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});
            
        var cilindroGGrande = new THREE.CylinderGeometry(1.2, 1, 1.5, 40);
        var cilindroGPEquenio = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 40);
        var esferaGGrande = new THREE.SphereGeometry (1, 40, 40);
        var esferaGPequeña = new THREE.SphereGeometry (1.2, 40, 40);
        var naranja = new THREE.MeshPhongMaterial({color: 0xFF8000});
        var gris = new THREE.MeshPhongMaterial({color: 0xc6c6c6});

        this.craneo = new THREE.Mesh (esferaGPequeña,metalNaranja);
        this.craneo.position.y = 0.75;

        this.cara = new THREE.Mesh (cilindroGGrande,metalNaranja);
        
        this.varbilla = new THREE.Mesh (esferaGGrande,metalNaranja);
        this.varbilla.position.y = -0.65;

        this.cuello = new THREE.Mesh (cilindroGPEquenio, Metal);
        this.cuello.position.y = -1.65;

        this.ojos = this.crearOjos();
        this.ojos.position.set(1,0.25,0);

        this.boca = this.crearBoca();
        this.boca.position.set(1,-0.75,0);

        this.cejas = this.crearCejas();
        this.cejas.position.set(1.1,0.65,0);

        this.antenas = this.crearAntenas();

        var cabeza = new THREE.Object3D();
        
        cabeza.add(this.cara);
        cabeza.add(this.craneo);
        cabeza.add(this.varbilla);
        cabeza.add(this.cuello);
        cabeza.add(this.ojos);
        cabeza.add(this.boca);
        cabeza.add(this.cejas);
        cabeza.add(this.antenas);

        return cabeza;

    }

    crearOjos(){

        var ojo= new THREE.TextureLoader().load('imgs/ojo.png');
        var textOjo = new THREE.MeshPhongMaterial({map: ojo});

        var esferaG = new THREE.SphereGeometry (0.25, 40, 40);
        
        this.ojoIzq = new THREE.Mesh(esferaG,textOjo);
        this.ojoIzq.position.z = -0.5;

        this.ojoDer = new THREE.Mesh(esferaG,textOjo);
        this.ojoDer.position.z = 0.5;

        var ojos = new THREE.Object3D();
        ojos.add(this.ojoIzq);
        ojos.add(this.ojoDer);

        return ojos;
    }

    crearBoca(){
        var barraG = new THREE.BoxGeometry( 0.1, 0.1, 0.4);
        var negro = new THREE.MeshPhongMaterial({color: 0x000000});

        this.izq = new THREE.Mesh (barraG, negro);
        this.centro = new THREE.Mesh (barraG, negro);
        this.der = new THREE.Mesh (barraG, negro);

        this.centro.position.y = -0.05;

        this.izq.rotation.x = -0.5;
        this.izq.position.y = 0.05;
        this.izq.position.z = 0.35;

        this.der.rotation.x = 0.5;
        this.der.position.y = 0.05;
        this.der.position.z = -0.35;

        var boca = new THREE.Object3D();
        boca.add(this.izq);
        boca.add(this.centro);
        boca.add(this.der);
        
        return boca;

    }

    crearCejas(){
        var pelo= new THREE.TextureLoader().load('imgs/pelo.jpg');
        var textPelo = new THREE.MeshPhongMaterial({map: pelo});

        var barraG = new THREE.BoxGeometry( 0.1, 0.1, 0.4);
        var negro = new THREE.MeshPhongMaterial({color: 0x000000});

        this.izq = new THREE.Mesh (barraG, textPelo);
        this.der = new THREE.Mesh (barraG, textPelo);

        this.izq.position.z = 0.55;
        this.izq.rotation.x = 0.1;
        this.der.position.z = -0.55;
        this.der.rotation.x = -0.1;

        var cejas = new THREE.Object3D();
        cejas.add(this.izq);
        cejas.add(this.der);
        
        return cejas;

    }

    crearAntenas(){

        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});

        var rojo= new THREE.TextureLoader().load('imgs/rojo.jpg');
        var metalRojo = new THREE.MeshPhongMaterial({map: rojo});

        var esferaGG = new THREE.SphereGeometry (0.25, 40, 40);
        var esferaPG = new THREE.SphereGeometry (0.15, 40, 40);
        var cilindroG = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 40);
        var naranja = new THREE.MeshPhongMaterial({color: 0xFF8000});
        var rojo = new THREE.MeshPhongMaterial({color: 0xFF0000});
        var gris = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        
        this.pointLightIzq =new THREE.PointLight (0xff0000, 0.1,50);
        this.pointLightIzq.visible = true;
        this.bolaIzq = new THREE.Mesh(esferaGG,metalNaranja);
        this.bolaIzq.position.z = -1.05;
        this.pointLightIzq.position.set(0,10,-1.05);
        this.antenaIzq = new THREE.Mesh(cilindroG,Metal);
        this.antenaIzq.position.set(0, 0.75, -1.25);
        this.antenaIzq.rotation.x = -0.1;

        this.pointLightDer =new THREE.PointLight (0xff0000, 0.1,50);
        this.pointLightDer.visible = true;
        this.bolaDer = new THREE.Mesh(esferaGG,metalNaranja);
        this.bolaDer.position.z = 1.05;
        this.pointLightDer.position.set(0,10,1.05);
        this.antenaDer = new THREE.Mesh(cilindroG,Metal);
        this.antenaDer.position.set(0, 0.75, 1.25);
        this.antenaDer.rotation.x = 0.1;

        this.puntaIzq = new THREE.Mesh(esferaPG,metalRojo);
        this.puntaIzq.position.y = 1.5;
        this.puntaIzq.position.z = -1.32;
        this.puntaDer = new THREE.Mesh(esferaPG,metalRojo);
        this.puntaDer.position.y = 1.5;
        this.puntaDer.position.z = 1.32;


        var antenas = new THREE.Object3D();
        antenas.add(this.pointLightIzq);
        antenas.add(this.pointLightDer);
        antenas.add(this.bolaIzq);
        antenas.add(this.antenaIzq);
        antenas.add(this.bolaDer);
        antenas.add(this.antenaDer);
        antenas.add(this.puntaIzq);
        antenas.add(this.puntaDer);

        return antenas;
    }

    update () {
      
    }
}