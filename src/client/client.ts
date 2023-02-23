import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { RotatableMesh } from './RotatableMesh'

// SET ENVIRONMENT
const scene : THREE.Scene = new THREE.Scene()
const camera = createPerspectiveCamera()
const renderer = createRenderer()
document.body.appendChild(renderer.domElement)

// addOrbitControls(camera, renderer)

// SET DEBUG STUFF
addGUI()
const stats = Stats()
document.body.appendChild(stats.dom)


// SET SCENE
addRoomEnvironment(scene)
addTopLight(scene)
scene.add(createMainObject())

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    stats.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}

function addRoomEnvironment(scene: THREE.Scene) {
    const roomGeometry = new THREE.BoxGeometry(3.5,3.5,3.5)
    const roomMaterial = new THREE.MeshLambertMaterial( {color: 0xaaaaaa, side: THREE.BackSide} )
    const room = new THREE.Mesh(roomGeometry, roomMaterial)
    room.castShadow = true
    room.receiveShadow = true
    scene.add(room)
}

function addOrbitControls(camera : THREE.Camera, renderer : THREE.Renderer ){
    const controls = new OrbitControls(camera, renderer.domElement)
}

function createRenderer() : THREE.Renderer {
    const renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    return renderer
}

function createMainObject() : THREE.Mesh {
    const geometry = new THREE.BoxGeometry(0.5,0.5,0.5)
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        wireframe: false,
    })

    const mainObject = new RotatableMesh(geometry, material, renderer.domElement)
    mainObject.castShadow = true
    mainObject.receiveShadow = true
    mainObject.scale.set(0.5,0.5,0.5)
    
    return mainObject
    
}

function createPerspectiveCamera() : THREE.PerspectiveCamera {
    const camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.x = 0.5
    camera.position.z = 0.5
    camera.position.y = 0.5
    camera.lookAt(0,0,0)
    return camera
}

function addTopLight(scene: THREE.Scene) {
    const light = new THREE.SpotLight()
    // light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.position.y = 2

    const helper = new THREE.SpotLightHelper(light)

    scene.add(light)
    scene.add(helper)
}


function addGUI() {
    const gui = new GUI()
    const cubeFolder = gui.addFolder('Cube')
    // cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
    // cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
    // cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
    // cubeFolder.open()
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'z', 0, 10)
    cameraFolder.open()
}



animate()
