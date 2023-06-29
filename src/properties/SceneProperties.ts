import * as THREE from 'three'
import { Mesh, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { LastClickedObject } from '../model/LastClickedObject'
import { ObjectPicker } from '../model/ObjectPicker'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'


export class SceneProperties {
  scene: THREE.Scene
  light: THREE.Light
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  orbitControls: OrbitControls
  sceneMeshes: THREE.Object3D[]
  objectOutline: THREE.LineSegments
  composer: EffectComposer
  outlinePass: OutlinePass
  mainObject: THREE.Object3D
  lastClickedObject: LastClickedObject
  objectPicker: ObjectPicker
  groundIndex: number

  constructor () {
    this.scene = new THREE.Scene()
    const texture = new THREE.TextureLoader().load('img/background.png')
    this.scene.background = texture
    this.light = createLight()
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
    this.mainObject = new Mesh()
    this.lastClickedObject = new LastClickedObject()
    this.objectPicker = new ObjectPicker(this)

    let effectFXAA;
    this.composer = new EffectComposer( this.renderer );
    const renderPass = new RenderPass( this.scene, this.camera );
    this.composer.addPass( renderPass );
    this.outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera );
    this.outlinePass.visibleEdgeColor.set('#f2dfb4');
    this.outlinePass.hiddenEdgeColor.set('#f2dfb4');
    this.outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending
    this.outlinePass.edgeStrength = 10
    this.outlinePass.renderToScreen = true

    this.composer.addPass( this.outlinePass );
    const gammaPass = new ShaderPass( GammaCorrectionShader );
    this.composer.addPass( gammaPass );
    effectFXAA = new ShaderPass( FXAAShader );
    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    this.composer.addPass( effectFXAA );
    this.groundIndex = this.addGround()
  }

  addGround() : number{
    const ground: Reflector = new Reflector(
      new THREE.PlaneGeometry(4, 4),
      {
          textureWidth: window.innerWidth * window.devicePixelRatio,
          textureHeight: window.innerHeight * window.devicePixelRatio,
          clipBias: 0.003,
          color: 0x808080,
      },
  )
    ground.rotateX(-Math.PI/2)
    ground.position.y = 0
    ground.position.x = 0
    this.scene.add(ground)
    return this.sceneMeshes.push(ground) - 1
  }


  showGround(): void{
    console.log()
    this.sceneMeshes[this.groundIndex].visible = true
  }
  
  hideGround(){
    this.sceneMeshes[this.groundIndex].visible = false
  }
}

function createLight (): THREE.SpotLight {
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
