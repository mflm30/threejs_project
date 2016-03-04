var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var renderer;
var scene;
var camera;
var controls;
var control;
var has_bullet = 0;
var plane;
var sceneBG;
var cameraBG;
var composer;
var cube1, cube2, cube3;
var bullet;
var roof = 30;
var level = 1;
var record = 1;
var textMesh;
var Invader = [];
var has_invader = false;
var Fire = [];

function init() {
  sceneBG = new THREE.Scene();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xFFFFFF, 1.0);
  renderer.setSize(winWidth, winHeight);
  //renderer.shadowMapEnabled = true;

  camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 1000);
  camera.position.z = 80;
  camera.position.y = 30;
  // camera para olhar para o bg
  cameraBG = new THREE.OrthographicCamera(-winWidth,winWidth,winHeight,-winHeight,-10000,10000);
  cameraBG.position.z = 50;
  control = new THREE.OrbitControls(camera);
  controls = new function() {
    this.rotationSpeed = 0.001
  };

  addControlGui(controls);

  // render passes
  var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
  var renderPass = new THREE.RenderPass(scene, camera);
  renderPass.clear = false;
  var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(bgPass);
  composer.addPass(renderPass);
  composer.addPass(effectCopy);

  objects();
  //lights();

  document.body.appendChild(renderer.domElement);
  render();
}

function name(nivel){
  scene.remove(textMesh);
  var string = "Level : " + nivel + " !!";
  console.log("debug: " + string);
  var textMat = new THREE.MeshBasicMaterial({color: 0xff0000});
  var textGeom = new THREE.TextGeometry( string, { size: 1, height: 0.5, curveSegments: 6,
        font: '2015 Cruiser' // Must be lowercase!
    });
  textMesh = new THREE.Mesh( textGeom, textMat );
  textMesh.position.x = -45;
  textMesh.position.y = 30;
  scene.add( textMesh );
}

function gameover(){
  scene.remove(textMesh);
  var string = "GAME  OVER !!                                                                           RECORD: " + record + " :D";
  console.log("debug: " + string);
  var textMat = new THREE.MeshBasicMaterial({color: 0xff0000});
  var textGeom = new THREE.TextGeometry( string, { size: 1, height: 0.5, curveSegments: 6,
        font: '2015 Cruiser' // Must be lowercase!
    });
  textMesh = new THREE.Mesh( textGeom, textMat );
  textMesh.position.x = -45;
  textMesh.position.y = 30;
  scene.add( textMesh );
}

function invader(){
  var invader1Geo = new THREE.CubeGeometry(1.9, 1.3, 0.5);
  var cubeMat = new THREE.MeshNormalMaterial();
  var invader1 = new THREE.Mesh(invader1Geo, cubeMat);
  invader1.position.x = 0.95;

  var invader2Geo = new THREE.CubeGeometry(0.55, 0.6, 0.5);
  invader1.updateMatrix();
  invader2Geo.merge(invader1Geo, invader1.matrix);
  invader2 = new THREE.Mesh(invader2Geo, cubeMat);
  invader2.position.x = -1.9;

  var invader3Geo = new THREE.CubeGeometry(0.55, 0.6, 0.5);
  invader2.updateMatrix();
  invader3Geo.merge(invader2Geo, invader2.matrix);
  invader3 = new THREE.Mesh(invader3Geo, cubeMat);
  invader3.position.x = 2.3;
  invader3.position.y = 0.4;

  var invader4Geo = new THREE.CubeGeometry(0.3, 1, 0.5);
  invader3.updateMatrix();
  invader4Geo.merge(invader3Geo, invader3.matrix);
  invader4 = new THREE.Mesh(invader4Geo, cubeMat);
  invader4.position.x = -2.7;
  invader4.position.y = 0;

  var invader5Geo = new THREE.CubeGeometry(0.3, 1, 0.5);
  invader4.updateMatrix();
  invader5Geo.merge(invader4Geo, invader4.matrix);
  invader5 = new THREE.Mesh(invader5Geo, cubeMat);
  invader5.position.x = 0.9;
  invader5.position.y = -1.2;

  var invader6Geo = new THREE.CubeGeometry(0.3, 0.3, 0.5);
  invader5.updateMatrix();
  invader6Geo.merge(invader5Geo, invader5.matrix);
  invader6 = new THREE.Mesh(invader6Geo, cubeMat);
  invader6.position.x = 0.9;
  invader6.position.y = 0;

  var invader7Geo = new THREE.CubeGeometry(0.3, 0.3, 0.5);
  invader6.updateMatrix();
  invader7Geo.merge(invader6Geo, invader6.matrix);
  invader7 = new THREE.Mesh(invader7Geo, cubeMat);
  invader7.position.x = 0.35;
  invader7.position.y = 1.6;

  var invader8Geo = new THREE.CubeGeometry(0.3, 0.3, 0.5);
  invader7.updateMatrix();
  invader8Geo.merge(invader7Geo, invader7.matrix);
  invader8 = new THREE.Mesh(invader8Geo, cubeMat);
  invader8.position.x = -1.6;
  invader8.position.y = 0;

  var invader9Geo = new THREE.CubeGeometry(0.3, 0.3, 0.5);
  invader8.updateMatrix();
  invader9Geo.merge(invader8Geo, invader8.matrix);
  invader9 = new THREE.Mesh(invader9Geo, cubeMat);
  invader9.position.x = 1.45;
  invader9.position.y = 0.3;

  var invader10Geo = new THREE.CubeGeometry(0.6, 0.3, 0.5);
  invader9.updateMatrix();
  invader10Geo.merge(invader9Geo, invader9.matrix);
  invader10 = new THREE.Mesh(invader10Geo, cubeMat);
  invader10.position.x = -1.3;
  invader10.position.y = 0;

  var invader11Geo = new THREE.CubeGeometry(0.6, 0.3, 0.5);
  invader10.updateMatrix();
  invader11Geo.merge(invader10Geo, invader10.matrix);
  Invader = new THREE.Mesh(invader11Geo, cubeMat);

  scene.add(Invader);

}
var Invader;
function objects() {

  var cube1Geo = new THREE.CubeGeometry(1.6, 0.75, 1);
  var cubeMat = new THREE.MeshNormalMaterial();
  var cube2Geo = new THREE.CubeGeometry(1.3, 0.55, 1);
  var cube3Geo = new THREE.CubeGeometry(0.4, 0.4, 0.4);
  /*
  var planeGeo = new THREE.PlaneGeometry(100, 100, 100);
  var planeMat = new THREE.MeshBasicMaterial({color: 0x808080});
  plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);
  /*
  Plano com textura
  */
  var earthGeometry = new THREE.PlaneGeometry(100, 100, 100);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("assets/textures/planets/earthmap4k.jpg"), 
  });
  plane = new THREE.Mesh(earthGeometry, sphereMaterial);
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);


  cube1 = new THREE.Mesh(cube1Geo, cubeMat);
  cube1.position.x = 0;
  scene.add(cube1);
  cube2 = new THREE.Mesh(cube2Geo, cubeMat);
  cube2.position.x = 0;
  cube2.position.y = 0.5;
  scene.add(cube2);
  cube3 = new THREE.Mesh(cube3Geo, cubeMat);
  cube3.position.x = 0;
  cube3.position.y = 0.95;
  scene.add(cube3);
  invader();
  Invader.position.y = roof;  

  name(level);

  // Background
  var materialColor = new THREE.MeshBasicMaterial({ 
    map: THREE.ImageUtils.loadTexture ("assets/textures/planets/starry_background.jpg"), 
    depthTest: false,
    side: THREE.DoubleSide
  });
  var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  bgPlane.position.z = -100;
  bgPlane.scale.set(winWidth * 2, winHeight * 2, 1);

  sceneBG.add(bgPlane);
}

