import './style.css'

import * as   THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Text } from 'troika-three-text'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

import marsTextureTe from "./assets/Mars.jpg";
const marsTexture = new THREE.TextureLoader().load(marsTextureTe);
//const marsTexture = new THREE.TextureLoader().load('./assets/Mars.jpg');
import marsNormalTe from "./assets/marsNorrmal.jpg";
const marsNormal = new THREE.TextureLoader().load(marsNormalTe);
//const marsNormal = new THREE.TextureLoader().load('./assets/marsNorrmal.jpg');

import bgTe from "./assets/bg.jpg";
const bgImage = new THREE.TextureLoader().load(bgTe);

const backgroundGeometry = new THREE.SphereGeometry(250, 64, 64);
const backgroundMaterial = new THREE.MeshBasicMaterial({
  map: bgImage,
  side: THREE.BackSide,
})

const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);


scene.add(backgroundMesh);


const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: marsTexture,
      normalMap: marsNormal

    }
  )
);

const material2 = new THREE.LineBasicMaterial({ color: 0xffffff });
const points = [];
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(2, 10, 0));



const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry2, material2);
scene.add(line, mars);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight, ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);




function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// Create:
const myText = new Text()
scene.add(myText)

// Set properties to configure:
myText.text = 'Mars'
myText.fontSize = 10.2
myText.position.y = 20
myText.color = 0xffffFF

// Update the rendering:
myText.sync()




const parg = new Text()
scene.add(parg)

// Set properties to configure:
parg.text = 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet"'
parg.fontSize = 1
parg.position.y = 3
parg.position.x = -25
parg.maxWidth = 20;
parg.letterSpacing = 0.1
parg.lineHeight = 1
parg.outlineBlur = 0.2
parg.outlineColor = 0xffffff
parg.color = 0xffffff
parg.textAlign = 'justify'



// Update the rendering:
parg.sync()



const madeBy = new Text()
scene.add(madeBy)

// Set properties to configure:
madeBy.text = 'Made By Saif'
madeBy.fontSize = 1
madeBy.position.y = -5
madeBy.position.x = -25
madeBy.maxWidth = 20;
madeBy.strokeWidth = 1
madeBy.strokeColor = 0xffffff
madeBy.color = 0xFF0000
madeBy.textAlign = 'justify'



// Update the rendering:
madeBy.sync()
Array(200).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate);
  mars.rotation.x += 0.001;
  mars.rotation.y += 0.001;
  mars.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

animate();