class Brazo extends THREE.Object3D {
    constructor(tipo) {
        super();

        this.brazoEntero = this.crearBrazoAlto();
        this.parteBaja = this.crearBrazoBajo();
        this.mano = this.crearMano(tipo);
        

        this.parteBaja.add(this.mano);
        this.brazoEntero.add(this.parteBaja);

        if(tipo=="I"){
            var apertura = 0.3;
            var rotMano = 0.2;
        }
        if(tipo=="D"){
            var apertura=-0.3;
            var rotMano = 0.2;
        }
        this.brazoEntero.rotation.x = apertura;
        this.parteBaja.rotation.x = -apertura;
        this.mano.rotation.z = rotMano;
        
        this.add(this.brazoEntero);
        //this.add(this.mano);
    
    
    }

    crearBrazoAlto(){
        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var bolaM = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        this.hombro = new THREE.Mesh (bolaG, bolaM);
        this.hombro.scale.set (0.85,0.85,0.85);

        var paG = new THREE.CylinderGeometry(0.25, 0.25, 1, 15);
        var paM = new THREE.MeshPhongMaterial({color: 0xFF8000});
        this.pa = new THREE.Mesh (paG, paM);
        this.pa.position.y = -0.7;

        var parteAlta = new THREE.Object3D();
        parteAlta.add(this.hombro);
        parteAlta.add(this.pa);

        return parteAlta;
    }

    crearBrazoBajo(){

        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var bolaM = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        this.codo = new THREE.Mesh (bolaG, bolaM);
        this.codo.scale.set (0.85,0.85,0.85);

        var pbG = new THREE.CylinderGeometry(0.25, 0.25, 1.25, 15);
        var pbM = new THREE.MeshPhongMaterial({color: 0xFF8000});
        this.pb = new THREE.Mesh (pbG, pbM);
        this.pb.position.y = -0.645;

        var mediaPierna = new THREE.Object3D();
        mediaPierna.add(this.codo);
        mediaPierna.add(this.pb);
        mediaPierna.position.y = -1;

        return mediaPierna;

    }
    
    crearMano(tipo){

        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var cilG = new THREE.CylinderGeometry(0.4, 0.5, 0.75, 15);
        var gris = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        var naranja = new THREE.MeshPhongMaterial({color: 0xFF8000});

        this.esfera = new THREE.Mesh (bolaG, gris);
        this.cil = new THREE.Mesh (cilG, naranja);
        this.cil.position.y = -0.375;

        var mano = new THREE.Object3D();
        mano.add(this.cil);
        mano.add(this.esfera);

        if(tipo=="I"){
            var posDedosCentro = -0.3;
            var posDedosExterior = -0.1;
            var rotPulgar = 0.1;
            var rotDedos = 0.9;
        }
        if(tipo=="D"){
            var posDedosCentro = 0.3;
            var posDedosExterior = 0.1;
            var rotPulgar = -0.1;
            var rotDedos = -0.9;
        }

        this.dedo1 = this.crearDedo(tipo);
        mano.add(this.dedo1);
        this.dedo1.rotation.y = rotDedos;
        this.dedo1.position.x = -0.325;
        this.dedo1.position.z = posDedosExterior;

        this.dedo3 = this.crearDedo(tipo);
        mano.add(this.dedo3);
        this.dedo3.position.z = posDedosCentro;

        this.dedo4 = this.crearDedo(tipo);
        mano.add(this.dedo4);
        this.dedo4.rotation.y = -rotDedos;
        this.dedo4.position.x = 0.325;
        this.dedo4.position.z = posDedosExterior;

        this.pulgar = this.crearDedo(tipo);
        mano.add(this.pulgar);
        this.pulgar.scale.set(1,0.8,1);
        this.pulgar.rotation.y = Math.PI;
        this.pulgar.position.z = -posDedosCentro;
        this.pulgar.rotation.x = rotPulgar;

        mano.position.y = -1.425;

        return mano;

    }

    crearDedo(tipo){
    
        if(tipo=="I"){
            var apertura=0.1;
        }
        if(tipo=="D"){
            var apertura=-0.1;
        }

        var barraG = new THREE.BoxGeometry( 0.2, 0.4, 0.2);
        var barraM = new THREE.MeshPhongMaterial({color: 0xc6c6c6});

        this.pA = new THREE.Mesh (barraG, barraM);
        this.pB = new THREE.Mesh (barraG, barraM);

        this.pA.rotation.x = apertura;
        this.pB.rotation.x = -apertura;
        this.pB.position.y = -0.35;

        var dedo = new THREE.Object3D();
        dedo.add(this.pA);
        dedo.add(this.pB);

        dedo.position.y = -0.9;
        dedo.rotation.x = -apertura;
        
        return dedo;

    }

    update () {
      
    }
}