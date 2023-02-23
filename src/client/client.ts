import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Utils } from './Utils'
import { ApplicationProperties } from './ApplicationProperties'
import { ObjectLoadingUtils } from './ObjectLoadingUtils'
import { EnvironmentProperties } from './EnvironmentProperties'

// VARIABLES
const applicationProperties = new ApplicationProperties()
const loadProgressDiv = document.getElementById("progress") as HTMLDivElement
const loadingManager = Utils.returnLoadingManager(loadProgressDiv)
const envProperties = new EnvironmentProperties()

const stats = Utils.addStats()

document.body.appendChild(envProperties.renderer.domElement)
Utils.addMouseHandler(envProperties, applicationProperties)
ObjectLoadingUtils.loadModel('models/decorated_ring/scene.gltf', loadingManager, applicationProperties)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    envProperties.camera.aspect = window.innerWidth / window.innerHeight
    envProperties.camera.updateProjectionMatrix()
    envProperties.renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    stats.update()
    
    if(!applicationProperties.isModelAdded){
        if(applicationProperties.isModelLoaded){
            applicationProperties.mainObject.scale.set(0.2,0.2,0.2)
            envProperties.scene.add(applicationProperties.mainObject)
            Utils.addGUI(applicationProperties.mainObject, envProperties.controls)
            applicationProperties.isModelAdded = true
        }
    }
    envProperties.controls.update()
    render()
}

function render() {
    envProperties.renderer.render(envProperties.scene, envProperties.camera)
}

animate()




