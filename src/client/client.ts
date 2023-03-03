import * as Utils from './Utils'
import { ApplicationProperties } from './ApplicationProperties'
import { SceneProperties } from './SceneProperties'
import { ObjectPicker } from './ObjectPicker'
import { type WebGLRenderer } from 'three'
import { TextureDatabase } from './files/TextureDatabase'
import * as ModelLoadingUtils from './files/ModelLoadingUtils'

// VARIABLES
const appProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById('progress') as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const sceneProperties = new SceneProperties()
const textureDatabase = new TextureDatabase(sceneProperties.renderer as WebGLRenderer)
const objectPicker = new ObjectPicker(sceneProperties)
objectPicker.SetMouseListeners()
// const stats = Utils.addStats()

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
  // stats.update()

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
  sceneProperties.controls.update()
  render()
}

function render (): void {
  sceneProperties.renderer.render(sceneProperties.scene, sceneProperties.camera)
}

animate()
