
import { type MenuBarController } from '../model/MenuBarController'
import { type CssController } from './CssController'

export class MenuBarUIHandler {
  document: Document
  menuBarController: MenuBarController
  menuBarDiv: HTMLDivElement
  cssController: CssController
  lastClickedButton: string

  constructor (document: Document, menuBarController: MenuBarController, cssController: CssController) {
    this.document = document
    this.menuBarController = menuBarController
    this.cssController = cssController
    this.menuBarDiv = this.createMenuBarDiv()
    this.lastClickedButton = 'none'
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
    metalButton.className = this.cssController.returnMenuBarButtonsClassName()
    metalButton.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', 'Metal')
    metalButton.style.cssText = this.cssController.returnIconsStyle()
    metalButton.addEventListener('click', (evt) => { this.metalButtonClicked() })
    return metalButton
  }

  createGemButton (): HTMLButtonElement {
    const gemButton = this.document.createElement('button')

    gemButton.className = this.cssController.returnMenuBarButtonsClassName()
    gemButton.style.cssText = this.cssController.returnIconsStyle()
    gemButton.innerHTML = this.cssController.returnIconLabelButton('diamond', 'Gem')
    gemButton.addEventListener('click', (evt) => { this.gemButtonClicked() })
    return gemButton
  }

  createModelButton (): HTMLButtonElement {
    const modelButton = this.document.createElement('button')

    modelButton.className = this.cssController.returnMenuBarButtonsClassName()
    modelButton.style.cssText = this.cssController.returnIconsStyle()
    modelButton.innerHTML = this.cssController.returnIconLabelButton('change_circle', 'Model')
    modelButton.addEventListener('click', (evt) => { this.modelButtonClicked() })
    return modelButton
  }

  modelButtonClicked (): void {
    if (this.lastClickedButton === 'model') {
      this.menuBarController.hideAllDivs()
      this.lastClickedButton = 'none'
    } else {
      this.menuBarController.showModelDiv()
      this.lastClickedButton = 'model'
    }
  }

  metalButtonClicked (): void {
    if (this.lastClickedButton === 'metal') {
      this.menuBarController.hideAllDivs()
      this.lastClickedButton = 'none'
    } else {
      this.menuBarController.showMetalDiv()
      this.lastClickedButton = 'metal'
    }
  }

  gemButtonClicked (): void {
    if (this.lastClickedButton === 'gem') {
      this.menuBarController.hideAllDivs()
      this.lastClickedButton = 'none'
    } else {
      this.menuBarController.showGemDiv()
      this.lastClickedButton = 'gem'
    }
  }
}
