import { type Mesh, type Object3D, type MeshStandardMaterial } from 'three'

export class MetalController {
  object: Object3D

  constructor (object: Object3D) {
    this.object = object
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeMetal (object: Object3D, material: MeshStandardMaterial): void {
    this.object = object
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Metal')) {
        (element as Mesh).material = material
      }
    })
  }
}
