class MyToro extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
  
   
      // Un Mesh se compone de geometría y material
      var toroGeo = new THREE.TorusGeometry(this.guiControls.rad,this.guiControls.tub,this.guiControls.set_rad,this.guiControls.seg_tub);
      // Como material se crea uno a partir de un color
      var toroMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
      // Ya podemos construir el Mesh
      this.toro = new THREE.Mesh (toroGeo, toroMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.toro);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.toro.position.y = 1;
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
        this.tub = 1;
        this.seg_rad = 5;
        this.seg_tub = 5;
      
        
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
        this.tub = 1;
        this.seg_rad = 5;
        this.seg_tub = 5;
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
          var newGeo = new THREE.TorusGeometry(rad,that.guiControls.tub,that.guiControls.set_rad,that.guiControls.seg_tub);
          that.toro.geometry = newGeo;
        }); 
      folder.add (this.guiControls, 'tub', 0.1, 5.0, 0.1).name ('Tubo : ').listen()
        .onChange(function(tub){
          var newGeo = new THREE.TorusGeometry(that.guiControls.rad_sup,tub,that.guiControls.set_rad,that.guiControls.seg_tub);
          that.toro.geometry = newGeo;
        });

    
      folder.add (this.guiControls, 'seg_rad', 2, 15.0, 1).name ('Resolucion Toro : ').listen()
      .onChange(function(seg_rad){
        var newGeo = new THREE.TorusGeometry(that.guiControls.rad,that.guiControls.tub,seg_rad,that.guiControls.seg_tub);
        that.toro.geometry = newGeo;
      });

      folder.add (this.guiControls, 'seg_tub', 2, 15.0, 1).name ('Resolucion Tubo: ').listen()
      .onChange(function(seg_tub){
        var newGeo = new THREE.TorusrGeometry(that.guiControls.rad,that.guiControls.tub,that.guiControls.seg_rad,seg_tub);
        that.toro.geometry = newGeo;
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
      this.toro.rotation.x += 0.01;
      this.toro.rotation.y += 0.01;
      
    }
  
  }