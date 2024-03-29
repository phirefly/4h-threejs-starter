import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log("Hello World!");
console.log(THREE);

const scene = new THREE.Scene();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000
});

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

scene.add(cubeMesh);


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


