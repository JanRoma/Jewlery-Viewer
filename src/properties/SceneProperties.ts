import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export class SceneProperties {
  scene: THREE.Scene
  light: THREE.Light
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  orbitControls: OrbitControls
  sceneMeshes: THREE.Object3D[]

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    const texture = new THREE.TextureLoader().load('img/background.png')
    this.scene.background = texture
    this.light = createLight(this.scene)
    this.scene.add(this.light)
    this.camera = createPerspectiveCamera()
    this.renderer = createRenderer(canvas)
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls.minDistance = 3 // 0.35
    this.orbitControls.maxDistance = 35 // 1
    this.orbitControls.minPolarAngle = Math.PI / 4
    this.orbitControls.maxPolarAngle = Math.PI - (Math.PI / 4)
    this.sceneMeshes = []
    const environment = new RoomEnvironment()
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmremGenerator.fromScene(environment).texture
  }
}

export default function createScene(){
  // let renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  console.log('aaa')
  // resize();
  // animate();
}

function createLight (scene: THREE.Scene): THREE.SpotLight {
  const light = new THREE.SpotLight()
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.position.y = 10
  light.position.z = 1

  // const axesHelper = new THREE.AxesHelper(5);
  // const lightHelper = new THREE.SpotLightHelper(light)

  // scene.add(axesHelper)
  // scene.add(lightHelper)
  // scene.add(light)
  return light
}

function createRenderer (canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  return renderer
}

function createPerspectiveCamera (): THREE.PerspectiveCamera {
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.x = 0
  camera.position.z = 5
  camera.position.y = 3
  camera.lookAt(0, 0, 0)
  return camera
}
