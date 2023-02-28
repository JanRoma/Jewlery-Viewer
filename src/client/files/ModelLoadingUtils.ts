import * as THREE from "three"
import { LoadingManager } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { ApplicationProperties } from "../ApplicationProperties"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { SceneProperties } from "../SceneProperties"

export class ModelLoadingUtils {

static loadOBJModel(path: string, loadingManager: LoadingManager, applicationProperties: ApplicationProperties){
    applicationProperties.isModelLoaded = false
    applicationProperties.isModelAdded = false
    const objLoader = new OBJLoader()
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false })
    const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
    const metalnessTexture = new THREE.TextureLoader().load("models/DefaultMaterial_metallicRoughness.png")

    var mtlLoader = new MTLLoader();
    mtlLoader.load(path+'.mtl', function(materials){
        materials.preload();
        objLoader.setMaterials(materials);
        console.dir(objLoader.materials)
        //.map - abseColor
        //normalMap - null

        objLoader.load(
            path + '.obj',
            (object) => {

                object.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                        m.receiveShadow = true
                        m.castShadow = true;
                        (m.material as THREE.MeshStandardMaterial).envMap = envTexture;
                        (m.material as THREE.MeshStandardMaterial).metalnessMap = metalnessTexture;
                    }
                    if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                     l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                        l.shadow.mapSize.height = 2048
                    }
                })
                applicationProperties.mainObject = object
                applicationProperties.isModelLoaded = true    
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
        })
}


static loadGLTFModel(path: string, loadingManager: LoadingManager, applicationProperties: ApplicationProperties, envProperties: SceneProperties) {
        applicationProperties.isModelLoaded = false
        applicationProperties.isModelAdded = false
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
                        (m.material as THREE.MeshStandardMaterial).flatShading = true
                        envProperties.sceneMeshes.push(m)
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
                envProperties.sceneMeshes.push(gltf.scene)           
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
static loadGLTFModelFromFile(file: File, loadingManager: LoadingManager, applicationProperties: ApplicationProperties) {

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
                        // (child as THREE.Mesh).geometry.computeVertexNormals();
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
