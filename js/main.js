var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var renderer;
var scene;
var camera;
var controls;
var has_bullet = 0;

var cube1, cube2, cube3;
var bullet;
var roof = 20;

var Invader = [];
var has_invader = false;
var Fire = [];

// Background
var sceneBG;
var cameraBG;

function init() {
  sceneBG = new THREE.Scene();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xFFFFFF, 1.0);
  renderer.setSize(winWidth, winHeight);
  //renderer.shadowMapEnabled = true;

  camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 1000);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 50;
  camera.position.y = 30;
  controls = new THREE.OrbitControls(camera);
  objects();
  render();

  // segunda camera
  cameraBG = new THREE.OrthographicCamera(-winWidth,winWidth,winHeight,-winHeight,-10000,10000);
  cameraBG.position.z = 50;
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

  var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
  var composer = new THREE.EffectComposer(renderer);
  composer.addPass(bgPass);
}
var Invader;
function objects() {
  // Plano
  var PlaneGeometry = new THREE.PlaneGeometry(100, 60);
  var PlaneMaterial = new THREE.MeshNormalMaterial({});
  var plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
  plane.rotation.x = -Math.PI/2;
  //plane.position.y -= 5;
  scene.add(plane);

  // adicionando o plano de fundo
  var materialColor = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture ("assets/textures/planets/starry_background.jpg"), depthTest: false
  });
  var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  bgPlane.position.z = -100;
  bgPlane.scale.set(winWidth * 2, winHeight * 2, 1);
  sceneBG.add(bgPlane);

  var cube1Geo = new THREE.CubeGeometry(1.6, 0.75, 1);
  var cubeMat = new THREE.MeshNormalMaterial();
  var cube2Geo = new THREE.CubeGeometry(1.3, 0.55, 1);
  var cube3Geo = new THREE.CubeGeometry(0.4, 0.4, 0.4);

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

var bulletGeo= new THREE.CubeGeometry(0.1, 0.2, 0.1);
var bulletMat= new THREE.MeshNormalMaterial();
var Bullet = function(){
  var bullet = new THREE.Mesh(bulletGeo, bulletMat);
  return {
    tiro: function(){
      bullet.position.x = cube3.position.x;
      bullet.position.y = cube3.position.y + 0.5;
      bullet.position.z = cube1.position.z; 
      has_bullet = true;
      return bullet;
    }
  };
}

var i = 0;
function updateCube() {
  //cube3.rotation.x += 0.1;
  cube3.rotation.y += 0.1;
  Invader.position.x =20 * Math.sin(i);
  i+= 0.01;
  if(Key.isDown(Key.A)){
    move_left();
  }else if(Key.isDown(Key.D)){
    move_right();
  }else if(Key.isDown(Key.SPACE)){
    var trintaeoito = new Bullet();
    var gina = trintaeoito.tiro();
    scene.add(gina);
    Fire.push(gina);
  }
}

function update_bullet(){
  for(var x = 0; x < Fire.length; x++){
    if(Fire[x].position.y < roof ) Fire[x].position.y += 0.1;
    else{
      scene.remove(Fire.pop());
    }
  }
  
}

function render() {
  requestAnimationFrame(render); // sets up the render loop
  updateCube();
  controls.update();
  update_bullet();
  renderer.render(scene, camera);

}

window.onload = init;