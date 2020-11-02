import * as THREE from 'three';
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fx from './fx.gltf'
import { Timeline } from 'gsap/gsap-core';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()


init()
let fxLogo;
let fontPos


const loader = new GLTFLoader()
let fxMesh;
let fxLogoArr =[]
loader.load( fx, function ( gltf ) {
  fxMesh = gltf.scene
  fxMesh.rotation.x = 8.1
  fxMesh.rotation.y = 3.15
  

  // pass in the number of rows 
  // fxLogo = drawLogo(6)
  fxLogoArr = Array.from({length:200}, (item)=>{
    return drawLogo(6)
  })
  
  fxLogoArr.forEach((shp)=>{
    shp.position.set(getRandom(-10,10),getRandom(-10,10),getRandom(-200,-150))
    shp.rotationYFactor = getRandom(-0.01,0.01)
    shp.rotationXFactor = getRandom(-0.01,0.01)
    shp.scaleFactor = getRandom(-0.01,0.01)
    shp.currentScale = getRandom(-0.001,0.001)
    scene.add(shp)
    
  })
  // const tl = new Timeline({repeat: 10})
  // tl.to(fxLogo.scale,3,{x: 5})
  

})

const fontloader = new THREE.FontLoader();
let textGeo;
fontloader.load( 'https://threejs.org//examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const textGeometry = new THREE.TextGeometry( 'FxDigital', {
		font: font,
		size: 40,
		height: 30,
		curveSegments: 12,
		// bevelEnabled: true,
		// bevelThickness: 10,
		// bevelSize: 8,
		// bevelOffset: 0,
		// bevelSegments: 5
  } );
  
  const textMaterial = new THREE.MeshPhongMaterial( 
    { color: 0xeb0042 }
  );

  textGeo = new THREE.Mesh( textGeometry, textMaterial );
  textGeo.position.set(-100,0,-100)
  textGeo.rotation.y = 0

  scene.add( textGeo );

} );


function drawLogo(yLength){
  let y = 0
  const grp = new THREE.Group()
  for(let i = 0; i<yLength; i++){
    let x = 0;
    const row = {
      length: i % 2 == 0 ? 4 : 5,
      starting : i % 2 == 0 ? 2.5 : 0
    }
    for(let z = 0; z < row.length; z++){
      const fxNugg = fxMesh.clone()
      fxNugg.position.set(row.starting + x,y,0)
      grp.add(fxNugg)
      x += 5
    }
    y+= 4.1
  }
  return grp
}



const light = new THREE.PointLight(0xffffff, 1, 500)
light.position.set(10, 0, 25)
scene.add(light)





animate()



function init() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.setClearColor('#f5f5f5')
    camera.position.z = 100;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    fxLogoArr.forEach((shp)=>{
      shp.rotation.x += shp.rotationXFactor
      shp.rotation.y += shp.rotationYFactor
  
      // if(scaleFactor > 5){
      //   scaleFactorSign = -1
      // }else if(scaleFactor  < 1){
      //   scaleFactorSign = 1
      // }
  
  
  
      
      shp.currentScale += shp.scaleFactor
      shp.scale.set(shp.currentScale,shp.currentScale,shp.currentScale)

    })



}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix
})

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


