import * as THREE from 'three'
import { type Mesh, type Raycaster } from 'three'
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
  }

  SetMouseListeners (): void {
    this.sceneProperties.renderer.domElement.addEventListener('mousedown', (evt) => { this.onMouseDown(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mouseup', (evt) => { this.onMouseUp(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('click', (evt) => { this.onSingleClick(this.sceneProperties, this.raycaster, this.lastClickedObject, this.uiHandler.guiHandler, evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mousemove', (evt) => { this.onMouseMove(evt) }, false)
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
    envProperties: SceneProperties,
    raycaster: Raycaster,
    lastClickedObject: LastClickedObject,
    guiHandler: GUIHandler,
    event: MouseEvent): void {
    event.preventDefault()

    const mouse = {
      x: (event.clientX / envProperties.renderer.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / envProperties.renderer.domElement.clientHeight) * 2 + 1
    }

    raycaster.setFromCamera(mouse, envProperties.camera)

    const intersects = raycaster.intersectObjects(envProperties.sceneMeshes, false)
    const anyObjectWasClickedNow = intersects.length > 0
    const anyObjectClickedBefore = lastClickedObject?.objectLoaded

    if (this.mouseClicked) {
      if (anyObjectWasClickedNow) {
        const object = intersects[0].object as Mesh

        lastClickedObject.setObjectNotPicked()
        lastClickedObject.pickNewObject(object)
        guiHandler.showGUI(lastClickedObject.object)
      } else {
        if (anyObjectClickedBefore) {
          lastClickedObject.setObjectNotPicked()
          guiHandler.hideGUI()
        }
      }
    }
  }
}
