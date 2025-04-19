import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import Lenis from 'lenis';

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

//Lenis

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


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
.to('.bg-overlay', {
  background: '#FAE1EE',
  ease: 'power4.inOut',
  duration: 1
})
.to('.theBox', {
  scrollTrigger: {
    trigger: '.theBox',
    start: 'center 50%',
    end: '720% center',
    pin: true,
    pinSpacing: false,
    // markers: true,
    scrub: 1,
    // markers: true
  }
}, )
.to('.img1', {
  y: '-=100vh',
  duration: 1,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '.leftDiv1',
    start: '55% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
}, 'change1' )
.to('.img2', {
  y: '-=100vh',
  duration: 2,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '.leftDiv2',
    start: '55% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
}, 'change2')
.to('.img3', {
  y: '-=100vh',
  duration: 2,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '.leftDiv3',
    start: '45% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
}, 'change3')
.to('.img4', {
  y: '-=100vh',
  duration: 2,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '.leftDiv4',
    start: '45% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
}, )
.to('.bg-overlay', {
  background: '#E0F0FF',
  ease: 'power2.inOut',
  duration: 1,
  scrollTrigger: {
    trigger: '.leftDiv1',
    start: '55% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
})
.to('.bg-overlay', {
  background: '#FFEDE0',
  ease: 'power2.inOut',
  duration: 1,
  scrollTrigger: {
    trigger: '.leftDiv2',
    start: '55% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
})
.to('.bg-overlay', {
  background: '#D3D6F0',
  ease: 'power2.inOut',
  duration: 1,
  scrollTrigger: {
    trigger: '.leftDiv3',
    start: '45% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
})
.to('.bg-overlay', {
  background: '#FFEAE0',
  ease: 'power2.inOut',
  duration: 1,
  scrollTrigger: {
    trigger: '.leftDiv4',
    start: '45% 50%',
    end: '150% center',
    scrub: 1,
    // markers: true
  }
})


let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();
