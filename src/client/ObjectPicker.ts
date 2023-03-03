import * as THREE from 'three'
import { type Mesh, type MeshPhongMaterial, type Raycaster } from 'three'
import { type SceneProperties } from './SceneProperties'
import { LastClickedObject } from './model/LastClickedObject'
import { GUI } from 'dat.gui'

export class ObjectPicker {
  gui: GUI
  raycaster: THREE.Raycaster
  lastClickedObject: LastClickedObject
  sceneProperties: SceneProperties
  mouseClicked: MouseClicked
  folderName = 'Object'

  constructor (sceneProperties: SceneProperties) {
    this.raycaster = new THREE.Raycaster()
    this.lastClickedObject = new LastClickedObject()
    this.sceneProperties = sceneProperties
    this.mouseClicked = new MouseClicked()
    this.gui = new GUI()
    this.gui.addFolder(this.folderName)
    // this.gui.add(textureDatabase, "textures" )
    // this.gui.hide()
  }

  SetMouseListeners (): void {
    this.sceneProperties.renderer.domElement.addEventListener('mousedown', (evt) => { onMouseDown(this.mouseClicked, evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mouseup', (evt) => { onMouseUp(this.mouseClicked, evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('click', (evt) => { onSingleClick(this.sceneProperties, this.raycaster, this.lastClickedObject, this.mouseClicked, this.gui, this.folderName, evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mousemove', (evt) => { onMouseMove(this.mouseClicked, evt) }, false)
  }
}

function onMouseDown (mouseClicked: MouseClicked, event: MouseEvent): void {
  event.preventDefault()
  mouseClicked.clicked = true
}

function onMouseUp (mouseClicked: MouseClicked, event: MouseEvent): void {
}

function onMouseMove (mouseClicked: MouseClicked, event: MouseEvent): void {
  event.preventDefault()
  mouseClicked.clicked = false
}

function onSingleClick (
  envProperties: SceneProperties,
  raycaster: Raycaster,
  lastClickedObject: LastClickedObject,
  mouseClicked: MouseClicked,
  gui: GUI, folderName: string,
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

  if (mouseClicked.clicked) {
    if (anyObjectWasClickedNow) {
      const object = intersects[0].object as Mesh
      const otherObjectClickedThanBefore = lastClickedObject.object.name !== object.name
      if (!anyObjectClickedBefore) {
        lastClickedObject.pickObject(object)
        showGUI(gui, folderName, lastClickedObject.object)
      } else if (otherObjectClickedThanBefore) {
        (lastClickedObject.object.material as MeshPhongMaterial).color = lastClickedObject.originalColor
        lastClickedObject.pickObject(object)
        showGUI(gui, folderName, lastClickedObject.object)
      }
    } else {
      if (anyObjectClickedBefore) {
        (lastClickedObject.object.material as MeshPhongMaterial)?.color.set(lastClickedObject.originalColor)
        lastClickedObject.resetPickedObject()
        gui.hide()
      }
    }
  }
}

function showGUI (gui: GUI, folderName: string, object: Mesh): void {
  gui.removeFolder(gui.__folders.Object)
  const objectFolder = gui.addFolder('Object')
  objectFolder.add(object.scale, 'x', 0, 1).onChange(() => {
    object.scale.y = object.scale.x
    object.scale.z = object.scale.x
  })
  objectFolder.open()

  gui.show()
}

class MouseClicked {
  clicked: boolean

  constructor () {
    this.clicked = false
  }
}
