import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

let scene, camera, renderer, geometry, material, mesh, canvas;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

gsap.registerPlugin(ScrollTrigger);

canvas = document.querySelector('#canvas');

renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

geometry = new THREE.IcosahedronGeometry(2, 50);
material = new THREE.ShaderMaterial({
  // wireframe: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0.0 },
    uColor: { value: 0}
  },

});
mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -2.5;
scene.add(mesh);

camera.position.z = 3;

window.addEventListener('resize', function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.landing',
    start: 'top top',
    end: 'bottom center',
    scrub: 2,
    // markers: true
  }
})


tl.to(mesh.position, {
  y: 0,
  z: -1.5,
  ease: "power2.inOut"
}, 'a')
.to(material.uniforms.uColor, {
  value: 1,
  ease: "power2.inOut"
}, 'a')
.to('.landing h1', {
  opacity: 0,
  ease: "power2.inOut"
}, 'a')
.to('.landing p', {
  opacity: 1,
})
.to('body', {
  background: '#FAE1EE',
  ease: "power2.inOut",
  duration: 1
})


let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();
