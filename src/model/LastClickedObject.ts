import { Color, Mesh, type MeshPhongMaterial } from 'three'

export class LastClickedObject {
  objectLoaded: boolean
  object: Mesh
  originalColor: Color

  constructor () {
    this.objectLoaded = false
    this.object = new Mesh()
    this.originalColor = new Color(0xffffff)
  }

  // Add proper handling for picker, not with changing the color.
  // Decide how it should be handled
  removePickedObject (): void {
    this.objectLoaded = false
    this.object = new Mesh()
    this.originalColor = new Color(0xffffff)
  }

  setObjectNotPicked (): void {
    (this.object.material as MeshPhongMaterial).color = this.originalColor
    this.removePickedObject()
  }

  pickNewObject (object: Mesh): void {
    this.objectLoaded = true
    this.object = object
    this.originalColor = (object.material as MeshPhongMaterial).color;
    (this.object.material as MeshPhongMaterial).color = new Color(0xff00ff)
  }
}
