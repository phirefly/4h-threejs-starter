import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from 'tweakpane';

console.log("Hello World!");
console.log(THREE);

const pane = new Pane();

const scene = new THREE.Scene();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0x5CA8C6
  // color: 0x999999
});

// const torusMaterial = new THREE.MeshLambertMaterial({
const torusMaterial = new THREE.MeshPhongMaterial({
  color: 0x999999
});
torusMaterial.shininess = 500;

pane.addBinding(torusMaterial, 'shininess', {
    min: 0,
    max: 1000,
    step: 1
})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)
const mesh2 = new THREE.Mesh(torusKnotGeometry, torusMaterial)
mesh2.position.x = 1.75


const light = new THREE.AmbientLight(0xffffff, .5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(5,2,2)
scene.add(pointLight);

scene.add(cubeMesh);
scene.add(mesh2);


const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

// Z: closer and further
camera.position.z = 5;
// X: left and right
camera.position.x = 0;
// Y: up and down
camera.position.y = -2;


const canvas = document.querySelector('canvas.threejs-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.autoRotate = true;



window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();


