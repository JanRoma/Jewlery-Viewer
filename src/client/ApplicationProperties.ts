import * as THREE from 'three'

export class ApplicationProperties {
  isModelLoaded: boolean
  isModelAdded: boolean
  mainObject: THREE.Group
  mouseDown: boolean

  constructor () {
    this.isModelLoaded = false
    this.isModelAdded = false
    this.mainObject = new THREE.Group()

    this.mouseDown = false
  }
}
