import type Stats from 'three/examples/jsm/libs/stats.module'
import { type DragAndDropUIHandler } from './DragAndDropUIHandler'
import { type GUIHandler } from './GUIHandler'
import { type RotationUIHandler } from './RotationUIHandler'
import { type MetalUIHandler } from './MetalChangeUIHandler'

export class UIHandler {
  dragAndDropUIHandler: DragAndDropUIHandler
  guiHandler: GUIHandler
  stats: Stats
  rotationUIHandler: RotationUIHandler
  metalUIHandler: MetalUIHandler

  constructor (dragAndDropUIHandler: DragAndDropUIHandler, guiHandler: GUIHandler, stats: Stats, rotationUIHandler: RotationUIHandler, metalUIHandler: MetalUIHandler) {
    this.dragAndDropUIHandler = dragAndDropUIHandler
    this.guiHandler = guiHandler
    this.stats = stats
    this.rotationUIHandler = rotationUIHandler
    this.metalUIHandler = metalUIHandler
  }

  createRotationDiv (): void {
    this.rotationUIHandler.setRotationDivToDocument()
  }

  createDragAndDropDiv (): void {
    this.dragAndDropUIHandler.SetDragAndDropZoneToDocument()
  }

  createMetalDiv (): void {
    this.metalUIHandler.setMetalDivToDocument()
  }
}
