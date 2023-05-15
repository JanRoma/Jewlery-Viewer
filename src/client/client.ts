import * as Utils from './Utils'
import { ApplicationProperties } from './properties/ApplicationProperties'
import { SceneProperties } from './properties/SceneProperties'
// import { ObjectPicker } from './model/ObjectPicker'
// import { type WebGLRenderer } from 'three'//
// import { TextureDatabase } from './fileHandling/TextureDatabase'
import * as ModelLoadingUtils from './fileHandling/ModelLoader'
import { GUIHandler } from './uiHandling/GUIHandler'
import { GUI } from 'dat.gui'
import { UIHandler } from './uiHandling/UIHandler'
import Stats from 'three/examples/jsm/libs/stats.module'
import { DragAndDropUIHandler } from './uiHandling/DragAndDropUIHandler'
import { RotationUIHandler } from './uiHandling/RotationUIHandler'
import { RotationController } from './model/RotationController'
import { MetalUIHandler } from './uiHandling/MetalChangeUIHandler'
import { MetalController } from './model/MetalController'
import { GemUIHandler } from './uiHandling/GemChangeUIHandler'
import { GemController } from './model/GemController'
import { CssController } from './uiHandling/CssController'
import { ModelUIHandler } from './uiHandling/ModelChangeUIHandler'
import { ModelController } from './model/ModelController'
import { MaterialSet } from './data/MaterialSet'
import { ColorSet } from './data/ColorSet'
// import { type WebGLRenderer } from 'three'

// VARIABLES
const appProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById('progress') as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const sceneProperties = new SceneProperties()
// const textureDatabase = new TextureDatabase(sceneProperties.renderer as WebGLRenderer)

const colorController = new ColorSet()
const cssController = new CssController(colorController)
const materialController = new MaterialSet(colorController)

const modelLoader = new ModelLoadingUtils.ModelLoader(appProperties, sceneProperties)

const rotationUIHandler = new RotationUIHandler(document, new RotationController(sceneProperties.orbitControls))
const metalUIHandler = new MetalUIHandler(document, new MetalController(appProperties.mainObject), cssController, appProperties, materialController)
const gemUIHandler = new GemUIHandler(document, appProperties, new GemController(materialController, appProperties.mainObject), materialController, cssController)
const modelUIHandler = new ModelUIHandler(document, new ModelController(appProperties.mainObject, modelLoader), cssController)

const uiHandler = new UIHandler(new DragAndDropUIHandler(document, loadingManager, appProperties, modelLoader), new GUIHandler(new GUI()), Stats(), rotationUIHandler, metalUIHandler, gemUIHandler, modelUIHandler)

// const objectPicker = new ObjectPicker(sceneProperties, uiHandler)
uiHandler.createRotationDiv()
uiHandler.createMetalDiv()
uiHandler.createGemDiv()
uiHandler.createModelDiv()
// objectPicker.SetMouseListeners()
const stats = Utils.addStats()

document.body.appendChild(sceneProperties.renderer.domElement)
// Utils.addMouseHandler(envProperties, appProperties)
// ModelLoadingUtils.loadGLTFModel('models/decorated_ring2/ring.glb', loadingManager, appProperties, sceneProperties, textureDatabase)
// ModelLoadingUtils.loadGLTFModel('models/jasiu/Jasiu2.glb', loadingManager, appProperties, sceneProperties, textureDatabase)

modelLoader.loadOBJModel('models/jasiu', 'Jasiu3')

window.addEventListener('resize', onWindowResize, false)

function onWindowResize (): void {
  sceneProperties.camera.aspect = window.innerWidth / window.innerHeight
  sceneProperties.camera.updateProjectionMatrix()
  sceneProperties.renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate (): void {
  requestAnimationFrame(animate)
  stats.update()
  // appProperties.mainObject.rotateX(0.05)
  // dragAndDropHandler.SetDragAndDrop()

  if (!appProperties.isModelAdded) {
    if (appProperties.isModelLoaded) {
      appProperties.mainObject.scale.set(0.2, 0.2, 0.2)
      sceneProperties.scene.add(appProperties.mainObject)
      // Utils.addGUI(appProperties.mainObject, envProperties.controls)
      appProperties.isModelAdded = true
      console.dir(appProperties.mainObject)
    }
  }
  sceneProperties.orbitControls.update()
  render()
}

function render (): void {
  sceneProperties.renderer.render(sceneProperties.scene, sceneProperties.camera)
}

animate()
