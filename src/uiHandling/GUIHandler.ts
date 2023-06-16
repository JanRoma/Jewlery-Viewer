import { type GUI } from 'dat.gui'
import { type TextureDatabase } from '../fileHandling/TextureDatabase'
import { type MaterialController } from '../data/MaterialController'
import { Color, TextureLoader, type Texture } from 'three'
import { type SceneProperties } from '../properties/SceneProperties'

export class GUIHandler {
  gui: GUI
  folderName = 'Object'
  sceneFolderName = 'Scene'
  textureDatabase: TextureDatabase
  materialController: MaterialController
  params: { backgroundColor: number[] }
  sceneProperties: SceneProperties
  background: Color | Texture

  constructor (gui: GUI, textureDatabase: TextureDatabase, materialController: MaterialController, sceneProperties: SceneProperties) {
    this.gui = gui
    this.sceneProperties = sceneProperties
    this.gui.addFolder(this.folderName)
    this.hideGUI()
    this.textureDatabase = textureDatabase
    this.materialController = materialController
    this.params = { backgroundColor: [255, 0, 255] }
    this.sceneProperties.scene.background = new Color(0xffffff)
    this.background = this.sceneProperties.scene.background
  }

  showGUI (object: THREE.Object3D): void {
    this.gui.removeFolder(this.gui.__folders[this.folderName])
    this.gui.removeFolder(this.gui.__folders[this.sceneFolderName])
    const sceneFolder = this.gui.addFolder(this.sceneFolderName)
    this.params.backgroundColor = [255, 0, 255]
    const obj = { add: function () { console.log('clicked') } }

    sceneFolder.add(obj, 'add').name('BG File').onChange(() => {
      const input = document.createElement('input')
      input.accept = 'image/png, image/gif, image/jpeg'
      input.type = 'file'
      const sp = this.sceneProperties
      input.addEventListener('change', function (e: Event) {
        const target = e.target as HTMLInputElement
        if (target.files == null) return

        const files = target.files
        if (files[0] != null) {
          document.body.append('You selected ' + files[0].name)
          console.log('You selected ' + files[0].name)
        }

        const userImageURL = URL.createObjectURL(files[0])
        const loader = new TextureLoader()
        loader.setCrossOrigin('')
        const texture = loader.load(userImageURL)
        sp.scene.background = texture
      })
      input.click()
    })

    sceneFolder.open()
    sceneFolder.addColor(this.params, 'backgroundColor').onChange(() => {
      console.log(`r: ${this.params.backgroundColor[0]}`)
      console.log(`g: ${this.params.backgroundColor[1]}`)

      console.log(`b: ${this.params.backgroundColor[2]}`)
      const colorString = `rgb(${Math.floor(this.params.backgroundColor[0])}, ${Math.floor(this.params.backgroundColor[1])}, ${Math.floor(this.params.backgroundColor[2])})`
      this.sceneProperties.scene.background = new Color(colorString)
    })

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
