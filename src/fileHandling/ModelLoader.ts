import { Group, type LoadingManager } from 'three'
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
    this.sceneProperties.outlinePass.selectedObjects = [];

    this.sceneProperties.scene.remove(this.applicationProperties.mainObject)
    this.sceneProperties.sceneMeshes.pop()
    const url = `/${name}`

    const objLoader = new OBJLoader(this.loadingManager)
    objLoader.setPath(path)
    objLoader.load(
      url,
      (object) => {
        object.scale.set(0.1, 0.1, 0.1)

        this.sceneProperties.scene.add(object)
        this.sceneProperties.sceneMeshes.push(object)

        this.applicationProperties.mainObject = object

        this.metalController.changeToGold(object)
        this.gemController.changeToEmerald(object)
      },
      (xhr) => {
      // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      }
    )
  }

  loadOBJModelFromFileBrowser (url: string): void {
      this.sceneProperties.outlinePass.selectedObjects = [];
      this.sceneProperties.scene.remove(this.applicationProperties.mainObject)
      this.sceneProperties.sceneMeshes.pop()


      const objLoader = new OBJLoader(this.loadingManager)
      objLoader.load(
        url,
        (object) => {
          object.scale.set(0.1, 0.1, 0.1)
  
          this.sceneProperties.scene.add(object)
          this.sceneProperties.sceneMeshes.push(object)
          this.applicationProperties.mainObject = object
          // this.metalController.changeToGold(object)
          // this.gemController.changeToEmerald(object)
  
          // this.guiHandler.showGUI(object)
          // this.uiHandler.metalUIHandler.metalController.changeObject(object)
          // this.uiHandler.gemUIHandler.gemController.changeObject(object)
        },
        (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }
      )
    }
}
