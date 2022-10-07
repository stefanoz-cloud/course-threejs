import './style.css'
import * as THREE from 'three'
import { Float32BufferAttribute } from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Object
const geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
const material = new THREE.MeshBasicMaterial( {vertexColors: true} );
const positionAttribute = geometry.getAttribute('position');
  const colors = [];

  const color = new THREE.Color();

  for (let i = 0; i < positionAttribute.count; i += 6) {

    color.setHex(0xffffff * Math.random());

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  } // for
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
// Mesh Object And Add In Scene
const object = new THREE.Mesh(geometry,material);
scene.add(object);

// Resize
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const animate = () =>
{
    // Update objects
    object.rotation.x += 0.01;
	object.rotation.y += 0.01;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(animate);
}
animate();