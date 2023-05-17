import * as THREE from 'three'
import { type LoadingManager } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { type TextureDatabase } from './TextureDatabase'
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
    const mtlLoader = new MTLLoader()
    mtlLoader.setResourcePath(path)
    mtlLoader.setPath(path)
    const url = `/${name}`

    const objLoader = new OBJLoader(this.loadingManager)
    objLoader.setPath(path)
    objLoader.load(
      url + '.obj',
      (object) => {
        console.log(url + '.obj')
        object.scale.set(0.1, 0.1, 0.1)
        console.dir(object)
        this.sceneProperties.scene.add(object)
        this.sceneProperties.sceneMeshes.push(object)
        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = (child as THREE.Mesh)
            m.receiveShadow = true
            m.castShadow = true
            this.sceneProperties.sceneMeshes.push(m)
          }
        })
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

  loadGLTFModel (
    path: string,
    loadingManager: LoadingManager,
    applicationProperties: ApplicationProperties,
    sceneProperties: SceneProperties,
    textureDatabase: TextureDatabase): void {
    applicationProperties.isModelLoaded = false
    applicationProperties.isModelAdded = false
    const loader = new GLTFLoader(loadingManager)

    loader.load(
      path,
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            const m = (child as THREE.Mesh)
            m.receiveShadow = true
            m.castShadow = true;
            (m.material as THREE.MeshStandardMaterial).flatShading = true;
            (m.material as THREE.MeshStandardMaterial).envMap = textureDatabase.textures.get('cube') as THREE.Texture
            sceneProperties.sceneMeshes.push(m)
          }
          if (((child as THREE.Light)).isLight) {
            const l = (child as THREE.Light)
            l.castShadow = true
            l.shadow.bias = -0.003
            l.shadow.mapSize.width = 2048
            l.shadow.mapSize.height = 2048
          }
        })
        applicationProperties.mainObject = gltf.scene
        applicationProperties.isModelLoaded = true
        sceneProperties.sceneMeshes.push(gltf.scene)
      },
      (xhr) => {
        console.log((String((xhr.loaded / xhr.total) * 100)) + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // Prototype function that loads model from dragged and droppedfile.
  // There is problem if the file has any other subfiles to load.
  // The path to file is relative and the application can not find other files.
  loadGLTFModelFromFile (file: File, loadingManager: LoadingManager, applicationProperties: ApplicationProperties): void {
    const loader = new GLTFLoader(loadingManager)
    console.log(file.name)
    const url = URL.createObjectURL(file)

    const envTexture = new THREE.CubeTextureLoader().load(['img/px_50.png', 'img/nx_50.png', 'img/py_50.png', 'img/ny_50.png', 'img/pz_50.png', 'img/nz_50.png'])
    loader.load(
      url,
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            const m = (child as THREE.Mesh)
            m.receiveShadow = true
            m.castShadow = true;
            // Setting environmental map so the object is not dark
            (m.material as THREE.MeshStandardMaterial).envMap = envTexture
          // (child as THREE.Mesh).geometry.computeVertexNormals();
          }
          if (((child as THREE.Light)).isLight) {
            const l = (child as THREE.Light)
            l.castShadow = true
            l.shadow.bias = -0.003
            l.shadow.mapSize.width = 2048
            l.shadow.mapSize.height = 2048
          }
        })
        applicationProperties.mainObject = gltf.scene
        applicationProperties.isModelLoaded = true
      },
      (xhr) => {
        console.log((String((xhr.loaded / xhr.total) * 100)) + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
