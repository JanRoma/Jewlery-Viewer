import { type Object3D } from 'three'
import { type ModelLoader } from '../fileHandling/ModelLoader'

export class ModelController {
  object: Object3D
  path: string
  modelLoader: ModelLoader

  constructor (object: Object3D, modelLoader: ModelLoader) {
    this.object = object
    this.modelLoader = modelLoader
    this.path = 'models/'
  }

  changeObject (object: Object3D): void {
    this.object = object
  }

  changeModel (name: string): void {
    console.dir(this.object)
    this.modelLoader.loadOBJModel(this.path, name)
  }
}
