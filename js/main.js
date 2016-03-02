const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

var renderer;
var scene;
var camera;

var sceneBG;
var cameraBG;
var composer;

var control;

var controls;

var earth;
var clouds;

function init() {
  sceneBG = new THREE.Scene();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(winWidth, winHeight);

  camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 1000);
  camera.position.x = 35;
  camera.position.y = 36;
  camera.position.z = 33;
  camera.lookAt(scene.position);

  cameraBG = new THREE.OrthographicCamera( 
                                    -winWidth, 
                                    winWidth, 
                                    winHeight, 
                                    -winHeight, 
                                    -10000, 
                                    10000);

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
  lights();

  document.body.appendChild(renderer.domElement);
  render();
}

function objects() {
    var earthGeometry = new THREE.SphereGeometry(30, 100, 100);
    var texture = THREE.ImageUtils.loadTexture(
                  "assets/textures/planets/earthmap4k.jpg");
    var normalMap = THREE.ImageUtils.loadTexture(
                  "assets/textures/planets/earth_normalmap_flat4k.jpg");
    var specularMap = THREE.ImageUtils.loadTexture(
                  "assets/textures/planets/earthspec4k.jpg"
                  );
    var sphereMaterial = new THREE.MeshPhongMaterial({
          map : texture,
          normalMap : normalMap,
          specularMap : specularMap,
          specular : new THREE.Color(0x262626),
        });
    earth = new THREE.Mesh(earthGeometry, sphereMaterial);

  var cloudGeometry = new THREE.SphereGeometry(
                            earthGeometry.parameters.radius * 1.01,
                            earthGeometry.parameters.widthSegments,
                            earthGeometry.parameters.heightSegments
                          );

  var cloudTexture = THREE.ImageUtils.loadTexture(
                      "assets/textures/planets/fair_clouds_4k.png");
  var cloudMaterial = new THREE.MeshBasicMaterial({
                          map: cloudTexture,
                          transparent : true,
                          opacity : 0.8
                      });

  clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  
  var materialColor = new THREE.MeshBasicMaterial({ 
                            map: THREE.ImageUtils.loadTexture (
                                  "assets/textures/planets/starry_background.jpg"
                                ), 
                            depthTest: false
                          });
  var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  bgPlane.position.z = -100;
  bgPlane.scale.set(winWidth * 2, winHeight * 2, 1);

  sceneBG.add(bgPlane);
  scene.add(earth);
  scene.add(clouds);
}

function lights() {
  var ambient = new THREE.AmbientLight(0x111111);
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(100, 10, -50);

  scene.add(ambient);
  scene.add(light);
}

function updateEarth() {
    earth.rotation.y += controls.rotationSpeed;
    clouds.rotation.y += controls.rotationSpeed * 1.1;

    if(Key.isDown(Key.W)){
      earth.position. y += 1;
      clouds.position. y += 1;
    }
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
}

function render() {
  updateEarth();
  control.update();
  renderer.render(scene, camera);
  renderer.autoClear = false;
  composer.render();
  requestAnimationFrame(render);
}

window.onload = init;