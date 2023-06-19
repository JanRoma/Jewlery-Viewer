import * as THREE from 'three'
import { Mesh, Raycaster } from 'three'
import { type SceneProperties } from '../properties/SceneProperties'
import { LastClickedObject } from './LastClickedObject'
import { type GUIHandler } from '../uiHandling/GUIHandler'
import { type UIHandler } from '../uiHandling/UIHandler'

export class ObjectPicker {
  raycaster: THREE.Raycaster
  lastClickedObject: LastClickedObject
  sceneProperties: SceneProperties
  mouseClicked: boolean
  uiHandler: UIHandler

  constructor (sceneProperties: SceneProperties, uiHandler: UIHandler) {
    this.raycaster = new THREE.Raycaster()
    this.lastClickedObject = new LastClickedObject()
    this.sceneProperties = sceneProperties
    this.mouseClicked = false
    this.uiHandler = uiHandler
    this.SetMouseListeners()
  }

  SetMouseListeners (): void {
    this.sceneProperties.renderer.domElement.addEventListener('mousedown', (evt) => { this.onMouseDown(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mouseup', (evt) => { this.onMouseUp(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('click', (evt) => { this.onSingleClick(this.sceneProperties, this.raycaster, this.lastClickedObject, this.uiHandler.guiHandler, evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mousemove', (evt) => {this.onMouseMove(evt)  }, false)
  }

  onMouseDown (event: MouseEvent): void {
    event.preventDefault()
    this.mouseClicked = true
  }

  onMouseUp (event: MouseEvent): void {
  }

  onMouseMove (event: MouseEvent): void {
    event.preventDefault()
    this.mouseClicked = false
  }

  onSingleClick (
    sceneProperties: SceneProperties,
    raycaster: Raycaster,
    lastClickedObject: LastClickedObject,
    guiHandler: GUIHandler,
    event: MouseEvent): void {
    event.preventDefault()

    const mouse = new THREE.Vector2((event.clientX / sceneProperties.renderer.domElement.clientWidth) * 2 - 1, -(event.clientY / sceneProperties.renderer.domElement.clientHeight) * 2 + 1)

    raycaster.setFromCamera(mouse, sceneProperties.camera)
    
    const intersects = raycaster.intersectObjects(sceneProperties.sceneMeshes, true) // second parameter must be true for raycaster to work
    const anyObjectWasClickedNow = intersects.length > 0
    const anyObjectClickedBefore = lastClickedObject?.objectLoaded

    if (this.mouseClicked) {
      if (anyObjectWasClickedNow) {
        const object = intersects[0].object as Mesh
        lastClickedObject.setObjectNotPicked(sceneProperties)
        lastClickedObject.pickNewObject(object, sceneProperties)
      } else {
        if (anyObjectClickedBefore) {
          lastClickedObject.setObjectNotPicked(sceneProperties)
          guiHandler.hideGUI()
        }
      }
    }
  }
}
