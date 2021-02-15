class MyScene extends THREE.Scene {

    
    constructor (myCanvas) {
      super();
      this.condicion = true;
      this.renderer = this.createRenderer(myCanvas);
      this.applicationMode = MyScene.NO_ACTION
      
      this.gui = this.createGUI ();
      
      this.createLights ();
      
      this.createCamera ();
      
      this.ejes = new THREE.AxesHelper (5);
      this.add(this.ejes);

      this.piernaIzq = new Pierna("I");
      //this.cuerpo.add (this.piernaIzq);
      this.piernaIzq.position.z = -0.75;
      this.piernaIzq.position.y = 0;

      this.nodoPiernaIzq = new THREE.Object3D();
      this.nodoPiernaIzq.add(this.piernaIzq); 

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
      this.createCamera2();
      this.tronco.add (this.cabeza);

      var planeGeometry = new THREE.BoxGeometry (500,0.2,500);
      var texture = new THREE.TextureLoader().load( "../imgs/wood.jpg");
      var planeMat = new THREE.MeshPhongMaterial ({map: texture});
      var plane = new THREE.Mesh (planeGeometry, planeMat);
      plane.receiveShadow = true;

      plane.position.y = -0.5;


      


      this.add(plane);

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

     
      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/

      this.tweensentarse = new TWEEN.Group();

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
      this.tweenSaludar = new TWEEN.Group();

      var origen = { x:0,y:7.3, z:1.6, rotation:0};
      var destino = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo = new TWEEN.Tween (origen,this.tweenSaludar).to(destino, 500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });

      var origen_peque = { x:0,y:7.3, z:1.6, rotation:0};
      var destino_peque = {x:0, y:7.3, z:1.6, rotation:Math.PI/2 };

      this.saludo_peque = new TWEEN.Tween (origen_peque,this.tweenSaludar).to(destino_peque, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.z = origen_peque.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });
      var origen_mano = { x:0,y:7.3, z:1.6, rotation:-Math.PI/3};
      var destino_mano = {x:0, y:7.3, z:1.6, rotation:Math.PI/3 };

      this.saludo_mano = new TWEEN.Tween (origen_mano,this.tweenSaludar).to(destino_mano, 500)
      .onUpdate(function(){
          that.brazoDer.parteBaja.rotation.y = origen_mano.rotation;
          //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
      });


      var origen_mano2 = { x:0,y:7.3, z:1.6, rotation:Math.PI/3};
      var destino_mano2 = {x:0, y:7.3, z:1.6, rotation:-Math.PI/3 };

      this.saludo_mano2 = new TWEEN.Tween (origen_mano2,this.tweenSaludar).to(destino_mano2, 500)
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

      var origenNegar = {rotation:0};
      var destinoNegar = {rotation:-0.5};

      this.negar = new TWEEN.Tween (origenNegar,this.tweenNegar).to(destinoNegar,1000)
      .onUpdate(function() {
        that.cabeza.rotation.y = origenNegar.rotation;
      });

      this.negarIzq = new TWEEN.Tween (origenNegarIzq, this.tweenNegar).to(destinoNegarIzq, 1000)
      .onUpdate(function(){
        that.cabeza.rotation.y = origenNegarIzq.rotation;
      });
      this.negarDer = new TWEEN.Tween (origenNegarDer, this.tweenNegar).to(destinoNegarDer, 1000)
      .onUpdate(function(){
        that.cabeza.rotation.y = origenNegarDer.rotation;
      });

      this.negar.chain(this.negarIzq);
      this.negarIzq.chain(this.negarDer);
      this.negarDer.chain(this.negarIzq);

      
      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/

      //ANIMACION DE ASENTIR
      this.tweenAsentir = new TWEEN.Group();

      var origen_asentir = {rotation:0};
      var destino_asentir = {rotation:-Math.PI/100};

      var origen_asentir1 = {rotation:-Math.PI/100};
      var destino_asentir1 = {rotation:0};

      this.asentir = new TWEEN.Tween (origen_asentir, this.tweenAsentir).to(destino_asentir, 500)
      .onUpdate(function(){
        //that.cabeza.set.position(0,0,0);
        that.cabeza.rotation.z = origen_asentir.rotation;
      });
      this.asentir1 = new TWEEN.Tween (origen_asentir1, this.tweenAsentir).to(destino_asentir1, 500)
      .onUpdate(function(){
        //that.cabeza.set.position(0,0,0); 
        that.cabeza.rotation.z = origen_asentir1.rotation;
      });
      this.asentir.chain(this.asentir1);
      this.asentir1.chain(this.asentir);

      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/

      //ANIMACION DE REZAR

      this.tweenRezar = new TWEEN.Group();
      var origen_tumb = {rotation: 0};
      var destino_tumb = {rotation: -Math.PI/2}

      this.tumbarse = new TWEEN.Tween (origen_tumb,this.tweenRezar).to(destino_tumb, 500)
      .onUpdate(function(){
        //that.tronco.rotation.z = origen_tumb.rotation;
        that.piernaDer.parteBaja.rotation.z = origen_tumb.rotation;
        that.piernaIzq.parteBaja.rotation.z = origen_tumb.rotation;
      });

      var origen_tumb1 = {x:0 , y:0, z:0 };
      var destino_tumb1 = {x:3, y:-2, z:0};

      this.tumbarse1 = new TWEEN.Tween (origen_tumb1,this.tweenRezar).to(destino_tumb1, 500)
      .onUpdate(function(){
        that.tronco.position.set(origen_tumb1.x, origen_tumb1.y , origen_tumb1.z);
      });

      var origen_tumb2 = {rotation: 0};
      var destino_tumb2 = {rotation: Math.PI/2};

      this.tumbarse2 = new TWEEN.Tween (origen_tumb2,this.tweenRezar).to(destino_tumb2,500)
      .onUpdate(function(){
          that.brazoDer.rotation.z = origen_tumb2.rotation;
          that.brazoIzq.rotation.z = origen_tumb2.rotation;
          that.brazoDer.parteBaja.rotation.z = origen_tumb2.rotation;
          that.brazoIzq.parteBaja.rotation.z = origen_tumb2.rotation;
          that.brazoDer.rotation.x = -origen_tumb2.rotation/2;
          that.brazoIzq.rotation.x = origen_tumb2.rotation/2;
      });


      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/
      /************************************************************************************************************/


      //INTERACCION CON EL RATON


      

      

     


      //Comenzamos la animación de Andar
      
      
      // this.movimiento1_pie_izq.start();
      // this.movimiento1_pie_der.start();
      //this.tweenAndar.start();



      //this.sentarse_pie.start();

      


    
    }
    onClick(event) {
      if(this.applicationMode == MyScene.PICKING){
        event.preventDefault();

        var raton = new THREE.Vector2();

        var origen_arriba = { rotation: 0};
        var destino_arriba = { rotation: Math.PI/2};

        var origen_arriba1 = { rotation:  Math.PI/2};
        var destino_arriba1 = { rotation: 0};
        raton.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        raton.y =   1 - 2 * ( event.clientY / window.innerHeight );

        var cuerpo = [this.tronco];
        //console.log(cuerpo);
        var raycaster = new THREE.Raycaster ();
        raycaster.setFromCamera(raton, this.camera);

        var intersects = raycaster.intersectObjects (cuerpo, true);

        for (var i = 0 ; i < intersects.length ; i++) {
          var parte = intersects[i].object.parent;
          //console.log(parte);
          if(parte.parent == this.brazoDer || parte.parent == this.brazoIzq || parte.parent == this.piernaDer || parte.parent == this.piernaIzq){
            //console.log("Entra en el if");
            this.moverArriba = new TWEEN.Tween (origen_arriba).to(destino_arriba,1000)
            .onUpdate( function() {
              parte.rotation.z = origen_arriba.rotation;
            });
            this.volverArriba = new TWEEN.Tween (origen_arriba1).to(destino_arriba1,1000)
            .onUpdate( function() {
              parte.rotation.z =  origen_arriba1.rotation;
            });  
            this.moverArriba.chain(this.volverArriba);
            this.moverArriba.start();         

          }
          else if(parte.parent == this.cabeza){
            this.moverDerecha = new TWEEN.Tween (origen_arriba).to(destino_arriba,1000)
            .onUpdate( function() {
              parte.rotation.y = origen_arriba.rotation;
            });
            this.volverDerecha = new TWEEN.Tween (origen_arriba1).to(destino_arriba1,1000)
            .onUpdate( function() {
              parte.rotation.y = origen_arriba1.rotation;
            });
            this.moverDerecha.chain(this.volverDerecha);
            this.moverDerecha.start();
          }

        }
      }
      this.applicationMode = MyScene.NO_ACTION;
      

      
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

    createCamera2 () {
      this.camara2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

      

      this.camara2.position.set(0,0,0);

      this.cabeza.ojos.add(this.camara2);

      var target = new THREE.Vector3(5,-5,0);

      this.camara2.getWorldPosition(this.cabeza.position);

      this.camara2.lookAt (target);

      //this.add(this.camara2);
    }
    
    createGUI () {
      var that = this;
      var gui = new dat.GUI();

      this.guiControls = new function() {
        this.lightIntensity = 0.5;
        this.axisOnOff = true;
        this.andar = false;
        this.sentarse = false;
        this.saludo = false;
        this.negar = false;
        this.asentir = false;
        this.rezar = false;
        this.modo = false;
        this.camara2 = false;
      }
      var folder = gui.addFolder ('Camara 2');
      folder.add (this.guiControls, 'camara2').name ('Activada : ').onChange( function() {

      });

      var folder = gui.addFolder ('Luz y Ejes');
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

      var folder = gui.addFolder('Animacion');
      folder.add (this.guiControls, 'andar').name ('Andar : ').onChange(function () {
          if(that.condicion){
            //console.log("Entramos en el if");
            that.movBrazoIzqAtras.start();
            that.movPBBrazoIzqAtras.start();
            that.movBrazoDerAlante.start();
            that.movPBBrazoDerAlante.start();

            that.movPiernaDerAtras.start();
            that.movPBPiernaDerAtras.start()
            that.movPiernaIzqAlante.start();
            that.movPBPiernaIzqAlante.start();

            that.condicion = false;
          }
          else {
            //console.log("Entramos en el else");
            that.movBrazoIzqAtras.stop();
            that.movPBBrazoIzqAtras.stop();
            that.movBrazoDerAlante.stop();
            that.movPBBrazoDerAlante.stop();

            that.movPiernaDerAtras.stop();
            that.movPBPiernaDerAtras.stop()
            that.movPiernaIzqAlante.stop();
            that.movPBPiernaIzqAlante.stop();

            var origenAndarFinPE = {rotation: that.piernaDer.piernaEntera.rotation.z};
            var destinoAndarFinPE = {rotation: 0};
            
            var aux = that;
            that.AndarFinPE = new TWEEN.Tween (origenAndarFinPE).to(destinoAndarFinPE, 800)
            .onUpdate(function(){
              aux.piernaDer.piernaEntera.rotation.z = origenAndarFinPE.rotation;
              
              aux.piernaIzq.piernaEntera.rotation.z = -origenAndarFinPE.rotation;
              
            });
            var origenAndarFinPB = {rotation: that.piernaDer.parteBaja.rotation.z};
            var destinoAndarFinPB = {rotation: 0};

            that.AndarFinPB = new TWEEN.Tween (origenAndarFinPB).to(destinoAndarFinPB, 800)
            .onUpdate(function () { 
              aux.piernaDer.parteBaja.rotation.z = origenAndarFinPB.rotation;
              aux.piernaIzq.parteBaja.rotation.z = -origenAndarFinPB.rotation;
             });

            var origenAndarFinBPE = {rotation: that.brazoDer.rotation.z};
            var destinoAndarFinBPE = {rotation: 0};

            that.AndarFinBPE = new TWEEN.Tween (origenAndarFinBPE).to(destinoAndarFinBPE, 800)
            .onUpdate(function(){
              aux.brazoDer.rotation.z = origenAndarFinBPE.rotation;
              
              aux.brazoIzq.rotation.z = -origenAndarFinBPE.rotation;
              
            });

            var origenAndarFinBPB = {rotation: that.piernaDer.parteBaja.rotation.z};
            var destinoAndarFinBPB = {rotation: 0};

            that.AndarFinBPB = new TWEEN.Tween (origenAndarFinBPB).to(destinoAndarFinBPB, 800)
            .onUpdate(function () { 
              aux.brazoDer.parteBaja.rotation.z = origenAndarFinBPB.rotation;
              aux.brazoIzq.parteBaja.rotation.z = -origenAndarFinBPB.rotation;
             });


            that.AndarFinPE.start();
            that.AndarFinPB.start();
            that.AndarFinBPE.start();
            that.AndarFinBPB.start();

            that.condicion = true;

          }
    
        })
      folder.add (this.guiControls, 'sentarse').name ('Sentarse : ').onChange(function (){
        if(that.condicion){
          that.sentarse.start();
          that.sentarse_piernas.start();

          that.condicion = false;
        }
        else{
          that.sentarse.stop();
          that.sentarse_piernas.stop();

          var origen_lev_pie = { x:1, y:4.21, z:0, rotation:Math.PI/1.25 };
          var destino_lev_pie = { x:0, y:4.21, z:0, rotation:0};

          that.levantarse_piernas = new TWEEN.Tween (origen_lev_pie,this.tweensentarse).to(destino_lev_pie, 1000)
          .onUpdate(function () {  
            that.piernaIzq.parteBaja.rotation.z = -origen_lev_pie.rotation;
            that.piernaIzq.piernaEntera.rotation.z = origen_lev_pie.rotation;
            that.piernaIzq.piernaEntera.position.set(origen_lev_pie.x,origen_lev_pie.y,origen_lev_pie.z);
          
            that.piernaDer.parteBaja.rotation.z = -origen_lev_pie.rotation;
            that.piernaDer.piernaEntera.rotation.z = origen_lev_pie.rotation;
            that.piernaDer.piernaEntera.position.set(origen_lev_pie.x,origen_lev_pie.y,origen_lev_pie.z);
          });

          var origen_lev = { x:0, y:-4, z:0, rotation:Math.PI/8};
          var destino_lev = { x:0, y:0, z:0, rotation:0 };

          that.levantarse = new TWEEN.Tween (origen_lev,this.tweensentarse).to(destino_lev, 1000)
          .onUpdate(function () {  
          
            that.tronco.rotation.z = origen_lev.rotation;
            that.tronco.position.set(origen_lev.x,origen_lev.y,origen_lev.z);
          });

          that.levantarse_piernas.start();
          that.levantarse.start();

          that.condicion = true;
        }
      })
      folder.add (this.guiControls, 'saludo').name ('Saludar : ').onChange(function () {
        if(that.condicion){
          that.saludo.start();
          that.saludo_peque.start();
          that.saludo_mano.start();
          that.condicion = false;

        }else{

          that.saludo.stop();
          that.saludo_peque.stop();
          that.saludo_mano.stop();

          var origen_manoF = {rotation: that.brazoDer.parteBaja.rotation.y};
          var destino_manoF = {rotation:0 };

          that.saludo_manoF = new TWEEN.Tween (origen_manoF,this.tweenSaludar).to(destino_manoF, 500)
          .onUpdate(function(){
              that.brazoDer.parteBaja.rotation.y = origen_manoF.rotation;
              //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
          });

          var origenF = {  rotation:Math.PI/2 };
          var destinoF = {rotation:0};

          that.saludoF = new TWEEN.Tween (origenF,this.tweenSaludar).to(destinoF, 500)
          .onUpdate(function(){
              that.brazoDer.rotation.z = origenF.rotation;
              //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
          });
        
          var origen_pequeF = { rotation:Math.PI/2 };
          var destino_pequeF = {rotation:0};
        
          that.saludo_pequeF = new TWEEN.Tween (origen_pequeF,this.tweenSaludar).to(destino_pequeF, 500)
          .onUpdate(function(){
              that.brazoDer.parteBaja.rotation.z = origen_pequeF.rotation;
              //that.brazoDer.position.set(origen1_brazo_der.x,origen1_brazo_der.y,origen1_brazo_der.z);
          });

          that.saludo_manoF.start();
          that.saludoF.start();
          that.saludo_pequeF.start();


          that.condicion = true;
        }



      })
      folder.add (this.guiControls, 'negar').name ('Negar : ').onChange( function() {
        if(that.condicion){
          that.negar.start();
          that.condicion = false;
        }else{
          that.negar.stop();
          var origenNegarF = {rotation:that.cabeza.rotation.y};
          var destinoNegarF = {rotation:0};

          that.negarF = new TWEEN.Tween (origenNegarF,this.tweenNegar).to(destinoNegarF,1000)
          .onUpdate(function() {
            that.cabeza.rotation.y = origenNegarF.rotation;
          });

          that.negarF.start();

          that.condicion=true;


        }
        
      })
      folder.add (this.guiControls, 'asentir').name ('Asentir : ').onChange( function () { 
        if(that.condicion){

          that.asentir.start();

          that.condicion =false;
        }
        else{
          that.asentir.stop();

          var origen_asentirF = {rotation:that.cabeza.rotation.z};
          var destino_asentirF = {rotation:0};

          that.asentirF = new TWEEN.Tween (origen_asentirF, this.tweenAsentir).to(destino_asentirF, 500)
          .onUpdate(function(){
            //that.cabeza.set.position(0,0,0);
            that.cabeza.rotation.z = origen_asentirF.rotation;
          });

          that.asentirF.start();

          that.condicion = true;


        }
      })
      folder.add (this.guiControls, 'rezar').name ('Oremos : ').onChange( function () {  
        if(that.condicion){
          that.tumbarse1.start();
          that.tumbarse.start();
          that.tumbarse2.start();

          that.condicion = false;
        }else{
          that.tumbarse1.stop();
          that.tumbarse.stop();
          that.tumbarse2.stop();


          var origen_lev2 = {rotation: Math.PI/2};
          var destino_lev2 = {rotation:0 };

          that.levantarse2 = new TWEEN.Tween (origen_lev2,this.tweenRezar).to(destino_lev2,500)
          .onUpdate(function(){
              that.brazoDer.rotation.z = origen_lev2.rotation;
              that.brazoIzq.rotation.z = origen_lev2.rotation;
              that.brazoDer.parteBaja.rotation.z = origen_lev2.rotation;
              that.brazoIzq.parteBaja.rotation.z = origen_lev2.rotation;
              that.brazoDer.rotation.x = -origen_lev2.rotation/2;
              that.brazoIzq.rotation.x = origen_lev2.rotation/2;
          });

          var origen_lev = {rotation: -Math.PI/2};
          var destino_lev = {rotation: 0}

          that.levantarse3 = new TWEEN.Tween (origen_lev,this.tweenRezar).to(destino_lev, 500)
          .onUpdate(function(){
            //that.tronco.rotation.z = origen_tumb.rotation;
            that.piernaDer.parteBaja.rotation.z = origen_lev.rotation;
            that.piernaIzq.parteBaja.rotation.z = origen_lev.rotation;
          });
        
          var origen_lev1 = {x:3 , y:-2, z:0 };
          var destino_lev1 = {x:0, y:0, z:0};
        
          that.levantarse1 = new TWEEN.Tween (origen_lev1,this.tweenRezar).to(destino_lev1, 500)
          .onUpdate(function(){
            that.tronco.position.set(origen_lev1.x, origen_lev1.y , origen_lev1.z);
          });

          that.levantarse2.start();
          that.levantarse3.start();
          that.levantarse1.start();


          that.condicion = true;
        }

        });

        var folder = gui.addFolder ('Interaccion');
        folder.add (this.guiControls, 'modo').name ('Modo interaccion : ').onChange( function () {  
          if(that.condicion){
            that.applicationMode = MyScene.PICKING;
            that.condicion = false;
          }else{
            that.applicationMode = MyScene.NO_ACTION
            that.condicion = true;
          }
        });
      
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
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      
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
      if(this.guiControls.camara2)
        this.renderer.render (this, this.camara2);
      else{
        this.renderer.render (this, this.getCamera());
      }

      if(this.guiControls.andar){
        this.tweenAndar.update();
        //console.log("Entra al if de andar");
      }
      if(this.guiControls.sentarse){
        this.tweensentarse.update();
      }
      if(this.guiControls.saludo){
        this.tweenSaludar.update();
      }

      if(this.guiControls.negar){
        this.tweenNegar.update();
      }
      if(this.guiControls.asentir){
        this.tweenAsentir.update();
      }
      if(this.guiControls.rezar){
        this.tweenRezar.update();
      }

     // console.log("Update normal")

      TWEEN.update();

    }
  }
  
  MyScene.NO_ACTION = 0;
  MyScene.PICKING = 1;


  
  $(function () {
    var scene = new MyScene("#WebGL-output");
    const textureback = new THREE.TextureLoader().load("../imgs/starry_background.jpg");
    scene.background = textureback;
    window.addEventListener ("resize", () => scene.onWindowResize());
    window.addEventListener('click', () =>  scene.onClick(event), true);
    scene.update();
  });
  