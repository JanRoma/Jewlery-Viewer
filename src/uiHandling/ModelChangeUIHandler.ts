import * as THREE from 'three'
import { type CssController } from './CssController'
import { type ModelController } from '../model/ModelController'

export class ModelUIHandler {
  modelDiv: HTMLDivElement
  document: Document
  modelController: ModelController
  cssController: CssController
  model1Button: HTMLButtonElement
  model2Button: HTMLButtonElement
  textLabel: HTMLLabelElement
  modelChecked: number

  constructor (document: Document, metalController: ModelController, cssController: CssController) {
    this.document = document
    this.modelController = metalController
    this.cssController = cssController
    this.textLabel = this.createModelLabel()
    this.model1Button = this.createModel1Button()
    this.model2Button = this.createModel2Button()
    this.modelDiv = this.createModelDiv()
    this.modelChecked = 2
  }

  createModelDiv (): HTMLDivElement {
    this.modelDiv = this.document.createElement('div')
    this.modelDiv.appendChild(this.textLabel)
    this.modelDiv.appendChild(this.model1Button)
    this.modelDiv.appendChild(this.model2Button)
    this.modelDiv.style.cssText = this.cssController.returnModelDivStyle()

    this.modelDiv.style.visibility = 'hidden'
    return this.modelDiv
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
    model2Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_checked', '2')
    model2Button.addEventListener('click', (evt) => { this.model2OnClick(this.modelController, evt) })
    return model2Button
  }

  model1OnClick (modelController: ModelController, event: Event): void {
    if (this.modelChecked === 2) {
      modelController.changeModel('model2')

      this.model1Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_checked', '1')
      this.model2Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', '2')
      this.modelChecked = 1
    }
  }

  model2OnClick (modelController: ModelController, event: Event): void {
    if (this.modelChecked === 1) {
      modelController.changeModel('model3')
      this.model1Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', '1')
      this.model2Button.innerHTML = this.cssController.returnIconLabelButton('radio_button_checked', '2')
      this.modelChecked = 2
    }
  }
}
