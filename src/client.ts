import * as Utils from './Utils'
import { ApplicationProperties } from './properties/ApplicationProperties'
import { SceneProperties } from './properties/SceneProperties'
import * as ModelLoadingUtils from './fileHandling/ModelLoader'
import { GUIHandler } from './uiHandling/GUIHandler'
import { GUI } from 'dat.gui'
import { UIHandler } from './uiHandling/UIHandler'
import { DragAndDropUIHandler } from './uiHandling/DragAndDropUIHandler'
import { RotationController } from './model/RotationController'
import { MetalUIHandler } from './uiHandling/MetalChangeUIHandler'
import { MetalController } from './model/MetalController'
import { GemUIHandler } from './uiHandling/GemChangeUIHandler'
import { GemController } from './model/GemController'
import { CssController } from './uiHandling/CssController'
import { ModelUIHandler } from './uiHandling/ModelChangeUIHandler'
import { ModelController } from './model/ModelController'
import { MaterialController } from './data/MaterialController'
import { ColorSet } from './data/ColorSet'
import { MenuBarController } from './model/MenuBarController'
import { MenuBarUIHandler } from './uiHandling/MenuBarUIHandler'
import { HideMenuUIHandler } from './uiHandling/HideMenuUIHandler'
import { TextureDatabase } from './fileHandling/TextureDatabase'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import type { AppState } from './types'
import { ScreenshotController } from './fileHandling/ScreenshotController'
import { ObjectPicker } from './model/ObjectPicker'
// import { type WebGLRenderer } from 'three'

export function runEnvironment(appState: AppState){
appState.uiHandler.setDivsToDocument()


document.body.appendChild(appState.sceneProperties.renderer.domElement)

// modelLoader.loadOBJModel('models/', 'model3')

window.addEventListener('resize', onWindowResize, false)

function onWindowResize () {
  appState.sceneProperties.camera.aspect = window.innerWidth / window.innerHeight
  appState.sceneProperties.camera.updateProjectionMatrix()
  appState.sceneProperties.renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate () {
  requestAnimationFrame(animate)
  // appProperties.mainObject.rotateX(0.05)
  // dragAndDropHandler.SetDragAndDrop()

  appState.sceneProperties.orbitControls.update()
  render()
}

function render () {
  appState.sceneProperties.renderer.render(appState.sceneProperties.scene, appState.sceneProperties.camera)
}

animate()

}

export function initializeAppState(): AppState { 
const appProperties = new ApplicationProperties()

const loadingManager = Utils.returnLoadingManager()
const sceneProperties = new SceneProperties()

const colorSet = new ColorSet()
const cssController = new CssController(colorSet)
const textureDatabase = new TextureDatabase(sceneProperties.renderer)
const materialController = new MaterialController(colorSet, textureDatabase)
const metalController = new MetalController(materialController)
const gemController = new GemController(materialController)
const guiHandler = new GUIHandler(new GUI(), textureDatabase, materialController, sceneProperties)
const modelLoader = new ModelLoadingUtils.ModelLoader(appProperties, sceneProperties, metalController, gemController, loadingManager, guiHandler)
const rotationController = new RotationController(sceneProperties.orbitControls)
const modelController = new ModelController(appProperties.mainObject, modelLoader)

const metalUIHandler = new MetalUIHandler(document, metalController, cssController, appProperties, materialController)
const gemUIHandler = new GemUIHandler(document, appProperties, gemController, materialController, cssController)
const modelUIHandler = new ModelUIHandler(document, modelController, cssController)

const dndHandler = new DragAndDropUIHandler(document, loadingManager, appProperties, modelLoader)

const menuBarController = new MenuBarController(modelUIHandler.modelDiv, metalUIHandler.metalDiv, gemUIHandler.gemDiv)
const menuBarUIHandler = new MenuBarUIHandler(document, menuBarController, cssController)
const hideMenuUIHandler = new HideMenuUIHandler(document, menuBarUIHandler)
const screenshotController = new ScreenshotController(sceneProperties)
const uiHandler = new UIHandler(dndHandler, guiHandler, new Stats(), metalUIHandler, gemUIHandler, modelUIHandler, menuBarUIHandler, hideMenuUIHandler, document)
const objectPicker = new ObjectPicker(sceneProperties, uiHandler)

const appState: AppState = {
  appProperties: appProperties,
  loadingManager:  loadingManager,
  sceneProperties: sceneProperties,
  colorSet: colorSet,
  cssController: cssController,
  materialController: materialController,
  textureDatabase: textureDatabase,

  guiHandler: guiHandler,
  metalController: metalController,
  gemController: gemController,
  modelLoader: modelLoader,
  modelController: modelController,

  rotationController: rotationController,
  metalUIHandler: metalUIHandler,
  gemUIHandler: gemUIHandler,
  modelUIHandler: modelUIHandler,

  dndHandler: dndHandler,

  menuBarController: menuBarController,
  menuBarUIHandler: menuBarUIHandler,
  hideMenuUIHandler: hideMenuUIHandler,
  uiHandler: uiHandler,
  screenshotController: screenshotController,


}
return appState
}

