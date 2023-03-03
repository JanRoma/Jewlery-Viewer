import { type OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class RotationController {
  orbitControls: OrbitControls
  isRotating: boolean

  constructor (orbitControls: OrbitControls) {
    this.orbitControls = orbitControls
    this.orbitControls.autoRotate = false
    this.isRotating = false
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
