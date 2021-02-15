class Pierna extends THREE.Object3D {
    constructor(tipo) {
        super();

        this.piernaEntera = this.crearPAlta();
        this.parteBaja = this.crearPBaja();
        this.pie = this.crearPie();
        

        this.parteBaja.add(this.pie);
        this.piernaEntera.add(this.parteBaja);
        this.piernaEntera.position.y = 4.21;

        if(tipo=="I"){
            var apertura=0.15;
        }
        if(tipo=="D"){
            var apertura=-0.15;
        }
        this.piernaEntera.rotation.x = apertura;
        this.parteBaja.rotation.x = -apertura;


        
        this.add(this.piernaEntera);
        //this.add(this.pie);
    
    
    }

    crearPAlta(){
        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});

        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var bolaM = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        this.cadera = new THREE.Mesh (bolaG, Metal);
        this.cadera.scale.set (0.85,0.85,0.85);

        var paG = new THREE.CylinderGeometry(0.25, 0.25, 1.25, 15);
        var paM = new THREE.MeshPhongMaterial({color: 0xFF8000});
        this.pa = new THREE.Mesh (paG, metalNaranja);
        this.pa.position.y = -0.845;

        var parteAlta = new THREE.Object3D();
        parteAlta.add(this.cadera);
        parteAlta.add(this.pa);

        return parteAlta;
    }

    crearPBaja(){

        var gris= new THREE.TextureLoader().load('imgs/acero.jpg');
        var Metal = new THREE.MeshPhongMaterial({map: gris});

        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});

        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var bolaM = new THREE.MeshPhongMaterial({color: 0xc6c6c6});
        
        this.talon = new THREE.Mesh (bolaG, Metal);
        this.talon.position.y=-2.02;
        this.rodilla = new THREE.Mesh (bolaG, Metal);
    
        this.rodilla.scale.set (0.85,0.85,0.85);

        var pbG = new THREE.CylinderGeometry(0.25, 0.5, 1.5, 15);
        var pbM = new THREE.MeshPhongMaterial({color: 0xFF8000});
        this.pb = new THREE.Mesh (pbG, metalNaranja);
        this.pb.position.y = -0.97;

        var mediaPierna = new THREE.Object3D();
        mediaPierna.add(this.rodilla);
        mediaPierna.add(this.pb);
        mediaPierna.add(this.talon);
        mediaPierna.position.y = -1.69;

        return mediaPierna;

    }
    
    crearPie(){

        var shape = new THREE.Shape();

        shape.moveTo(1.625, 0);
        shape.lineTo(1.825, 0.2);
        shape.lineTo(1.625, 0.6);
        shape.lineTo(0.925, 0.8);
        shape.lineTo(0.225, 0.4);
        shape.lineTo(-0.475, 0.45);
        shape.lineTo(-0.675, 0.25);
        shape.lineTo(-0.525, 0);
    
        var extrudeSettings = { depth: 1, steps: 100, bevelSize: 0, bevelThickness: 0, bevelSegments: 100 };

        var pieG = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
        var pieM = new THREE.MeshPhongMaterial({color: 0xFF8000});
        var naranja= new THREE.TextureLoader().load('imgs/naranja.jpg');
        var metalNaranja = new THREE.MeshPhongMaterial({map: naranja});
        this.pie = new THREE.Mesh(pieG,metalNaranja);

        this.pie.position.set (0, -2.52, -0.5);

        return this.pie;

    }
    
    // crearPie(apertura, rotPierna, rotRod, rotPie){

    //     var shape = new THREE.Shape();

    //     shape.moveTo(1.625, 0);
    //     shape.lineTo(1.825, 0.2);
    //     shape.lineTo(1.625, 0.6);
    //     shape.lineTo(0.925, 0.8);
    //     shape.lineTo(0.225, 0.4);
    //     shape.lineTo(-0.475, 0.45);
    //     shape.lineTo(-0.675, 0.25);
    //     shape.lineTo(-0.525, 0);
    
    //     var extrudeSettings = { depth: 1, steps: 100, bevelSize: 0, bevelThickness: 0, bevelSegments: 100 };

    //     var pieG = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
    //     var pieM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.pie = new THREE.Mesh(pieG,pieM);
    //     this.pie.rotation.z = rotPie;
    //     this.pie.position.set (0, -2.52, -0.5);

    //     var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
    //     var bolaM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.talon = new THREE.Mesh (bolaG, bolaM);
    //     this.talon.position.y=-2.02;
    //     this.rodilla = new THREE.Mesh (bolaG, bolaM);
    //     this.rodilla.scale.set (0.85,0.85,0.85);
    //     this.cadera = new THREE.Mesh (bolaG, bolaM);
    //     this.cadera.scale.set (0.85,0.85,0.85);

    //     var pbG = new THREE.CylinderGeometry(0.25, 0.5, 1.5, 15);
    //     var pbM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.pb = new THREE.Mesh (pbG, pbM);
    //     this.pb.position.y = -0.97;

    //     var paG = new THREE.CylinderGeometry(0.25, 0.25, 1.25, 15);
    //     var paM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.pa = new THREE.Mesh (paG, paM);
    //     this.pa.position.y = -0.845;

    //     var mediaPierna = new THREE.Object3D();
    //     mediaPierna.add(this.rodilla);
    //     mediaPierna.add(this.pb);
    //     mediaPierna.add(this.talon);
    //     mediaPierna.add(this.pie);
    //     mediaPierna.rotation.z = rotRod;
    //     mediaPierna.rotation.x = -apertura;
    //     mediaPierna.position.y = -1.69;
        
    //     var piernaEntera = new THREE.Object3D();
    //     piernaEntera.add(this.cadera);
    //     piernaEntera.add(this.pa);
    //     piernaEntera.add(mediaPierna);
    //     piernaEntera.rotation.z = rotPierna;
    //     piernaEntera.rotation.x = apertura;
    //     piernaEntera.position.y = 4.21;



    //     return piernaEntera;
        
    // }

    update () {
      
    }
}