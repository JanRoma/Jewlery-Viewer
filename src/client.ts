import { SceneProperties } from './properties/SceneProperties'
import * as ModelLoadingUtils from './fileHandling/ModelLoader'
import { RotationController } from './model/RotationController'
import { MetalController } from './model/MetalController'
import { GemController } from './model/GemController'
import { ModelController } from './model/ModelController'
import { MaterialController } from './data/MaterialController'
import { ColorSet } from './data/ColorSet'
import { MenuBarController } from './model/MenuBarController'
import { TextureDatabase } from './fileHandling/TextureDatabase'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import type { AppState } from './types'
import { ScreenshotController } from './fileHandling/ScreenshotController'
import { ModelLoader } from './fileHandling/ModelLoader'

export function runEnvironment(appState: AppState){
  document.body.appendChild(appState.sceneProperties.renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)

  function onWindowResize () {
    appState.sceneProperties.camera.aspect = window.innerWidth / window.innerHeight
    appState.sceneProperties.camera.updateProjectionMatrix()
    appState.sceneProperties.renderer.setSize(window.innerWidth, window.innerHeight)
    appState.sceneProperties.composer.setSize(window.innerWidth, window.innerHeight);
    render()
  }

  function animate () {
    requestAnimationFrame(animate)
    appState.sceneProperties.orbitControls.update()
    render()
  }

  function render () {
    appState.sceneProperties.renderer.render(appState.sceneProperties.scene, appState.sceneProperties.camera)
    appState.sceneProperties.composer.render()
  }

  animate()
}

export function initializeAppState(): AppState { 

  const sceneProperties = new SceneProperties()

  const colorSet = new ColorSet()
  const textureDatabase = new TextureDatabase(sceneProperties.renderer)
  const materialController = new MaterialController(colorSet, textureDatabase)
  const metalController = new MetalController(materialController)
  const gemController = new GemController(materialController)
  const modelLoader = new ModelLoader(sceneProperties, metalController, gemController)
  const rotationController = new RotationController(sceneProperties.orbitControls)
  const modelController = new ModelController(sceneProperties.mainObject, modelLoader)


  modelLoader.loadOBJModel('models/', 'model3.obj')

  const screenshotController = new ScreenshotController(sceneProperties)

  const appState: AppState = {
    sceneProperties: sceneProperties,
    colorSet: colorSet,
    materialController: materialController,
    textureDatabase: textureDatabase,

    metalController: metalController,
    gemController: gemController,
    modelLoader: modelLoader,
    modelController: modelController,
    
    rotationController: rotationController,
    screenshotController: screenshotController,
  }

  return appState
}

