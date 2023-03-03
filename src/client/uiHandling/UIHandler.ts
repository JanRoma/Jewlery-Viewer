import type Stats from 'three/examples/jsm/libs/stats.module'
import { type DragAndDropUIHandler } from './DragAndDropUIHandler'
import { type GUIHandler } from './GUIHandler'

export class UIHandler {
  dragAndDropUIHandler: DragAndDropUIHandler
  guiHandler: GUIHandler
  stats: Stats

  constructor (dragAndDropUIHandler: DragAndDropUIHandler, guiHandler: GUIHandler, stats: Stats) {
    this.dragAndDropUIHandler = dragAndDropUIHandler
    this.guiHandler = guiHandler
    this.stats = stats
  }
}
