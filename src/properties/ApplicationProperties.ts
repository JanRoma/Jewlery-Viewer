import * as THREE from 'three'

export class ApplicationProperties {
  isModelLoaded: boolean
  isModelAdded: boolean
  mainObject: THREE.Object3D
  mouseDown: boolean

  constructor () {
    this.isModelLoaded = false
    this.isModelAdded = false
    this.mainObject = new THREE.Mesh()

    this.mouseDown = false
  }
}
