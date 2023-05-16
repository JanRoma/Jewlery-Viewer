import type Stats from 'three/examples/jsm/libs/stats.module'
import { type DragAndDropUIHandler } from './DragAndDropUIHandler'
import { type GUIHandler } from './GUIHandler'
import { type RotationUIHandler } from './RotationUIHandler'
import { type MetalUIHandler } from './MetalChangeUIHandler'
import { type GemUIHandler } from './GemChangeUIHandler'
import { type ModelUIHandler } from './ModelChangeUIHandler'
import { type MenuBarUIHandler } from './MenuBarUIHandler'

export class UIHandler {
  document: Document
  dragAndDropUIHandler: DragAndDropUIHandler
  guiHandler: GUIHandler
  stats: Stats
  rotationUIHandler: RotationUIHandler
  metalUIHandler: MetalUIHandler
  gemUIHandler: GemUIHandler
  modelUIHandler: ModelUIHandler
  menuBarUIHandler: MenuBarUIHandler

  constructor (dragAndDropUIHandler: DragAndDropUIHandler,
    guiHandler: GUIHandler,
    stats: Stats,
    rotationUIHandler: RotationUIHandler,
    metalUIHandler: MetalUIHandler,
    gemUIHandler: GemUIHandler,
    modelUIHandler: ModelUIHandler,
    menuBarUIHandler: MenuBarUIHandler,
    document: Document) {
    this.dragAndDropUIHandler = dragAndDropUIHandler
    this.guiHandler = guiHandler
    this.stats = stats
    this.rotationUIHandler = rotationUIHandler
    this.metalUIHandler = metalUIHandler
    this.gemUIHandler = gemUIHandler
    this.modelUIHandler = modelUIHandler
    this.menuBarUIHandler = menuBarUIHandler
    this.document = document
  }

  setDivsToDocument (): void {
    this.document.body.appendChild(this.rotationUIHandler.rotationDiv)
    console.dir(this.rotationUIHandler.rotationDiv)
    console.log('aa')
    // this.document.body.appendChild(this.dragAndDropUIHandler.dropZoneDiv)
    this.document.body.appendChild(this.metalUIHandler.metalDiv)
    this.document.body.appendChild(this.gemUIHandler.gemDiv)
    this.document.body.appendChild(this.modelUIHandler.modelDiv)

    this.document.body.appendChild(this.menuBarUIHandler.menuBarDiv)
  }

  createRotationDiv (): HTMLDivElement {
    return this.rotationUIHandler.createRotationDiv()
  }

  createDragAndDropDiv (): HTMLDivElement {
    return this.dragAndDropUIHandler.createDragAndDropDiv()
  }

  createMetalDiv (): HTMLDivElement {
    return this.metalUIHandler.createMetalDiv()
  }

  createGemDiv (): HTMLDivElement {
    return this.gemUIHandler.createGemDiv()
  }

  createModelDiv (): HTMLDivElement {
    return this.modelUIHandler.createModelDiv()
  }

  createMenuBarDiv (): HTMLDivElement {
    return this.menuBarUIHandler.createMenuBarDiv()
  }
}
