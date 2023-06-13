import type Stats from 'three/examples/jsm/libs/stats.module'
import { type DragAndDropUIHandler } from './DragAndDropUIHandler'
import { type GUIHandler } from './GUIHandler'
import { type MetalUIHandler } from './MetalChangeUIHandler'
import { type GemUIHandler } from './GemChangeUIHandler'
import { type ModelUIHandler } from './ModelChangeUIHandler'
import { type MenuBarUIHandler } from './MenuBarUIHandler'
import { type HideMenuUIHandler } from './HideMenuUIHandler'

export class UIHandler {
  document: Document
  dragAndDropUIHandler: DragAndDropUIHandler
  guiHandler: GUIHandler
  stats: Stats
  metalUIHandler: MetalUIHandler
  gemUIHandler: GemUIHandler
  modelUIHandler: ModelUIHandler
  menuBarUIHandler: MenuBarUIHandler
  hideMenuUIHandler: HideMenuUIHandler

  constructor (dragAndDropUIHandler: DragAndDropUIHandler,
    guiHandler: GUIHandler,
    stats: Stats,
    metalUIHandler: MetalUIHandler,
    gemUIHandler: GemUIHandler,
    modelUIHandler: ModelUIHandler,
    menuBarUIHandler: MenuBarUIHandler,
    hideMenuUIHandler: HideMenuUIHandler,
    document: Document) {
    this.dragAndDropUIHandler = dragAndDropUIHandler
    this.guiHandler = guiHandler
    this.stats = stats
    this.metalUIHandler = metalUIHandler
    this.gemUIHandler = gemUIHandler
    this.modelUIHandler = modelUIHandler
    this.menuBarUIHandler = menuBarUIHandler
    this.document = document
    this.hideMenuUIHandler = hideMenuUIHandler
  }

  setDivsToDocument (): void {
    this.document.body.appendChild(this.hideMenuUIHandler.hideMenuDiv)
    // this.document.body.appendChild(this.dragAndDropUIHandler.dropZoneDiv)
    this.document.body.appendChild(this.metalUIHandler.metalDiv)
    this.document.body.appendChild(this.gemUIHandler.gemDiv)
    this.document.body.appendChild(this.modelUIHandler.modelDiv)

    this.document.body.appendChild(this.menuBarUIHandler.menuBarDiv)
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
