class MyScene extends THREE.Scene {

    
    constructor (myCanvas) {
      super();
      this.andar = false;
      this.sentarse = false;
      this.renderer = this.createRenderer(myCanvas);
      
      this.gui = this.createGUI ();
      
      this.createLights ();
      
      this.createCamera ();
      
      this.ejes = new THREE.AxesHelper (5);
      this.add(this.ejes);

      this.piernaIzq = new Pierna("I");
      //this.cuerpo.add (this.piernaIzq);
      this.piernaIzq.position.z = -0.75;
      this.piernaIzq.position.y = 0;

      this.piernaDer = new Pierna("D");
      //this.cuerpo.add (this.piernaDer);
      this.piernaDer.position.z = 0.75;
      this.piernaDer.position.y = 0;

      this.tronco = new Tronco();
      this.tronco.add (this.piernaDer);
      this.tronco.add (this.piernaIzq);

      this.brazoIzq = new Brazo("I");
      this.tronco.add (this.brazoIzq);
      this.brazoIzq.position.z = -1.6;
      this.brazoIzq.position.y = 7.3;
      //this.brazoIzq.position.x = 0;
           

      this.brazoDer = new Brazo("D");
      this.tronco.add (this.brazoDer);
      this.brazoDer.position.z = 1.6;
      this.brazoDer.position.y = 7.3;

      this.cabeza = new Cabeza();
      this.tronco.add (this.cabeza);


      this.add(this.tronco);

      
      

      //ANIMACION
      /*this.tl1 = new TimelineMax().delay(.3);
      this.tl1.to(this.piernaDer.piernaEntera.rotation, .65, {z: 0.4, ease: Expo.easeOut})
      this.tl1.to(this.piernaDer.parteBaja.rotation, .65, {z: -0.3, ease: Expo.easeOut}, "=-.3")
      this.tl1.to(this.piernaDer.pie.rotation, .65, {z: -0.1, ease: Expo.easeOut}, "=-.5")
      this.tl1.to(this.piernaIzq.piernaEntera.rotation, .65, {z: -0.25, ease: Expo.easeOut}, "=-.5")   
      this.tl1.to(this.piernaIzq.parteBaja.rotation, .65, {z: -0.25, ease: Expo.easeOut}, "=-.3")   
      this.tl1.to(this.piernaIzq.pie.rotation, .65, {z: 0.05, ease: Expo.easeOut}, "=-.5")
      this.tl2 = new TimelineMax().delay(0);
      this.tl2.to(this.brazoIzq.brazoEntero.rotation, .65, {z: 0.4, ease: Expo.easeOut})
      this.tl2.to(this.brazoIzq.parteBaja.rotation, .65, {z: 0.3, ease: Expo.easeOut}, "=-.3")
      this.tl2.to(this.brazoDer.brazoEntero.rotation, .65, {z: -0.25, ease: Expo.easeOut}, "=-.5")   
      this.tl2.to(this.brazoDer.parteBaja.rotation, .65, {z: 0.25, ease: Expo.easeOut}, "=-.3")  
*/
      //Animacion de Andar
      var that = this;
      this.tweenAndar = new TWEEN.Group();

      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/

      // ANIMACION BRAZO IZQUIERDO PARTE ALTA
      var atrasOrigenBrazoIzqPA = {x:0,y:0, z:0, rotation:-Math.PI/4};
      var atrasDestinoBrazoIzqPA = {x:0, y:0, z:0, rotation:Math.PI/4 };
    
      var alanteOrigenBrazoIzqPA = {x:0,y:0, z:0, rotation:Math.PI/4};
      var alanteDestinoBrazoIzqPA = {x:0, y:0, z:0, rotation:-Math.PI/4 };

      this.movBrazoIzqAtras = new TWEEN.Tween (atrasOrigenBrazoIzqPA,this.tweenAndar).to(atrasDestinoBrazoIzqPA, 800)
      .onUpdate(function(){
          that.brazoIzq.rotation.z = atrasOrigenBrazoIzqPA.rotation;
      });
      
      this.movBrazoIzqAlante = new TWEEN.Tween (alanteOrigenBrazoIzqPA ,this.tweenAndar).to(alanteDestinoBrazoIzqPA, 800)
      .onUpdate(function(){
          that.brazoIzq.rotation.z = alanteOrigenBrazoIzqPA.rotation;
      });
      this.movBrazoIzqAlante.chain(this.movBrazoIzqAtras);
      this.movBrazoIzqAtras.chain(this.movBrazoIzqAlante);

      // ANIMACION BRAZO IZQUIERDO PARTE BAJA
      var atrasOrigenBrazoIzqPB = {x:0,y:0, z:0, rotation:0};
      var atrasDestinoBrazoIzqPB = {x:0, y:0, z:0, rotation:Math.PI/3 };
    
      var alanteOrigenBrazoIzqPB = {x:0,y:0, z:0, rotation:Math.PI/3};
      var alanteDestinoBrazoIzqPB = {x:0, y:0, z:0, rotation:0 };

      this.movPBBrazoIzqAtras = new TWEEN.Tween (atrasOrigenBrazoIzqPB,this.tweenAndar).to(atrasDestinoBrazoIzqPB, 800)
      .onUpdate(function(){
          that.brazoIzq.parteBaja.rotation.z = atrasOrigenBrazoIzqPB.rotation;
      });
      this.movPBBrazoIzqAlante = new TWEEN.Tween (alanteOrigenBrazoIzqPB ,this.tweenAndar).to(alanteDestinoBrazoIzqPB, 800)
      .onUpdate(function(){
          that.brazoIzq.parteBaja.rotation.z = alanteOrigenBrazoIzqPB.rotation;
      });
      
      this.movPBBrazoIzqAlante.chain(this.movPBBrazoIzqAtras);
      this.movPBBrazoIzqAtras.chain(this.movPBBrazoIzqAlante);

      // ANIMACION BRAZO DERECHO PARATE ALTA
      var alanteOrigenBrazoDerPA = {x:0,y:7.3, z:-1.6, rotation:Math.PI/4};
      var alanteDestinoBrazoDerPA = {x:0, y:7.3, z:-1.6, rotation:-Math.PI/4 };

      var atrasOrigenBrazoDerPA = {x:0,y:7.3, z:-1.6, rotation:-Math.PI/4};
      var atrasDestinoBrazoDerPA = {x:0, y:7.3, z:-1.6, rotation:Math.PI/4 };
    
      this.movBrazoDerAlante = new TWEEN.Tween (alanteOrigenBrazoDerPA ,this.tweenAndar).to(alanteDestinoBrazoDerPA, 800)
      .onUpdate(function(){
          that.brazoDer.rotation.z = alanteOrigenBrazoDerPA.rotation;
      });
      this.movBrazoDerAtras = new TWEEN.Tween (atrasOrigenBrazoDerPA,this.tweenAndar).to(atrasDestinoBrazoDerPA, 800)
      .onUpdate(function(){
          that.brazoDer.rotation.z = atrasOrigenBrazoDerPA.rotation;
      });
      
      this.movBrazoDerAlante.chain(this.movBrazoDerAtras);
      this.movBrazoDerAtras.chain(this.movBrazoDerAlante);

      // ANIMACION BRAZO DERECHO PARTE BAJA
      var alanteOrigenBrazoDerPB = {x:0,y:0, z:0, rotation:Math.PI/3};
      var alanteDestinoBrazoDerPB = {x:0, y:0, z:0, rotation:0 };

      var atrasOrigenBrazoDerPB = {x:0,y:0, z:0, rotation:0};
      var atrasDestinoBrazoDerPB = {x:0, y:0, z:0, rotation:Math.PI/3};
    
      this.movPBBrazoDerAlante = new TWEEN.Tween (alanteOrigenBrazoDerPB ,this.tweenAndar).to(alanteDestinoBrazoDerPB, 800)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.z = alanteOrigenBrazoDerPB.rotation;
      });
      this.movPBBrazoDerAtras = new TWEEN.Tween (atrasOrigenBrazoDerPB,this.tweenAndar).to(atrasDestinoBrazoDerPB, 800)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.z = atrasOrigenBrazoDerPB.rotation;
      });
      
      this.movPBBrazoDerAlante.chain(this.movPBBrazoDerAtras);
      this.movPBBrazoDerAtras.chain(this.movPBBrazoDerAlante);

      //ANIMACION PIERNA DERECHA PARTE ALTA
      var alanteOrigenPiernaDerPA = {x:0,y:4.21, z:0.10, rotation:Math.PI/4};
      var alanteDestinoPiernaDerPA = {x:0, y:4.21, z:0.10, rotation:-Math.PI/4 };

      var atrasOrigenPiernaDerPA = {x:0,y:4.21, z:0.10, rotation:-Math.PI/4};
      var atrasDestinoPiernaDerPA = {x:0, y:4.21, z:0.10, rotation:Math.PI/4 };
    
      this.movPiernaDerAlante = new TWEEN.Tween (alanteOrigenPiernaDerPA ,this.tweenAndar).to(alanteDestinoPiernaDerPA, 800)
      .onUpdate(function(){
          that.piernaDer.piernaEntera.rotation.z = alanteOrigenPiernaDerPA.rotation;
      });
      this.movPiernaDerAtras = new TWEEN.Tween (atrasOrigenPiernaDerPA,this.tweenAndar).to(atrasDestinoPiernaDerPA, 800)
      .onUpdate(function(){
          that.piernaDer.piernaEntera.rotation.z = atrasOrigenPiernaDerPA.rotation;
      });
      
      this.movPiernaDerAlante.chain(this.movPiernaDerAtras);
      this.movPiernaDerAtras.chain(this.movPiernaDerAlante);

      //ANIMACION PIERNA DERECHA PARTE BAJA
      var alanteOrigenPiernaDerPB = {x:0,y:4.21, z:0.10, rotation:0};
      var alanteDestinoPiernaDerPB = {x:0, y:4.21, z:0.10, rotation:-Math.PI/4};

      var atrasOrigenPiernaDerPB = {x:0,y:4.21, z:0.10, rotation:-Math.PI/4};
      var atrasDestinoPiernaDerPB = {x:0, y:4.21, z:0.10, rotation:0};
    
      this.movPBPiernaDerAlante = new TWEEN.Tween (alanteOrigenPiernaDerPB ,this.tweenAndar).to(alanteDestinoPiernaDerPB, 800)
      .onUpdate(function(){
          that.piernaDer.parteBaja.rotation.z = alanteOrigenPiernaDerPB.rotation;
      });
      this.movPBPiernaDerAtras = new TWEEN.Tween (atrasOrigenPiernaDerPB,this.tweenAndar).to(atrasDestinoPiernaDerPB, 800)
      .onUpdate(function(){
          that.piernaDer.parteBaja.rotation.z = atrasOrigenPiernaDerPB.rotation;
      });
      
      this.movPBPiernaDerAlante.chain(this.movPBPiernaDerAtras);
      this.movPBPiernaDerAtras.chain(this.movPBPiernaDerAlante);

      //ANIMACION PIERNA IZQUIERDA PARTE ALTA
      var alanteOrigenPiernaIzqPA = {x:0,y:4.21, z:0.10, rotation:Math.PI/4};
      var alanteDestinoPiernaIzqPA = {x:0, y:4.21, z:0.10, rotation:-Math.PI/4 };

      var atrasOrigenPiernaIzqPA = {x:0,y:4.21, z:0.10, rotation:-Math.PI/4};
      var atrasDestinoPiernaIzqPA = {x:0, y:4.21, z:0.10, rotation:Math.PI/4 };
    
      this.movPiernaIzqAlante = new TWEEN.Tween (alanteOrigenPiernaIzqPA ,this.tweenAndar).to(alanteDestinoPiernaIzqPA, 800)
      .onUpdate(function(){
          that.piernaIzq.piernaEntera.rotation.z = alanteOrigenPiernaIzqPA.rotation;
      });
      this.movPiernaIzqAtras = new TWEEN.Tween (atrasOrigenPiernaIzqPA,this.tweenAndar).to(atrasDestinoPiernaIzqPA, 800)
      .onUpdate(function(){
          that.piernaIzq.piernaEntera.rotation.z = atrasOrigenPiernaIzqPA.rotation;
      });
      
      this.movPiernaIzqAlante.chain(this.movPiernaIzqAtras);
      this.movPiernaIzqAtras.chain(this.movPiernaIzqAlante);

      //ANIMACION PIERNA IZQUIERDA PARTE Baja
      var alanteOrigenPiernaIzqPB = {x:0,y:4.21, z:0.10, rotation:0};
      var alanteDestinoPiernaIzqPB = {x:0, y:4.21, z:0.10, rotation:-Math.PI/4 };

      var atrasOrigenPiernaIzqPB = {x:0,y:4.21, z:0.10, rotation:-Math.PI/4};
      var atrasDestinoPiernaIzqPB = {x:0, y:4.21, z:0.10, rotation:0 };
    
      this.movPBPiernaIzqAlante = new TWEEN.Tween (alanteOrigenPiernaIzqPB ,this.tweenAndar).to(alanteDestinoPiernaIzqPB, 800)
      .onUpdate(function(){
          that.piernaIzq.parteBaja.rotation.z = alanteOrigenPiernaIzqPB.rotation;
      });
      this.movPBPiernaIzqAtras = new TWEEN.Tween (atrasOrigenPiernaIzqPB,this.tweenAndar).to(atrasDestinoPiernaIzqPB, 800)
      .onUpdate(function(){
          that.piernaIzq.parteBaja.rotation.z = atrasOrigenPiernaIzqPB.rotation;
      });
      
      this.movPBPiernaIzqAlante.chain(this.movPBPiernaIzqAtras);
      this.movPBPiernaIzqAtras.chain(this.movPBPiernaIzqAlante);

      this.movBrazoIzqAtras.start();
      this.movPBBrazoIzqAtras.start();
      this.movBrazoDerAlante.start();
      this.movPBBrazoDerAlante.start();
      
      this.movPiernaDerAtras.start();
      this.movPBPiernaDerAtras.start()
      this.movPiernaIzqAlante.start();
      this.movPBPiernaIzqAlante.start();

      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/


      var origen_sent = { x:0, y:0, z:0, rotation:0};
      var destino_sent = { x:0, y:-4, z:0, rotation:Math.PI/8 };

      this.sentarse = new TWEEN.Tween (origen_sent,this.tweensentarse).to(destino_sent, 1000)
      .onUpdate(function () {  

        that.tronco.rotation.z = origen_sent.rotation;
        that.tronco.position.set(origen_sent.x,origen_sent.y,origen_sent.z);
        /*that.piernaIzq.parteBaja.rotation.z = -Math.PI/1.25;
        that.piernaIzq.piernaEntera.rotation.z = Math.PI/1.25;
        that.piernaIzq.piernaEntera.position.set(1,4.2,0);

        that.piernaDer.parteBaja.rotation.z = -Math.PI/1.25;
        that.piernaDer.piernaEntera.rotation.z = Math.PI/1.25;
        that.piernaDer.piernaEntera.position.set(1,4.2,0); 


        that.tronco.rotation.z = origen_sent_pie.rotation;
        that.tronco.position.set(origen_sent_pie.x,origen_sent_pie.y,origen_sent_pie.z);*/
           
      });

      var origen_sent_pie = { x:0, y:4.21, z:0, rotation:0};
      var destino_sent_pie = { x:1, y:4.21, z:0, rotation:Math.PI/1.25 };

      this.sentarse_piernas = new TWEEN.Tween (origen_sent_pie,this.tweensentarse).to(destino_sent_pie, 1000)
      .onUpdate(function () {  
        that.piernaIzq.parteBaja.rotation.z = -origen_sent_pie.rotation;
        that.piernaIzq.piernaEntera.rotation.z = origen_sent_pie.rotation;
        that.piernaIzq.piernaEntera.position.set(origen_sent_pie.x,origen_sent_pie.y,origen_sent_pie.z);

        that.piernaDer.parteBaja.rotation.z = -origen_sent_pie.rotation;
        that.piernaDer.piernaEntera.rotation.z = origen_sent_pie.rotation;
        that.piernaDer.piernaEntera.position.set(origen_sent_pie.x,origen_sent_pie.y,origen_sent_pie.z);
      });

      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/
      
      var origen = { x:0,y:7.3, z:1.6, rotation:0};
      var destino = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo = new TWEEN.Tween (origen).to(destino, 500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });

      var origen_peque = { x:0,y:7.3, z:1.6, rotation:0};
      var destino_peque = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo_peque = new TWEEN.Tween (origen_peque).to(destino_peque, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.z = origen_peque.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });
      var origen_mano = { x:0,y:7.3, z:1.6, rotation:-Math.PI/3};
      var destino_mano = {x:0, y:7.3, z:1.6, rotation:Math.PI/3 };

      this.saludo_mano = new TWEEN.Tween (origen_mano).to(destino_mano, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.y = origen_mano.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });


      var origen_mano2 = { x:0,y:7.3, z:1.6, rotation:Math.PI/3};
      var destino_mano2 = {x:0, y:7.3, z:1.6, rotation:-Math.PI/3 };

      this.saludo_mano2 = new TWEEN.Tween (origen_mano2).to(destino_mano2, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.y = origen_mano2.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });

      this.saludo_mano.chain(this.saludo_mano2);
      this.saludo_mano2.chain(this.saludo_mano);

      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/

      //ANIMACION DE NEGAR
      this.tweenNegar = new TWEEN.Group();

      var origenNegarIzq = {rotation:-0.5};
      var destinoNegarIzq = {rotation:0.5};

      var origenNegarDer = {rotation:0.5};
      var destinoNegarDer = {rotation:-0.5};

      this.negarIzq = new TWEEN.Tween (origenNegarIzq, this.tweenNegar).to(destinoNegarIzq, 1000)
      .onUpdate(function(){
        that.cabeza.rotation.y = origenNegarIzq.rotation;
      });
      this.negarDer = new TWEEN.Tween (origenNegarDer, this.tweenNegar).to(destinoNegarDer, 1000)
      .onUpdate(function(){
        that.cabeza.rotation.y = origenNegarDer.rotation;
      });

      this.negarIzq.chain(this.negarDer);
      this.negarDer.chain(this.negarIzq);

      this.negarIzq.start();


      //ANIMACION DE ASENTIR
      this.tweenAsentir = new TWEEN.Group();

      var origen_asentir = {rotation:-Math.PI/100};
      var destino_asentir = {rotation:Math.PI/100};

      var origen_asentir1 = {rotation:Math.PI/100};
      var destino_asentir1 = {rotation:-Math.PI/100};

      this.asentir = new TWEEN.Tween (origen_asentir, this.tweenAsentir).to(destino_asentir, 500)
      .onUpdate(function(){
        that.cabeza.rotation.z = origen_asentir.rotation;
      });
      this.asentir1 = new TWEEN.Tween (origen_asentir1, this.tweenAsentir).to(destino_asentir1, 500)
      .onUpdate(function(){
        that.cabeza.rotation.z = origen_asentir1.rotation;
      });
      this.asentir.chain(this.asentir1);
      this.asentir1.chain(this.asentir);

      this.asentir.start();


      //Comenzamos la animación de Andar
      
      
      // this.movimiento1_pie_izq.start();
      // this.movimiento1_pie_der.start();
      //this.tweenAndar.start();



      //this.sentarse_pie.start();


      
      
    }
    createCamera () {

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set (15, 10, 0);
      
      this.camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera2.position.set (10, 5, 0);
      
      var look = new THREE.Vector3 (0,5,0);
      this.camera.lookAt(look);
      this.camera2.lookAt(look);
      this.add (this.camera);
      this.add (this.camera2);
      
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      
      this.cameraControl.target = look;

    }
    
    createGUI () {
      var gui = new dat.GUI();

      this.guiControls = new function() {
        this.lightIntensity = 0.5;
        this.axisOnOff = true;
        this.andar = false;
        this.sentarse = false;
        this.saludo = false;
        this.negar = false;
        this.asentir = false;
      }

      var folder = gui.addFolder ('Luz y Ejes');
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

      var folder = gui.addFolder('Animacion');
      folder.add (this.guiControls, 'andar').name ('Andar : ');
      folder.add (this.guiControls, 'sentarse').name ('Sentarse : ');
      folder.add (this.guiControls, 'saludo').name ('Saludar : ');
      folder.add (this.guiControls, 'negar').name ('Negar : ');
      folder.add (this.guiControls, 'asentir').name ('Asentir : ');
      
      return gui;
    }
    
    createLights () {
      var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
      this.add (ambientLight);
      this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
      this.spotLight.position.set( 60, 60, 40 );
      this.add (this.spotLight);
    }
    
    createRenderer (myCanvas) {
      var renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      $(myCanvas).append(renderer.domElement);
      
      return renderer;  
    }
    
    getCamera () {
      return this.camera;
    }
    
    setCameraAspect (ratio) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {
      this.setCameraAspect (window.innerWidth / window.innerHeight);
      this.renderer.setSize (window.innerWidth, window.innerHeight);
    }
  
    update () {
      requestAnimationFrame(() => this.update())
  
      this.spotLight.intensity = this.guiControls.lightIntensity;
      
      this.ejes.visible = this.guiControls.axisOnOff;
      
      this.cameraControl.update();
      
      this.renderer.render (this, this.getCamera());

      if(this.guiControls.andar){
        this.tweenAndar.update();
      }
      if(this.guiControls.sentarse){
        this.sentarse.start();
        this.sentarse_piernas.start();
      }
      if(this.guiControls.saludo){
        this.saludo.start();
        this.saludo_peque.start();
        this.saludo_mano.start();
      }

      if(this.guiControls.negar){
        this.tweenNegar.update();
      }
      if(this.guiControls.asentir){
        this.tweenAsentir.update();
      }


      TWEEN.update();

    }
  }
  
  $(function () {
    var scene = new MyScene("#WebGL-output");
    window.addEventListener ("resize", () => scene.onWindowResize());
    scene.update();
  });
  