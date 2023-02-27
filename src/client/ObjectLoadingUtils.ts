import * as THREE from "three"
import { LoadingManager } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { ApplicationProperties } from "./ApplicationProperties"

export class ObjectLoadingUtils {

static loadModel(path: string, loadingManager: LoadingManager, applicationProperties: ApplicationProperties) {

        const loader = new GLTFLoader(loadingManager)

        const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
        loader.load(
            path,
                (gltf) => {
                gltf.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                        m.receiveShadow = true
                        m.castShadow = true;
                        // Setting environmental map so the object is not dark
                        (m.material as THREE.MeshStandardMaterial).envMap = envTexture;
                    }
                    if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                        l.shadow.mapSize.height = 2048
                    }
                })
                applicationProperties.mainObject = gltf.scene
                applicationProperties.isModelLoaded = true
                gltf.scene.getObjectByName
                
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }

// Prototype function that loads model from dragged and droppedfile.
// There is problem if the file has any other subfiles to load. 
// The path to file is relative and the application can not find other files. 
static loadModelFromFile(file: File, loadingManager: LoadingManager, applicationProperties: ApplicationProperties) {

        const loader = new GLTFLoader(loadingManager)
        console.log(file.name)
        const url = URL.createObjectURL(file);

        const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
        loader.load(
            url,
                (gltf) => {
                gltf.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                        m.receiveShadow = true
                        m.castShadow = true;
                        // Setting environmental map so the object is not dark
                        (m.material as THREE.MeshStandardMaterial).envMap = envTexture;
                    }
                    if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                        l.shadow.mapSize.height = 2048
                    }
                })
                applicationProperties.mainObject = gltf.scene
                applicationProperties.isModelLoaded = true
                gltf.scene.getObjectByName
                
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
}
