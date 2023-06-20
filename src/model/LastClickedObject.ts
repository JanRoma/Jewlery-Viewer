import { Mesh } from 'three'
import type { SceneProperties } from '../properties/SceneProperties'

export class LastClickedObject {
  objectLoaded: boolean
  object: Mesh

  constructor () {
    this.objectLoaded = false
    this.object = new Mesh()
  }

  setObjectNotPicked (sceneProperties: SceneProperties): void {
    this.objectLoaded = false
    this.object = new Mesh()
    sceneProperties.outlinePass.selectedObjects = [];
  }

  pickNewObject (object: Mesh, sceneProperties: SceneProperties): void {
    this.objectLoaded = true
    this.object = object
		sceneProperties.outlinePass.selectedObjects = [object];
  }
}
