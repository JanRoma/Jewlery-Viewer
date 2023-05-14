import * as THREE from 'three'
import { type CssController } from '../model/CssController'
import { type ModelController } from '../model/ModelController'

export class ModelUIHandler {
  metalDiv!: HTMLDivElement
  modellDivAdded: boolean
  document: Document
  modelController: ModelController
  texture: THREE.Texture
  cssController: CssController

  constructor (document: Document, metalController: ModelController, cssController: CssController) {
    this.modellDivAdded = false
    this.document = document
    this.modelController = metalController
    this.texture = new THREE.Texture()
    this.cssController = cssController
  }

  setModelDivToDocument (): void {
    this.metalDiv = this.document.createElement('div')

    const textLabel = this.createModelLabel()
    const model1Button = this.createModel1Button()
    const model2Button = this.createModel2Button()

    this.texture = this.loadTexture()

    this.metalDiv.appendChild(textLabel)
    this.metalDiv.appendChild(model1Button)
    this.metalDiv.appendChild(model2Button)
    this.metalDiv.style.cssText = this.cssController.returnModelDivStyle()

    this.document.body.appendChild(this.metalDiv)
    this.modellDivAdded = true
  }

  loadTexture (): THREE.Texture {
    const imgTexture = new THREE.CubeTextureLoader().setPath('img/SCM/')
      .load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
      ])
    // imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
    imgTexture.anisotropy = 16
    return imgTexture
  }

  createModelLabel (): HTMLLabelElement {
    const textLabel = this.document.createElement('label')
    textLabel.innerHTML = '<span style="font-family:Arial;">Model</span>'
    textLabel.style.cssText = this.cssController.returnDivLabelStyle()
    return textLabel
  }

  createModel1Button (): HTMLButtonElement {
    const model1Button = this.document.createElement('button')
    const model1ButtonStyle = `color: #${this.cssController.silverColor.getHexString()};display:inline-block;vertical-align:bottom;`
    model1Button.className = 'foo-button mdc-button'
    model1Button.innerHTML = '<div class="mdc-button__ripple"></div><span id="model1-text" class="mdc-button__label">1</span>'
    model1Button.style.cssText = model1ButtonStyle
    model1Button.addEventListener('click', (evt) => { this.model1OnClick(this.modelController, evt) })
    return model1Button
  }

  createModel2Button (): HTMLButtonElement {
    const model2Button = this.document.createElement('button')

    model2Button.className = 'foo-button mdc-button'
    model2Button.style.cssText = this.cssController.returnGoldButtonStyle()
    model2Button.innerHTML = '<div class="mdc-button__ripple"></div><span id="model2-text" class="mdc-button__label">2</span>'
    model2Button.addEventListener('click', (evt) => { this.model2OnClick(this.modelController, evt) })
    return model2Button
  }

  model1OnClick (modelController: ModelController, event: Event): void {
    modelController.changeModel('Jasiu2')
  }

  model2OnClick (modelController: ModelController, event: Event): void {
    modelController.changeModel('Jasiu3')
  }
}
