import * as THREE from 'three';

console.log("Hello World!");
console.log(THREE);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000
});

const scene = new THREE.Scene();
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

scene.add(cubeMesh);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;
scene.add(camera);

const canvas = document.querySelector('canvas.threejs-canvas');

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

