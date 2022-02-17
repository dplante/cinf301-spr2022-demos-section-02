import './style.css'

import * as THREE from 'three';
import { Color, PerspectiveCamera } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// initiate the scene, camera & renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight , 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

//set renderer to match window

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//set camera position

camera.position.setZ(30);
camera.position.setY(30);
camera.rotateX(-1);


//add donut geometry
const geometry = new THREE.TorusGeometry(10,6,16,100);
// add donut texture and apply to material
const material = new THREE.MeshStandardMaterial({color: 0xFF6347,});
const texture = new THREE.TextureLoader().load('donut3.jpg')
const material2 = new THREE.MeshBasicMaterial({map: texture})
// orient the material to match geometry
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.offset.y = 0.6;
texture.repeat.set(4,1);
//combine geometry with material
const torus = new THREE.Mesh(geometry,material2); 
//add object to scene
scene.add(torus);
//set background color
scene.background = new THREE.Color(0xffccf0);

//add point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
scene.add(pointLight);

//add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//add visual helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


// create animation loop
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);

  controls.update();
}

// animate()
renderer.render(scene, camera);
requestAnimationFrame(animate);



