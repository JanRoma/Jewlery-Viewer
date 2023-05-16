import * as THREE from 'three'
import { type CssController } from './CssController'
import { type ModelController } from '../model/ModelController'

export class ModelUIHandler {
  modelDiv!: HTMLDivElement
  modellDivAdded: boolean // to-do DELETE?
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
    this.modelDiv = this.createModelDiv()
  }

  createModelDiv (): HTMLDivElement {
    this.modelDiv = this.document.createElement('div')

    const textLabel = this.createModelLabel()
    const model1Button = this.createModel1Button()
    const model2Button = this.createModel2Button()

    this.texture = this.loadTexture()

    this.modelDiv.appendChild(textLabel)
    this.modelDiv.appendChild(model1Button)
    this.modelDiv.appendChild(model2Button)
    this.modelDiv.style.cssText = this.cssController.returnModelDivStyle()

    this.modellDivAdded = true // to-do DELETE??
    this.modelDiv.style.visibility = 'hidden'
    return this.modelDiv
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
    const model1ButtonStyle = this.cssController.returnSilverButtonStyle()
    model1Button.className = this.cssController.returnMenuBarButtonsClassName()
    model1Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', '1')
    model1Button.style.cssText = model1ButtonStyle
    model1Button.addEventListener('click', (evt) => { this.model1OnClick(this.modelController, evt) })
    return model1Button
  }

  createModel2Button (): HTMLButtonElement {
    const model2Button = this.document.createElement('button')

    model2Button.className = this.cssController.returnMenuBarButtonsClassName()
    model2Button.style.cssText = this.cssController.returnSilverButtonStyle()
    model2Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', '2')
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
