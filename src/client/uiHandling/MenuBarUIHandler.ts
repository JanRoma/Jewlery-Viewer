
import { type MenuBarController } from '../model/MenuBarController'
import { type CssController } from './CssController'

export class MenuBarUIHandler {
  document: Document
  menuBarController: MenuBarController
  menuBarDiv: HTMLDivElement
  cssController: CssController

  constructor (document: Document, menuBarController: MenuBarController, cssController: CssController) {
    this.document = document
    this.menuBarController = menuBarController
    this.cssController = cssController
    this.menuBarDiv = this.createMenuBarDiv()
  }

  createMenuBarDiv (): HTMLDivElement {
    this.menuBarDiv = this.document.createElement('div')

    const menuBarLabel = this.createMenuBarLabel()
    const metalButton = this.createMetalButton()
    const gemButton = this.createGemButton()
    const modelButton = this.createModelButton()

    this.menuBarDiv.appendChild(menuBarLabel)
    this.menuBarDiv.appendChild(metalButton)
    this.menuBarDiv.appendChild(gemButton)
    this.menuBarDiv.appendChild(modelButton)
    this.menuBarDiv.style.cssText = this.cssController.returnMenuBarDivStyle()

    return this.menuBarDiv
  }

  createMenuBarLabel (): HTMLLabelElement {
    const textLabel = this.document.createElement('label')
    textLabel.innerHTML = '<span style="font-family:Arial;">Properties</span>'
    textLabel.style.cssText = this.cssController.returnDivLabelStyle()
    return textLabel
  }

  createMetalButton (): HTMLButtonElement {
    const metalButton = this.document.createElement('button')
    const metalButtonStyle = `color: #${this.cssController.silverColor.getHexString()};display:inline-block;vertical-align:bottom;`
    metalButton.className = 'foo-button mdc-button'
    metalButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="gold-text" class="mdc-button__label"><span class="material-icons">radio_button_unchecked</span></span>'
    metalButton.style.cssText = metalButtonStyle
    metalButton.addEventListener('click', (evt) => { this.metalButtonClicked() })
    return metalButton
  }

  createGemButton (): HTMLButtonElement {
    const gemButton = this.document.createElement('button')

    gemButton.className = 'foo-button mdc-button'
    gemButton.style.cssText = this.cssController.returnGoldButtonStyle()
    gemButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="gold-text" class="mdc-button__label"><span class="material-icons">diamond</span></span>'
    gemButton.addEventListener('click', (evt) => { this.gemButtonClicked() })
    return gemButton
  }

  createModelButton (): HTMLButtonElement {
    const modelButton = this.document.createElement('button')

    modelButton.className = 'foo-button mdc-button'
    modelButton.style.cssText = this.cssController.returnGoldButtonStyle()
    modelButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="gold-text" class="mdc-button__label"><span class="material-icons">radio_button_unchecked</span></span>'
    modelButton.addEventListener('click', (evt) => { this.modelButtonClicked() })
    return modelButton
  }

  modelButtonClicked (): void {
    this.menuBarController.showModelDiv()
  }

  metalButtonClicked (): void {
    this.menuBarController.showMetalDiv()
  }

  gemButtonClicked (): void {
    this.menuBarController.showGemDiv()
  }
}
