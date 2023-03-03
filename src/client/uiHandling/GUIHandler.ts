import { type GUI } from 'dat.gui'

export class GUIHandler {
  gui: GUI
  folderName = 'Object'

  constructor (gui: GUI) {
    this.gui = gui
    this.gui.addFolder(this.folderName)
    this.hideGUI()
  }

  showGUI (object: THREE.Mesh): void {
    this.gui.removeFolder(this.gui.__folders[this.folderName])
    const objectFolder = this.gui.addFolder(this.folderName)
    objectFolder.add(object.scale, 'x', 0, 1).onChange(() => {
      object.scale.y = object.scale.x
      object.scale.z = object.scale.x
    })
    objectFolder.open()

    this.gui.show()
  }

  hideGUI (): void {
    this.gui.hide()
  }
}
