import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class SceneProperties {
  scene: THREE.Scene
  light: THREE.Light
  camera: THREE.PerspectiveCamera
  renderer: THREE.Renderer
  orbitControls: OrbitControls
  sceneMeshes: THREE.Object3D[]

  constructor () {
    this.scene = new THREE.Scene()
    const texture = new THREE.TextureLoader().load('img/background2.png')
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
  }
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

function createRenderer (): THREE.Renderer {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
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
