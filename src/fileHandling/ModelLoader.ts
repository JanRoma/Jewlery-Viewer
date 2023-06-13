import { type LoadingManager } from 'three'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { type SceneProperties } from '../properties/SceneProperties'
import { type MetalController } from '../model/MetalController'
import { type GemController } from '../model/GemController'
import { type GUIHandler } from '../uiHandling/GUIHandler'

export class ModelLoader {
  applicationProperties: ApplicationProperties
  sceneProperties: SceneProperties
  metalController: MetalController
  gemController: GemController
  loadingManager: LoadingManager
  guiHandler: GUIHandler

  constructor (applicationProperties: ApplicationProperties, sceneProperties: SceneProperties, metalController: MetalController, gemController: GemController, loadingManager: LoadingManager, guiHandler: GUIHandler) {
    this.applicationProperties = applicationProperties
    this.sceneProperties = sceneProperties
    this.metalController = metalController
    this.gemController = gemController
    this.loadingManager = loadingManager
    this.guiHandler = guiHandler
  }

  loadOBJModel (path: string, name: string): void {
    this.applicationProperties.isModelLoaded = false
    this.applicationProperties.isModelAdded = false
    this.sceneProperties.scene.remove(this.applicationProperties.mainObject)
    const url = `/${name}`

    const objLoader = new OBJLoader(this.loadingManager)
    objLoader.setPath(path)
    objLoader.load(
      url + '.obj',
      (object) => {
        object.scale.set(0.1, 0.1, 0.1)

        this.sceneProperties.scene.add(object)
        this.sceneProperties.sceneMeshes.push(object)
        // to-do: to delete?
        // object.traverse((child) => {
        //   if ((child as THREE.Mesh).isMesh) {
        //     const m = (child as THREE.Mesh)
        //     m.receiveShadow = true
        //     m.castShadow = true
        //     this.sceneProperties.sceneMeshes.push(m)
        //   }
        // })
        this.applicationProperties.mainObject = object
        this.metalController.changeToGold(object)
        this.gemController.changeToEmerald(object)

        this.guiHandler.showGUI(object)
        // this.uiHandler.metalUIHandler.metalController.changeObject(object)
        // this.uiHandler.gemUIHandler.gemController.changeObject(object)
      },
      (xhr) => {
      // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      }
    )
  }
}
