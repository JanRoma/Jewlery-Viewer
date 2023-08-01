import * as THREE from 'three'
import { Mesh, Raycaster, Vector3 } from 'three'
import { type SceneProperties } from '../properties/SceneProperties'
import { LastClickedObject } from './LastClickedObject'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ObjectPicker {
  raycaster: THREE.Raycaster
  lastClickedObject: LastClickedObject
  sceneProperties: SceneProperties
  mouseClicked: boolean
  enabled: boolean
  autoFocus: boolean

  constructor (sceneProperties: SceneProperties) {
    this.raycaster = new Raycaster()
    this.lastClickedObject = new LastClickedObject()
    this.sceneProperties = sceneProperties
    this.mouseClicked = false
    this.enabled= true
    this.autoFocus = false
    this.SetMouseListeners()
  }

  deselectAllObjects(){
    this.sceneProperties.lastClickedObject.setObjectNotPicked(this.sceneProperties)
  }

  SetMouseListeners (): void {
    this.sceneProperties.renderer.domElement.addEventListener('mousedown', (evt) => { this.onMouseDown(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('mouseup', (evt) => { this.onMouseUp(evt) }, false)
    this.sceneProperties.renderer.domElement.addEventListener('click', (evt) => { this.onSingleClick(this.sceneProperties, this.lastClickedObject, evt) }, false)
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
    lastClickedObject: LastClickedObject,
    event: MouseEvent): void {
    event.preventDefault()
    if(this.enabled){
      const mouse = new THREE.Vector2((event.clientX / sceneProperties.renderer.domElement.clientWidth) * 2 - 1, -(event.clientY / sceneProperties.renderer.domElement.clientHeight) * 2 + 1)

      this.raycaster.setFromCamera(mouse, sceneProperties.camera)
      
      const intersects = this.raycaster.intersectObjects(sceneProperties.sceneMeshes, true) // second parameter must be true for raycaster to work
      const anyObjectWasClickedNow = intersects.length > 0
      const anyObjectClickedBefore = lastClickedObject?.objectLoaded
  
      if (this.mouseClicked) {
        if (anyObjectWasClickedNow) {
          const object = intersects[0].object as Mesh
          sceneProperties.lastClickedObject.setObjectNotPicked(sceneProperties)
          lastClickedObject.pickNewObject(object, sceneProperties)
          if(this.autoFocus)
          {
            this.rotateCameraToObject(object,sceneProperties.camera, sceneProperties.orbitControls)
            // this.fitCameraToObject(sceneProperties.camera,object, 1.25,sceneProperties.orbitControls)
          }
          
        } else {
          if (anyObjectClickedBefore) {
            lastClickedObject.setObjectNotPicked(sceneProperties)
          }
          if(anyObjectClickedBefore && this.autoFocus){
            this.resetCameraPosition(sceneProperties)   
          }
        }
      }
    }
    
  }

  resetCameraPosition(sceneProperties: SceneProperties){
    sceneProperties.camera.position.set(sceneProperties.cameraZeroPosition.x,sceneProperties.cameraZeroPosition.y,sceneProperties.cameraZeroPosition.z)
  }


 rotateCameraToObject(object :THREE.Mesh, camera: THREE.PerspectiveCamera, controls :OrbitControls){
  let worldZeroPoint = new Vector3(0,0,0)
  let objectCenter = this.getCenterPoint(object)

  let differenceX = objectCenter.x - worldZeroPoint.x
  let differenceY = objectCenter.y - worldZeroPoint.y

  camera.position.set(differenceX * 3, differenceY + 1.5, camera.position.z)
  camera.fov = 1
  camera.zoom = 0.3  
 }

 getCenterPoint(mesh : Mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
  }
}
