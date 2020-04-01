class MyCili extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
  
   
      // Un Mesh se compone de geometría y material
      var ciliGeo = new THREE.CylinderGeometry(this.guiControls.rad_sup,this.guiControls.rad_inf,this.guiControls.alt,this.guiControls.seg);
      // Como material se crea uno a partir de un color
      var ciliMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
      
      // Ya podemos construir el Mesh
      this.cili = new THREE.Mesh (ciliGeo, ciliMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.cili);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.cili.position.y = 1;
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
  
        this.rad_sup = 1;
        this.rad_inf = 1;
        this.alt = 2;
        this.seg = 3;
      
        
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
  
          this.rad_sup = 1;
          this.rad_inf = 1;
          this.alt = 2;
          this.seg = 3;
        }
      } 
  
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'rad_sup', 0.1, 5.0, 0.1).name ('Radio Superior : ').listen()
        .onChange(function(rad_sup){
          var newGeo = new THREE.CylinderGeometry(rad_sup,that.guiControls.rad_inf,that.guiControls.alt,that.guiControls.seg);
          that.cili.geometry = newGeo;
        }); 
      folder.add (this.guiControls, 'rad_inf', 0.1, 5.0, 0.1).name ('Radio Inferior: ').listen()
        .onChange(function(rad_inf){
          var newGeo = new THREE.CylinderGeometry(that.guiControls.rad_sup,rad_inf,that.guiControls.alt,that.guiControls.seg);
          that.cili.geometry = newGeo;
        });

    
        
      folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Altura : ').listen();
      folder.add (this.guiControls, 'seg', 2, 15.0, 1).name ('Resolucion : ').listen()
      .onChange(function(seg){
        var newGeo = new THREE.CylinderGeometry(that.guiControls.rad_sup,that.guiControls.rad_inf,that.guiControls.alt,seg);
        that.cili.geometry = newGeo;
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
      this.cili.rotation.x += 0.01;
      this.cili.rotation.y += 0.01;
      
    }
  
  }