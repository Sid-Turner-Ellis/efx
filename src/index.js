import * as THREE from 'three';
import gsap from "gsap";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

init()
const cube = createCube()
scene.add(cube)

const light = new THREE.PointLight(0xffffff, 1, 500)
light.position.set(10, 0, 25)
scene.add(light)


animate()

var tl = new gsap.timeline().delay(0.3).repeat(-1)
tl.to(cube.scale, 1, { x: 2 })
tl.to(cube.scale, 0.5, { x: 0.5 })
tl.to(cube.position, 0.5, { x: 0.2 })
tl.to(cube.rotation, 0.5, { x: Math.PI * 0.5 })





function init() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.setClearColor('#e5e5e5')
    camera.position.z = 10;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.05
    cube.rotation.y += 0.01

}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix
})

function createCube() {
    const geometry = new THREE.BoxGeometry(5, 5, 5)
    const material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
}