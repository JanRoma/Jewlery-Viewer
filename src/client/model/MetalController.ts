import { type Mesh, type Color, type Object3D, MeshPhongMaterial } from 'three'

export class MetalController {
  color: boolean
  object: Object3D

  constructor (object: Object3D) {
    this.color = true
    this.object = object
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeMetal (color: Color): void {
    this.color = !this.color
    console.dir(this.object)
    this.object.children.forEach(element => {
      if (element.name.startsWith('Metal')) {
        (element as Mesh).material = new MeshPhongMaterial();
        ((element as Mesh).material as MeshPhongMaterial).color = color
      }
    })

    // this.object.visible = this.color
  }
}
