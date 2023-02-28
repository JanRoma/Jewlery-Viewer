import Stats from 'three/examples/jsm/libs/stats.module'
import { Utils } from './Utils'
import { ApplicationProperties } from './ApplicationProperties'
import { ModelLoadingUtils } from './files/ModelLoadingUtils'
import { SceneProperties } from './SceneProperties'
import { DragAndDropFileHandler as DragAndDropFileHandler } from './files/DragAndDropFileHandler'
import * as THREE from 'three'
import { Color, Mesh, MeshPhongMaterial, Object3D } from 'three'
import { LastClickedObject } from './model/LastClickedObject'
import { ObjectPicker } from './ObjectPicker'

// VARIABLES
const appProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById("progress") as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const envProperties = new SceneProperties()
const dragAndDropFileHandler = new DragAndDropFileHandler(document, loadingManager, appProperties)
const objectPicker = new ObjectPicker(envProperties)

// const stats = Utils.addStats()

document.body.appendChild(envProperties.renderer.domElement)
// Utils.addMouseHandler(envProperties, appProperties)
ModelLoadingUtils.loadGLTFModel('models/decorated_ring2/ring.glb', loadingManager, appProperties, envProperties)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    envProperties.camera.aspect = window.innerWidth / window.innerHeight
    envProperties.camera.updateProjectionMatrix()
    envProperties.renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    //stats.update()
    
    // dragAndDropHandler.SetDragAndDrop()

    if(!appProperties.isModelAdded){
        if(appProperties.isModelLoaded){
            appProperties.mainObject.scale.set(0.2,0.2,0.2)
            envProperties.scene.add(appProperties.mainObject)
            Utils.addGUI(appProperties.mainObject, envProperties.controls)
            appProperties.isModelAdded = true
            console.dir(appProperties.mainObject)
        }
    }
    envProperties.controls.update()
    render()
}

function render() {
    envProperties.renderer.render(envProperties.scene, envProperties.camera)
}

animate()








