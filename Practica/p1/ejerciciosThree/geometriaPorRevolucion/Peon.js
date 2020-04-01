 
class Peon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.points = [];
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.points.push (new THREE.Vector3 (0,-1.4, 0));
    this.points.push (new THREE.Vector3 (1.0 ,-1.4 ,0.0));
    this.points.push (new THREE.Vector3 (1.0 ,-1.1 ,0.0));
    this.points.push (new THREE.Vector3 (0.5 ,-0.7 ,0.0));
    this.points.push (new THREE.Vector3 (0.4 ,-0.4, 0.0));
    this.points.push (new THREE.Vector3 (0.4, 0.5, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 0.6, 0.0));
    this.points.push (new THREE.Vector3 (0.3, 0.6, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 0.8, 0.0));
    this.points.push (new THREE.Vector3 (0.55, 1.0, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 1.2, 0.0));
    this.points.push (new THREE.Vector3 (0.3, 1.4, 0.0));
    this.points.push (new THREE.Vector3 (0,1.4, 0));


    //Creacion del peon
    this.peonMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
    this.peon = new THREE.Mesh (new THREE.LatheGeometry (this.points), this.peonMat);
    this.peon.position.y = 0.5 + 1.4;
    this.add (this.peon);

    

    // Para crear una línea visible, como en el vídeo
    this.lineMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
    this.lineGeometry = new THREE.Geometry();
    this.lineGeometry.vertices = this.points;
    this.line = new THREE.Line (this.lineGeometry, this.lineMat);
    this.line.position.y = 0.5 + 1.4;
    this.line.position.x = -5;
    this.add(this.line);

    //Para crear el peon medio dibujado
    this.semipeonMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
    this.semipeonGeo = new THREE.LatheGeometry(this.points,12,Math.PI,Math.PI);
    this.semipeon = new THREE.Mesh (this.semipeonGeo, this.semipeonMat);
    this.semipeon.position.y = 0.5 + 1.4;
    this.semipeon.position.x = 5;
    this.add (this.semipeon);
    

   

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de el peon
    this.guiControls = new function () {
        this.resolution = 10.0;
        this.angle = Math.PI;
    }
    var that = this;
    var folder = gui.addFolder (titleGui);
    folder.add(this.guiControls, 'resolution',3.0,20.0,1.0).name('Resolución: ').listen().onChange(function(resolution){
        var newpeonGeo = new THREE.LatheGeometry(that.points,resolution,0.0,that.guiControls.angle);
        that.peon.geometry = newpeonGeo;
    });
    folder.add(this.guiControls, 'angle',0.0,2*Math.PI,0.1).name('Ángulo: ').listen().onChange(function(angle){
        var newpeonGeo = new THREE.LatheGeometry(that.points,that.guiControls.resolution,0.0,angle);
        that.peon.geometry = newpeonGeo;
    });  
}
  
  update () {}
}