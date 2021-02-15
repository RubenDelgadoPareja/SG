class MyScene extends THREE.Scene {

    
    constructor (myCanvas) {
      super();

      this.renderer = this.createRenderer(myCanvas);
      
      this.gui = this.createGUI ();
      
      this.createLights ();
      
      this.createCamera ();
      
      this.ejes = new THREE.AxesHelper (5);
      this.add (this.ejes);

      var rotPiernaI = 0.2; 
      var rotRodI = -0.25;
      var rotPieI = 0.05;
      
      var rotPiernaD = 0.2; 
      var rotRodD = -0.25;
      var rotPieD = 0.05;
      

      this.piernaIzq = new Pierna("I", rotPiernaI, rotRodI, rotPieI);
      this.ejes.add (this.piernaIzq);
      this.piernaIzq.position.z = -0.75;

      this.piernaIzq.pie.rotation.z = 0.1;

      this.piernaDer = new Pierna("D", rotPiernaD, rotRodD, rotPieD);
      this.ejes.add (this.piernaDer);

      this.piernaDer.position.z = 0.75;

      // this.tl = new TimelineMax().delay(.3);
      // this.tl.to(rotRodD, .5, {rotRodD:0.5})
      
      
    }
    createCamera () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      this.camera.position.set (0, 5, 8);
      
      var look = new THREE.Vector3 (0,0,0);
      this.camera.lookAt(look);
      this.add (this.camera);
      
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
      }

      var folder = gui.addFolder ('Luz y Ejes');
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
      
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
    }
  }
  
  $(function () {
    var scene = new MyScene("#WebGL-output");
    window.addEventListener ("resize", () => scene.onWindowResize());
    scene.update();
  });
  