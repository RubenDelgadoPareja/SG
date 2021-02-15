class MyScene extends THREE.Scene {

    
    constructor (myCanvas) {
      super();
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
      
      //this.movimiento1_pie_izq.start();
      

     

      this.tweensentarse = new TWEEN.Group();


      var origen_sent = { x:0, y:0, z:-0.10, rotation:0};
      var destino_sent = { x:0, y:-4, z:-0.10, rotation:Math.PI/8 };

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
      var that = this;

      var origen_sent_pie = { x:0, y:4.21, z:-0.10, rotation:0};
      var destino_sent_pie = { x:1, y:4.21, z:-0.10, rotation:Math.PI/1.25 };

      this.sentarse_piernas = new TWEEN.Tween (origen_sent_pie,this.tweensentarse).to(destino_sent_pie, 1000)
      .onUpdate(function () {  
        that.piernaIzq.parteBaja.rotation.z = -origen_sent_pie.rotation;
        that.piernaIzq.piernaEntera.rotation.z = origen_sent_pie.rotation;
        that.piernaIzq.piernaEntera.position.set(origen_sent_pie.x,origen_sent_pie.y,origen_sent_pie.z);

        that.piernaDer.parteBaja.rotation.z = -origen_sent_pie.rotation;
        that.piernaDer.piernaEntera.rotation.z = origen_sent_pie.rotation;
        that.piernaDer.piernaEntera.position.set(origen_sent_pie.x,origen_sent_pie.y,origen_sent_pie.z);
      });

      this.tweenSaludo = new TWEEN.Group();
      
      var origen = { x:0,y:7.3, z:1.6, rotation:0};
      var destino = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo = new TWEEN.Tween (origen,this.tweenSaludo).to(destino, 500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });

      var origen_peque = { x:0,y:7.3, z:1.6, rotation:0};
      var destino_peque = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo_peque = new TWEEN.Tween (origen_peque,this.tweenSaludo).to(destino_peque, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.z = origen_peque.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });
      var origen_mano = { x:0,y:7.3, z:1.6, rotation:-Math.PI/3};
      var destino_mano = {x:0, y:7.3, z:1.6, rotation:Math.PI/3 };

      this.saludo_mano = new TWEEN.Tween (origen_mano,this.tweenSaludo).to(destino_mano, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.y = origen_mano.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });


      var origen_mano2 = { x:0,y:7.3, z:1.6, rotation:Math.PI/3};
      var destino_mano2 = {x:0, y:7.3, z:1.6, rotation:-Math.PI/3 };

      this.saludo_mano2 = new TWEEN.Tween (origen_mano2,this.tweenSaludo).to(destino_mano2, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.y = origen_mano2.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });

      this.saludo_mano.chain(this.saludo_mano2);
      this.saludo_mano2.chain(this.saludo_mano);

      this.saludo.start();
      this.saludo_peque.start();
      this.saludo_mano.start();

      
      var origen_negar = {rotation:-Math.PI/3};
      var destino_negar = {rotation:Math.PI/3};

      this.negar = new TWEEN.Tween (origen_negar).to(destino_negar, 500)
      .onUpdate(function(){
        that.cabeza.rotation.y = origen_negar.rotation;
      });

      var origen_negar1 = {rotation:Math.PI/3};
      var destino_negar1 = {rotation:-Math.PI/3};

      this.negar1 = new TWEEN.Tween (origen_negar1).to(destino_negar1, 500)
      .onUpdate(function(){
        that.cabeza.rotation.y = origen_negar1.rotation;
      });
      this.negar.chain(this.negar1);
      this.negar1.chain(this.negar);



      var origen_asentir = {rotation:-Math.PI/100};
      var destino_asentir = {rotation:Math.PI/100};

      this.asentir = new TWEEN.Tween (origen_asentir).to(destino_asentir, 500)
      .onUpdate(function(){
        that.cabeza.rotation.z = origen_asentir.rotation;
      });

      var origen_asentir1 = {rotation:Math.PI/100};
      var destino_asentir1 = {rotation:-Math.PI/100};

      this.asentir1 = new TWEEN.Tween (origen_asentir1).to(destino_asentir1, 500)
      .onUpdate(function(){
        that.cabeza.rotation.z = origen_asentir1.rotation;
      });
      this.asentir.chain(this.asentir1);
      this.asentir1.chain(this.asentir);




      
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
      
      this.tweenAndar.update();
      TWEEN.update();



    }


    AnimacionAndar(){
      var that = this;
      this.tweenAndar = new TWEEN.Group();

      var origen1_pie_der = { x:0,y:4.21, z:0.10, rotation:-Math.PI/4};
      var destino1_pie_der = {x:0, y:4.21, z:0.10, rotation:Math.PI/4 };

      this.movimiento1_pie_der = new TWEEN.Tween (origen1_pie_der,this.tweenAndar).to(destino1_pie_der, 500)
      .onUpdate(function(){
          that.piernaDer.piernaEntera.rotation.z = origen1_pie_der.rotation;
         // that.piernaDer.piernaEntera.position.set(origen1_pie_der.x,origen1_pie_der.y,origen1_pie_der.z);
          
      });

      var origen2_pie_der = { x:0,y:4.21, z:0.10, rotation:Math.PI/4};
      var destino2_pie_der = {x:0, y:4.21, z:0.10, rotation:-Math.PI/4 };

      this.movimiento2_pie_der = new TWEEN.Tween (origen2_pie_der,this.tweenAndar ).to(destino2_pie_der, 500)
      .onUpdate(function(){
          that.piernaDer.piernaEntera.rotation.z = origen2_pie_der.rotation;
          that.piernaDer.piernaEntera.position.set(origen2_pie_der.x,origen2_pie_der.y,origen2_pie_der.z);
          
      });
      this.movimiento2_pie_der.chain(this.movimiento1_pie_der);
      this.movimiento1_pie_der.chain(this.movimiento2_pie_der);


      //Animacion de mover los brazos al andar  -- Brazo Izquierdo
      var origen1_brazo_izq = { x:0,y:7.3, z:-1.6, rotation:-Math.PI/4};
      var destino1_brazo_izq = {x:0, y:7.3, z:-1.6, rotation:Math.PI/4 };

      this.movimiento1_brazo_izq = new TWEEN.Tween (origen1_brazo_izq,this.tweenAndar).to(destino1_brazo_izq, 500)
      .onUpdate(function(){
          that.brazoIzq.rotation.z = origen1_brazo_izq.rotation;
          //that.brazoIzq.position.set(origen1_brazo_izq.x,origen1_brazo_izq.y,origen1_brazo_izq.z);
          
      });

    
      var origen2_brazo_izq = { x:0,y:7.3, z:-1.6, rotation:Math.PI/4};
      var destino2_brazo_izq = {x:0, y:7.3, z:-1.6, rotation:-Math.PI/4 };

      this.movimiento2_brazo_izq = new TWEEN.Tween (origen2_brazo_izq,this.tweenAndar).to(destino2_brazo_izq, 500)
      .onUpdate(function(){
          that.brazoIzq.rotation.z = origen2_brazo_izq.rotation;
         // that.brazoIzq.position.set(origen2_brazo_izq.x,origen2_brazo_izq.y,origen2_brazo_izq.z);
          
      });
      this.movimiento2_brazo_izq.chain(this.movimiento1_brazo_izq);
      this.movimiento1_brazo_izq.chain(this.movimiento2_brazo_izq);
      

      //Animacion de mover los brazos a andar -- Brazo Derecho
      var origen1_brazo_der = { x:0,y:7.3, z:1.6, rotation:Math.PI/4};
      var destino1_brazo_der = {x:0, y:7.3, z:1.6, rotation:-Math.PI/4 };

      this.movimiento1_brazo_der = new TWEEN.Tween (origen1_brazo_der,this.tweenAndar).to(destino1_brazo_der, 500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen1_brazo_der.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
          
      });

    
      var origen2_brazo_der = { x:0,y:7.3, z:1.6, rotation:-Math.PI/4};
      var destino2_brazo_der = {x:0, y:7.3, z:1.6, rotation:Math.PI/4 };

      this.movimiento2_brazo_der = new TWEEN.Tween (origen2_brazo_der,this.tweenAndar).to(destino2_brazo_der, 500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen2_brazo_der.rotation;
          //that.brazoDer.position.set(origen2_brazo_der.x,origen2_brazo_der.y,origen2_brazo_der.z);
          
      });
      this.movimiento2_brazo_der.chain(this.movimiento1_brazo_der);
      this.movimiento1_brazo_der.chain(this.movimiento2_brazo_der);
      //this.movimiento1_brazo_der.start();



      //Animacion de mover las piernas al andar -- Pierna Izquierda
      var origen1_pie_izq = { x:0,y:4.21, z:-0.10, rotation:Math.PI/4};
      var destino1_pie_izq = {x:0, y:4.21, z:-0.10, rotation:-Math.PI/4 };

      this.movimiento1_pie_izq = new TWEEN.Tween (origen1_pie_izq,this.tweenAndar).to(destino1_pie_izq, 500)
      .onUpdate(function(){
          that.piernaIzq.piernaEntera.rotation.z = origen1_pie_izq.rotation;
         // that.piernaIzq.piernaEntera.position.set(origen1_pie_izq.x,origen1_pie_izq.y,origen1_pie_izq.z);
          
      });

      var origen2_pie_izq = { x:0,y:4.21, z:-0.10, rotation:-Math.PI/4};
      var destino2_pie_izq = {x:0, y:4.21, z:-0.10, rotation:Math.PI/4 };

      this.movimiento2_pie_izq = new TWEEN.Tween (origen2_pie_izq,this.tweenAndar).to(destino2_pie_izq, 500)
      .onUpdate(function(){
          that.piernaIzq.piernaEntera.rotation.z = origen2_pie_izq.rotation;
         // that.piernaIzq.piernaEntera.position.set(origen2_pie_izq.x,origen2_pie_izq.y,origen2_pie_izq.z);
          
      });


      this.movimiento2_pie_izq.chain(this.movimiento1_pie_izq);
      this.movimiento1_pie_izq.chain(this.movimiento2_pie_izq);

      //Comenzamos la animación de Andar
      this.movimiento1_brazo_izq.start();
      this.movimiento1_brazo_der.start();
      this.movimiento1_pie_izq.start();
      this.movimiento1_pie_der.start();

    };
  }
  
  $(function () {
    var scene = new MyScene("#WebGL-output");
    window.addEventListener ("resize", () => scene.onWindowResize());
    scene.update();
  });
  
