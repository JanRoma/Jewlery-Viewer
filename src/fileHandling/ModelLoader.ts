import { LoadingManager } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { type SceneProperties } from '../properties/SceneProperties'
import { type MetalController } from '../model/MetalController'
import { type GemController } from '../model/GemController'

export class ModelLoader {
  sceneProperties: SceneProperties
  metalController: MetalController
  gemController: GemController
  loadingManager: LoadingManager

  constructor (sceneProperties: SceneProperties, metalController: MetalController, gemController: GemController) {
    this.sceneProperties = sceneProperties
    this.metalController = metalController
    this.gemController = gemController
    this.loadingManager = this.returnLoadingManager()
  }

  loadOBJModel (path: string, name: string): void {
    this.sceneProperties.outlinePass.selectedObjects = [];

    this.sceneProperties.scene.remove(this.sceneProperties.mainObject)
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

        this.sceneProperties.mainObject = object

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
      this.sceneProperties.scene.remove(this.sceneProperties.mainObject)
      this.sceneProperties.sceneMeshes.pop()


      const objLoader = new OBJLoader(this.loadingManager)
      objLoader.load(
        url,
        (object) => {
          object.scale.set(0.1, 0.1, 0.1)
  
          this.sceneProperties.scene.add(object)
          this.sceneProperties.sceneMeshes.push(object)
          this.sceneProperties.mainObject = object
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

    returnLoadingManager (): LoadingManager {
      const manager = new LoadingManager()
    
      manager.onStart = function (url, itemsLoaded, itemsTotal) {
        const loadProgressDiv = document.getElementById('progress')
        if(loadProgressDiv!=null){
          loadProgressDiv.style.visibility = 'visible'
        }
      }
    
      manager.onLoad = function () {
        const loadProgressDiv = document.getElementById('progress')
        loadProgressDiv.style.visibility = 'hidden'
      }
    
      manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      }
    
      manager.onError = function (url) {
        console.log('There was an error loading ' + url)
      }
    
      return manager
    }
}
