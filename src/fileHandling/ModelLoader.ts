import { LoadingManager } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { type SceneProperties } from '../properties/SceneProperties'
import { type MetalController } from '../model/MetalController'
import { type GemController } from '../model/GemController'
import { getContext } from 'svelte'
import ProgressCircle from '../controls/ProgressCircle.svelte'

export class ModelLoader {
  sceneProperties: SceneProperties
  metalController: MetalController
  gemController: GemController
  loadingManager: LoadingManager
  isModelLoaded: boolean

  constructor (sceneProperties: SceneProperties, metalController: MetalController, gemController: GemController) {
    this.sceneProperties = sceneProperties
    this.metalController = metalController
    this.gemController = gemController
    this.loadingManager = this.returnLoadingManager()
    this.isModelLoaded = false
  }

  loadOBJModel (path: string, name: string): void {
    this.sceneProperties.outlinePass.selectedObjects = [];

    if(this.isModelLoaded){
      this.sceneProperties.scene.remove(this.sceneProperties.mainObject)
      this.sceneProperties.sceneMeshes.pop()
    }
    this.isModelLoaded = false
    const url = `/${name}`

    const objLoader = new OBJLoader(this.loadingManager)
    objLoader.setPath(path)
    objLoader.load(
      url,
      (object) => {
        object.scale.set(0.1, 0.1, 0.1)
        object.translateY(0.3)
        object.rotateX(-Math.PI/32)
        
        this.sceneProperties.scene.add(object)
        this.sceneProperties.sceneMeshes.push(object)

        this.sceneProperties.mainObject = object

        this.metalController.changeToGold(object)
        this.gemController.changeToEmerald(object)
        this.isModelLoaded = true
      },
      (xhr) => {
      // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      }
    )
  }

  loadOBJModelFromFileBrowser (url: string): void {
      this.sceneProperties.outlinePass.selectedObjects = [];
      
      if(this.isModelLoaded){
        this.sceneProperties.scene.remove(this.sceneProperties.mainObject)
        this.sceneProperties.sceneMeshes.pop()
      }
      this.isModelLoaded = false

      const objLoader = new OBJLoader(this.loadingManager)
      objLoader.load(
        url,
        (object) => {
          object.scale.set(0.1, 0.1, 0.1)
          object.translateY(0.3)
          object.rotateX(-Math.PI/32)

  
          this.sceneProperties.scene.add(object)
          object.layers.set( 1 );

          this.sceneProperties.sceneMeshes.push(object)
          this.sceneProperties.mainObject = object
          this.metalController.changeToGold(object)
          this.gemController.changeToEmerald(object)
          this.isModelLoaded = true

          // this.guiHandler.showGUI(object)
          // this.uiHandler.metalUIHandler.metalController.changeObject(object)
          // this.uiHandler.gemUIHandler.gemController.changeObject(object)
        },
        (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }
      )
    }

    returnLoadingManager (): LoadingManager {
      const manager = new LoadingManager()
      let progressCircle : ProgressCircle = getContext('progressCircle')
    
      manager.onStart = function (url, itemsLoaded, itemsTotal) {
        const loadProgressDiv = document.getElementById('progress')
        if(loadProgressDiv!=null){
          loadProgressDiv.style.visibility = 'visible'
          progressCircle.show()
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
