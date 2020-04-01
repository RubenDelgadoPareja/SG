class MySphere extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
  
   
      // Un Mesh se compone de geometría y material
      var sphereGeo = new THREE.SphereGeometry(this.guiControls.rad,this.guiControls.set_anch,this.guiControls.seg_alt);
      // Como material se crea uno a partir de un color
      var sphereMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
      
      // Ya podemos construir el Mesh
      this.sphere = new THREE.Mesh (sphereGeo, sphereMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.sphere);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.sphere.position.y = 1;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el  radio, altura y resolución del cono
      this.guiControls = new function () {
        this.sizeX = 1.0;
        this.sizeY = 2.0;
        this.sizeZ = 1.0;
        
        /*this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;*/
  
        this.rad = 1;
        this.seg_anch = 2;
        this.seg_alt = 3;
      
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.sizeX = 1.0;
          this.sizeY = 2.0;
          this.sizeZ = 1.0;
          
          /*this.rotX = 0.0;
          this.rotY = 0.0;
          this.rotZ = 0.0;
          
          this.posX = 0.0;
          this.posY = 0.0;
          this.posZ = 0.0;*/
  
          this.rad = 1;
          this.set_anch = 2;
          this.seg_alt = 3;
        }
      } 
  
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'rad', 0.1, 5.0, 0.1).name ('Radio : ').listen()
        .onChange(function(rad){
          var newGeo = new THREE.SphereGeometry(rad,that.guiControls.set_anch,that.guiControls.seg_alt);
          that.sphere.geometry = newGeo;
        });
        
      folder.add (this.guiControls, 'seg_anch', 2, 15.0, 1).name ('Res. Ecuador : ').listen()
      .onChange(function(seg_anch){
        var newGeo = new THREE.SphereGeometry(that.guiControls.rad,seg_anch,that.guiControls.seg_alt);
        that.sphere.geometry = newGeo;
      });
      folder.add (this.guiControls, 'seg_alt', 2, 15.0, 1).name ('Res. Meridiano : ').listen()
      .onChange(function(seg_alt){
        var newGeo = new THREE.SphereGeometry(that.guiControls.rad,that.guiControls.seg_anch,seg_alt);
        that.sphere.geometry = newGeo;
      });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
      //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      this.sphere.rotation.x += 0.01;
      this.sphere.rotation.y += 0.01;
      
    }
  
  }