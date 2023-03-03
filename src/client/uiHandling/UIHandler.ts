import type Stats from 'three/examples/jsm/libs/stats.module'
import { type DragAndDropUIHandler } from './DragAndDropUIHandler'
import { type GUIHandler } from './GUIHandler'
import { type RotationUIHandler } from './RotationUIHandler'

export class UIHandler {
  dragAndDropUIHandler: DragAndDropUIHandler
  guiHandler: GUIHandler
  stats: Stats
  rotationUIHandler: RotationUIHandler

  constructor (dragAndDropUIHandler: DragAndDropUIHandler, guiHandler: GUIHandler, stats: Stats, rotationUIHandler: RotationUIHandler) {
    this.dragAndDropUIHandler = dragAndDropUIHandler
    this.guiHandler = guiHandler
    this.stats = stats
    this.rotationUIHandler = rotationUIHandler
  }

  createRotationDiv (): void {
    this.rotationUIHandler.setRotationDivToDocument()
  }

  createDragAndDropDiv (): void {
    this.dragAndDropUIHandler.SetDragAndDropZoneToDocument()
  }
}
