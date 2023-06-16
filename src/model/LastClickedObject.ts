import { Mesh } from 'three'
import type { SceneProperties } from '../properties/SceneProperties'

export class LastClickedObject {
  objectLoaded: boolean
  object: Mesh

  constructor () {
    this.objectLoaded = false
    this.object = new Mesh()
  }

  removePickedObject (): void {
    this.objectLoaded = false
    this.object = new Mesh()
  }

  setObjectNotPicked (sceneProperties: SceneProperties): void {
    this.removePickedObject()
    sceneProperties.scene.remove( sceneProperties.objectOutline );
  }

  pickNewObject (object: Mesh, sceneProperties: SceneProperties): void {
    this.objectLoaded = true
    this.object = object
		sceneProperties.outlinePass.selectedObjects = [object];
  }
}
