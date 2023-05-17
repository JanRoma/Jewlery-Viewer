import { type GUI } from 'dat.gui'
import { type TextureDatabase } from '../fileHandling/TextureDatabase'
import { type MaterialController } from '../data/MaterialController'
import { type Texture } from 'three'

export class GUIHandler {
  gui: GUI
  folderName = 'Object'
  textureDatabase: TextureDatabase
  materialController: MaterialController

  constructor (gui: GUI, textureDatabase: TextureDatabase, materialController: MaterialController) {
    this.gui = gui
    this.gui.addFolder(this.folderName)
    this.hideGUI()
    this.textureDatabase = textureDatabase
    this.materialController = materialController
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
    const text = { envMap: 'envMap' }
    console.dir(Array.from(this.textureDatabase.textures.keys()))

    const dropdown = objectFolder.add(text, 'envMap', Array.from(this.textureDatabase.textures.keys())).onChange((value) => {
      this.materialController.changeMetalEnvMap(this.textureDatabase.textures.get(value) as Texture, value)
    })
    console.log(this.materialController.envTexture)
    dropdown.setValue(this.materialController.envTextureName)

    console.dir(object)

    objectFolder.open()

    this.gui.show()
  }

  hideGUI (): void {
    this.gui.hide()
  }
}
