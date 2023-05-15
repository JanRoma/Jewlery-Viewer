import { type Mesh, type Object3D, type MeshPhysicalMaterial } from 'three'
import { type MaterialSet } from '../data/MaterialSet'

export class GemController {
  object: Object3D
  materialController: MaterialSet

  constructor (materialController: MaterialSet, object: Object3D) {
    this.object = object
    this.materialController = materialController
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeToEmerald (object: Object3D): void {
    this.changeGem(object, this.materialController.emeraldMaterial)
  }

  changeToSapphire (object: Object3D): void {
    this.changeGem(object, this.materialController.sapphireMaterial)
  }

  changeGem (object: Object3D, material: MeshPhysicalMaterial): void {
    this.object = object
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Gem')) {
        (element as Mesh).material = material
      }
    })
  }
}
