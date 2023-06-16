import * as THREE from 'three'
import { Mesh, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export class SceneProperties {
  scene: THREE.Scene
  light: THREE.Light
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  orbitControls: OrbitControls
  sceneMeshes: THREE.Object3D[]
  objectOutline: THREE.LineSegments

  constructor () {
    this.scene = new THREE.Scene()
    const texture = new THREE.TextureLoader().load('img/background.png')
    this.scene.background = texture
    this.light = createLight(this.scene)
    this.scene.add(this.light)
    this.camera = createPerspectiveCamera()
    this.renderer = createRenderer()
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

function createLight (scene: THREE.Scene): THREE.SpotLight {
  const light = new THREE.SpotLight()
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.position.y = 10
  light.position.z = 1

  return light
}

function createRenderer (): THREE.WebGLRenderer {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement
  const renderer: THREE.WebGLRenderer = new WebGLRenderer({canvas: canvas})
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
