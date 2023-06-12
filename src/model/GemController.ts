import { type Object3D } from 'three'
import { type MaterialController } from '../data/MaterialController'

export class GemController {
  materialController: MaterialController

  constructor (materialController: MaterialController) {
    this.materialController = materialController
  }

  changeToEmerald (object: Object3D): void {
    this.materialController.changeToEmerald(object)
  }

  changeToSapphire (object: Object3D): void {
    this.materialController.changeToSapphire(object)
  }
}
