import * as THREE from 'three'
import { type LoadingManager } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { type TextureDatabase } from './TextureDatabase'
import { type SceneProperties } from '../properties/SceneProperties'
import { type UIHandler } from '../uiHandling/UIHandler'
import { type MetalUIHandler } from '../uiHandling/MetalChangeUIHandler'

export function loadOBJModel (path: string, applicationProperties: ApplicationProperties, sceneProperties: SceneProperties, uiHandler: UIHandler, metalUIHandler: MetalUIHandler): void {
  applicationProperties.isModelLoaded = false
  applicationProperties.isModelAdded = false

  const mtlLoader = new MTLLoader()
  mtlLoader.setResourcePath(path)
  mtlLoader.setPath(path)
  const url = '/Jasiu3'

  const objLoader = new OBJLoader()
  objLoader.setPath(path)
  objLoader.load(
    url + '.obj',
    (object) => {
      object.scale.set(0.05, 0.05, 0.05)
      console.dir(object)
      sceneProperties.scene.add(object)
      sceneProperties.sceneMeshes.push(object)
      object.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          const m = (child as THREE.Mesh)
          m.receiveShadow = true
          m.castShadow = true
          sceneProperties.sceneMeshes.push(m)
        }
      })
      uiHandler.guiHandler.showGUI(object)
      metalUIHandler.metalController.changeObject(object)
    },
    (xhr) => {
      // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    }
  )
}

export function loadGLTFModel (
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
export function loadGLTFModelFromFile (file: File, loadingManager: LoadingManager, applicationProperties: ApplicationProperties): void {
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
