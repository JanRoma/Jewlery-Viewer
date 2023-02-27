import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Utils } from './Utils'
import { ApplicationProperties } from './ApplicationProperties'
import { ObjectLoadingUtils } from './ObjectLoadingUtils'
import { EnvironmentProperties } from './EnvironmentProperties'
import {Loader} from 'three/src/loaders/Loader'
import { DragAndDropHandler } from './DragAndDropHandler'

// VARIABLES
const appProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById("progress") as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const envProperties = new EnvironmentProperties()
const dragAndDropHandler = new DragAndDropHandler(document, loadingManager, appProperties)
let dropZoneAdded = false

// const stats = Utils.addStats()

document.body.appendChild(envProperties.renderer.domElement)
Utils.addMouseHandler(envProperties, appProperties)
ObjectLoadingUtils.loadModel('models/decorated_ring/scene.gltf', loadingManager, appProperties)
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
        }
    }
    envProperties.controls.update()
    render()
}

function render() {
    envProperties.renderer.render(envProperties.scene, envProperties.camera)
}

animate()




