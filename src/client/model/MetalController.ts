import { type Mesh, type Color, type Object3D, MeshPhongMaterial } from 'three'

export class MetalController {
  object: Object3D

  constructor (object: Object3D) {
    this.object = object
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeMetal (color: Color): void {
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Metal')) {
        (element as Mesh).material = new MeshPhongMaterial();
        ((element as Mesh).material as MeshPhongMaterial).color = color
      }
    })
  }
}
