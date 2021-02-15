class Pierna extends THREE.Object3D {
    constructor(tipo, rotPierna, rotRod, rotPie) {
        super();
        
        if(tipo=="I"){
            var apertura=0.1;
        }
        if(tipo=="D"){
            var apertura=-0.1;
        }
        var rotPierna = rotPierna;
        var rotRod = rotRod;
        var rotPie = rotPie;


        var pie = this.crearPie(apertura, rotPierna, rotRod, rotPie);

        // this.pie = this.crearPie();
        // this.parteBaja = this.crearPBaja();

        this.add(pie);
        // this.add(this.parteBaja);
    
    }

    // crearPBaja(){

    //     var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
    //     var bolaM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.talon = new THREE.Mesh (bolaG, bolaM);
    //     this.talon.position.y=-2.02;
    //     this.rodilla = new THREE.Mesh (bolaG, bolaM);
    //     this.rodilla.scale.set (0.85,0.85,0.85);

    //     var pbG = new THREE.CylinderGeometry(0.25, 0.5, 1.5, 15);
    //     var pbM = new THREE.MeshPhongMaterial({color: 0xCF0000});
    //     this.pb = new THREE.Mesh (pbG, pbM);
    //     this.pb.position.y = -0.97;

    //     var mediaPierna = new THREE.Object3D();
    //     mediaPierna.add(this.rodilla);
    //     mediaPierna.add(this.pb);
    //     mediaPierna.add(this.talon);
    //     mediaPierna.rotation.z = rotRod;
    //     mediaPierna.rotation.x = -apertura;
    //     mediaPierna.position.y = -1.69;

    //     return mediaPierna;

    // }
    
    // crearPie(){

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

    //     return this.pie;

    // }
    
    crearPie(apertura, rotPierna, rotRod, rotPie){

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
        var pieM = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.pie = new THREE.Mesh(pieG,pieM);
        this.pie.rotation.z = rotPie;
        this.pie.position.set (0, -2.52, -0.5);

        var bolaG = new THREE.SphereGeometry( 0.4, 15, 15, 0, Math.PI * 2);
        var bolaM = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.talon = new THREE.Mesh (bolaG, bolaM);
        this.talon.position.y=-2.02;
        this.rodilla = new THREE.Mesh (bolaG, bolaM);
        this.rodilla.scale.set (0.85,0.85,0.85);
        this.cadera = new THREE.Mesh (bolaG, bolaM);
        this.cadera.scale.set (0.85,0.85,0.85);

        var pbG = new THREE.CylinderGeometry(0.25, 0.5, 1.5, 15);
        var pbM = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.pb = new THREE.Mesh (pbG, pbM);
        this.pb.position.y = -0.97;

        var paG = new THREE.CylinderGeometry(0.25, 0.25, 1.25, 15);
        var paM = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.pa = new THREE.Mesh (paG, paM);
        this.pa.position.y = -0.845;

        var mediaPierna = new THREE.Object3D();
        mediaPierna.add(this.rodilla);
        mediaPierna.add(this.pb);
        mediaPierna.add(this.talon);
        mediaPierna.add(this.pie);
        mediaPierna.rotation.z = rotRod;
        mediaPierna.rotation.x = -apertura;
        mediaPierna.position.y = -1.69;
        
        var piernaEntera = new THREE.Object3D();
        piernaEntera.add(this.cadera);
        piernaEntera.add(this.pa);
        piernaEntera.add(mediaPierna);
        piernaEntera.rotation.z = rotPierna;
        piernaEntera.rotation.x = apertura;
        piernaEntera.position.y = 4.21;



        return piernaEntera;
        
    }
    
    update () {
      
    }
}