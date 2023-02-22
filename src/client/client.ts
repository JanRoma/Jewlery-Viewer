import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene : THREE.Scene = new THREE.Scene()

const camera = createPerspectiveCamera()

const renderer = createRenderer()
document.body.appendChild(renderer.domElement)

addOrbitControls(camera, renderer)
addRoomEnvironment(scene)
addMainObject(scene)
addTopLight(scene)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)


    render()
}

function render() {
    renderer.render(scene, camera)
}

function addRoomEnvironment(scene: THREE.Scene) {
    const roomGeometry = new THREE.BoxGeometry(2,2,2)
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

animate()
function addMainObject(scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(0.5,0.5,0.5)
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        wireframe: false,
    })

    const mainObject = new THREE.Mesh(geometry, material)
    mainObject.castShadow = true
    mainObject.receiveShadow = true
    scene.add(mainObject)
}

function createPerspectiveCamera() : THREE.PerspectiveCamera {
    const camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 2
    return camera
}

function addTopLight(scene: THREE.Scene) {
    const light = new THREE.SpotLight()
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;

    const helper = new THREE.SpotLightHelper(light)

    scene.add(light)
    scene.add(helper)
}