function dist(x1, y1, x2, y2){
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  ys = y2 - y1;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function move_left(){
  cube1.position.x -= 0.2;
  cube2.position.x -= 0.2;
  cube3.position.x -= 0.2;
}

function move_right(){
  cube1.position.x += 0.2;
  cube2.position.x += 0.2;
  cube3.position.x += 0.2;
}


function Bullet() {
  var bulletGeo = new THREE.CubeGeometry(0.1, 0.2, 0.1);
  var bulletMat = new THREE.MeshNormalMaterial();
  bullet = new THREE.Mesh(bulletGeo, bulletMat);
  bullet.position.x = cube3.position.x;
  bullet.position.y = cube3.position.y + 0.5;
  bullet.position.z = cube1.position.z; 

  has_bullet = true;
  return bullet;  
  
}

var inv_x = 0;
var inv_y = 0.01;

function updateInvader(){
  Invader.position.x = 20 * Math.sin(inv_x);
  inv_x += 0.01;
  Invader.position.y -= inv_y;

  if(Invader.position.y < 0){
    console.log("GAME OVER!!");
    console.log("RECORD: " + record);
    gameover();
    level = 1;
    Invader.position.y = roof;
    inv_y = 0.01;
  }

}

function updateCube() {
  
  cube3.rotation.y += 0.1;
  
  if(Key.isDown(Key.A)){
    move_left();
  }if(Key.isDown(Key.D)){
    move_right();
  }if(Key.isDown(Key.SPACE) || Key.isDown(Key.W)){
    bullet = Bullet();
    scene.add(bullet);
    Fire.push(bullet);;
  
  }
}

function hit(){
  Invader.position.y = roof;
  inv_y = inv_y * 1.1;
  for(var x = 0; x < Fire.length; x++){
    scene.remove(Fire.shift());
  }
}

function update_bullet(){
  for(var x = 0; x < Fire.length; x++){
    if(Fire[x].position.y < roof ) {
      Fire[x].position.y += 0.1;
      if(dist(Invader.position.x, Invader.position.y, Fire[x].position.x, Fire[x].position.y) < 3){
        //console.log("BATEU");
        console.log("LEVEL " + ++level);
        name(level);
        if(level > record) record = level;
        hit();
      }
    } 
    else{
      scene.remove(Fire[0]);
      Fire.shift();
    }
  }
  
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
}

function render() {
  requestAnimationFrame(render); // sets up the render loop
  updateCube();
  control.update();
  update_bullet();
  updateInvader();
  composer.render();
  renderer.render(scene, camera);
  renderer.autoClear = false;
}

window.onload = init;