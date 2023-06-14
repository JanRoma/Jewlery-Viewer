import { type OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class RotationController {
  orbitControls: OrbitControls
  isRotating: boolean

  constructor (orbitControls: OrbitControls) {
    this.orbitControls = orbitControls
    this.orbitControls.autoRotate = false
    this.isRotating = false
  }

  changeRotation(): void{
    if(this.isRotating){
      this.orbitControls.autoRotate = false
      this.isRotating = false
    }
    else{
      this.orbitControls.autoRotate = true
      this.orbitControls.autoRotateSpeed = 3
      this.isRotating = true
    }
  }
  rotate (value: boolean): void {
    if (value) {
      this.orbitControls.autoRotate = true
      this.orbitControls.autoRotateSpeed = 3
      this.isRotating = true
    } else {
      this.orbitControls.autoRotate = false
      this.isRotating = false
    }
  }
}
