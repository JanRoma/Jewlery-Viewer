import { type Mesh, type Object3D, type MeshStandardMaterial } from 'three'

export class MetalController {
  object: Object3D

  constructor (object: Object3D) {
    this.object = object
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeMetal (material: MeshStandardMaterial): void {
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Metal')) {
        (element as Mesh).material = material
      }
    })
  }
}
