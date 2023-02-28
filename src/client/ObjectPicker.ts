import * as THREE from "three"
import { Color, Mesh, MeshPhongMaterial, Raycaster } from "three"
import { SceneProperties } from "./SceneProperties"
import { LastClickedObject } from "./model/LastClickedObject"

export class ObjectPicker{

    raycaster: THREE.Raycaster
    lastClickedObject : LastClickedObject
    envProperties : SceneProperties
    mouseClicked : MouseClicked
    
    constructor(envProperties : SceneProperties){
        this.raycaster = new THREE.Raycaster()
        this.lastClickedObject = new LastClickedObject()
        this.envProperties = envProperties
        this.mouseClicked = new MouseClicked()
        this.envProperties.renderer.domElement.addEventListener('mousedown', (evt) => onMouseDown(this.mouseClicked, evt), false)
        this.envProperties.renderer.domElement.addEventListener('mouseup', (evt) => onMouseUp(this.mouseClicked, evt), false)
        this.envProperties.renderer.domElement.addEventListener('click', (evt) => onSingleClick(this.envProperties, this.raycaster, this.lastClickedObject, this.mouseClicked, evt), false)
        this.envProperties.renderer.domElement.addEventListener('mousemove', (evt) => onMouseMove(this.mouseClicked, evt), false)
    }
}

function onMouseDown(mouseClicked: MouseClicked, event : MouseEvent){
    event.preventDefault()
    mouseClicked.clicked = true
}

function onMouseUp(mouseClicked: MouseClicked, event : MouseEvent){
}

function onMouseMove(mouseClicked : MouseClicked, event: MouseEvent) {
    event.preventDefault()
    mouseClicked.clicked = false
}

function onSingleClick(envProperties: SceneProperties, raycaster: Raycaster, lastClickedObject : LastClickedObject, mouseClicked : MouseClicked, event: MouseEvent) {
    event.preventDefault()
    const mouse = {
        x: (event.clientX / envProperties.renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / envProperties.renderer.domElement.clientHeight) * 2 + 1
    }

    raycaster.setFromCamera(mouse, envProperties.camera)

    const intersects = raycaster.intersectObjects(envProperties.sceneMeshes, false)
    var anyObjectWasClickedNow = intersects.length > 0
    var anyObjectClickedBefore = lastClickedObject?.objectLoaded!==false

    if(mouseClicked.clicked){
        if (anyObjectWasClickedNow) {
            var object = intersects[0].object as Mesh;
            var otherObjectClickedThanBefore = lastClickedObject.object.name !== object.name
            if(!anyObjectClickedBefore){
                lastClickedObject.pickObject(object)
            }
            else if(otherObjectClickedThanBefore){
                (lastClickedObject.object.material as MeshPhongMaterial).color = lastClickedObject.originalColor
                lastClickedObject.pickObject(object)
            }
        }
        else {
            if(anyObjectClickedBefore)
            {
                (lastClickedObject.object.material as MeshPhongMaterial)?.color.set(lastClickedObject.originalColor)
                lastClickedObject.resetPickedObject()
            }
        }
    }
}

class MouseClicked {
    clicked : Boolean

    constructor()
    {
        this.clicked = false
    }
}
