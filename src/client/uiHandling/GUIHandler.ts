import { type GUI } from 'dat.gui'

export class GUIHandler {
  gui: GUI
  folderName = 'Object'

  constructor (gui: GUI) {
    this.gui = gui
    this.gui.addFolder(this.folderName)
    this.hideGUI()
  }

  showGUI (object: THREE.Object3D): void {
    this.gui.removeFolder(this.gui.__folders[this.folderName])
    const objectFolder = this.gui.addFolder(this.folderName)

    objectFolder.add(object.scale, 'x', 0, 1).name('Scale').onChange(() => {
      object.scale.y = object.scale.x
      object.scale.z = object.scale.x
      console.log('changed!')
    })
    objectFolder.add(object, 'visible').name('Visible')
    objectFolder.add(object, 'receiveShadow').name('Receive Shadow')
    objectFolder.add(object, 'castShadow').name('Cast Shadow')

    console.dir(object)

    objectFolder.open()

    this.gui.show()
  }

  hideGUI (): void {
    this.gui.hide()
  }
}
