import * as Utils from './Utils'
import { ApplicationProperties } from './properties/ApplicationProperties'
import { SceneProperties } from './properties/SceneProperties'
import { ObjectPicker } from './model/ObjectPicker'
import { type WebGLRenderer } from 'three'
import { TextureDatabase } from './fileHandling/TextureDatabase'
import * as ModelLoadingUtils from './fileHandling/ModelLoadingUtils'
import { GUIHandler } from './uiHandling/GUIHandler'
import { GUI } from 'dat.gui'
import { UIHandler } from './uiHandling/UIHandler'
import Stats from 'three/examples/jsm/libs/stats.module'
import { DragAndDropUIHandler } from './uiHandling/DragAndDropUIHandler'
import { RotationUIHandler } from './uiHandling/RotationUIHandler'
import { RotationController } from './model/RotationController'

// VARIABLES
const appProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById('progress') as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const sceneProperties = new SceneProperties()
const textureDatabase = new TextureDatabase(sceneProperties.renderer as WebGLRenderer)
const rotationUIHandler = new RotationUIHandler(document, new RotationController(sceneProperties.orbitControls))
const uiHandler = new UIHandler(new DragAndDropUIHandler(document, loadingManager, appProperties), new GUIHandler(new GUI()), Stats(), rotationUIHandler)
const objectPicker = new ObjectPicker(sceneProperties, uiHandler)
uiHandler.createRotationDiv()
objectPicker.SetMouseListeners()
const stats = Utils.addStats()

document.body.appendChild(sceneProperties.renderer.domElement)
// Utils.addMouseHandler(envProperties, appProperties)
ModelLoadingUtils.loadGLTFModel('models/decorated_ring2/ring.glb', loadingManager, appProperties, sceneProperties, textureDatabase)

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
