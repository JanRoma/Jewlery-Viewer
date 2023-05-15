import { type Object3D } from 'three'
import { type MaterialController } from '../data/MaterialController'

export class MetalController {
  materialController: MaterialController

  constructor (materialController: MaterialController) {
    this.materialController = materialController
  }

  changeToGold (object: Object3D): void {
    this.materialController.changeToGold(object)
  }

  changeToSilver (object: Object3D): void {
    this.materialController.changeToSilver(object)
  }
}
