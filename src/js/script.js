import * as THREE from '../../libs/three137/three.module.js';
import { OrbitControls } from '../../libs/three137/OrbitControls.js';

import starsTexture from '../../imgs/stars.jpg';
import sunTexture from '../../imgs/sun.jpg';
import earthTexture from '../../imgs/earth.jpg';
import jupiterTexture from '../../imgs/jupiter.jpg';
import marsTexture from '../../imgs/mars.jpg';
import mercuryTexture from '../../imgs/mercury.jpg';
import neptuneTexture from '../../imgs/neptune.jpg';
import plutoTexture from '../../imgs/pluto.jpg';
import saturnRingTexture from '../../imgs/saturnRing.jpg';
import saturnTexture from '../../imgs/saturn.jpg';
import uranusRingTexture from '../../imgs/uranusRing.jpg';
import uranusTexture from '../../imgs/uranus.jpg';
import venusTexture from '../../imgs/venus.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x33333, 1);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();

//Point Light
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

//The Sun
const sunGeo = new THREE.SphereGeometry(40, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//function to make planets
function createPlanets(size, texture, position, ring){
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring){
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
        ringMesh.rotation.y = -0.09 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj };
}

const mercury = createPlanets(3.2, mercuryTexture, 65);
const venus = createPlanets(5.8, venusTexture, 80);
const earth = createPlanets(6, earthTexture, 105);
const mars = createPlanets(4, marsTexture, 125);
const jupiter = createPlanets(12, jupiterTexture, 150);
const saturn = createPlanets(10, saturnTexture, 200, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanets(7, uranusTexture, 250, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanets(7, neptuneTexture, 270);
const pluto = createPlanets(2.8, plutoTexture, 300);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


function animate(){
    //self rotation
    sun.rotateY(0.004);

    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //around sun rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);


    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})