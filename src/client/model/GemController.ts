import { type Mesh, type Object3D, type MeshStandardMaterial } from 'three'

export class GemController {
  object: Object3D

  constructor (object: Object3D) {
    this.object = object
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeGem (material: MeshStandardMaterial): void {
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Gem')) {
        (element as Mesh).material = material
      }
    })
  }
}
