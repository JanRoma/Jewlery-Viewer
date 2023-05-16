import { type MetalController } from '../model/MetalController'
import { type CssController } from './CssController'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { type MaterialController } from '../data/MaterialController'

export class MetalUIHandler {
  metalDiv!: HTMLDivElement
  metalDivAdded: boolean
  document: Document
  metalController: MetalController
  cssController: CssController
  appProperties: ApplicationProperties
  materialController: MaterialController

  constructor (document: Document, metalController: MetalController, colorController: CssController, appProperties: ApplicationProperties, materialController: MaterialController) {
    this.metalDivAdded = true
    this.document = document
    this.metalController = metalController
    this.cssController = colorController
    this.appProperties = appProperties
    this.materialController = materialController
    this.metalDiv = this.createMetalDiv()
  }

  createMetalDiv (): HTMLDivElement {
    this.metalDiv = this.document.createElement('div')

    const textLabel = this.createMetalLabel()
    const goldButton = this.createGoldButton()
    const silverButton = this.createSilverButton()

    this.metalDiv.appendChild(textLabel)
    this.metalDiv.appendChild(goldButton)
    this.metalDiv.appendChild(silverButton)
    this.metalDiv.style.cssText = this.cssController.returnMetalDivStyle()
    this.metalDiv.style.visibility = 'hidden'

    return this.metalDiv
  }

  createMetalLabel (): HTMLLabelElement {
    const textLabel = this.document.createElement('label')
    textLabel.innerHTML = '<span style="font-family:Arial;">Metal Color</span>'
    textLabel.style.cssText = this.cssController.returnDivLabelStyle()
    return textLabel
  }

  createSilverButton (): HTMLButtonElement {
    const silverButton = this.document.createElement('button')
    const silverButtonStyle = this.cssController.returnSilverButtonStyle()
    silverButton.className = this.cssController.returnMenuBarButtonsClassName()
    silverButton.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', 'Silver')
    silverButton.style.cssText = silverButtonStyle
    silverButton.addEventListener('click', (evt) => { this.silverOnClick(this.metalController, evt) })
    return silverButton
  }

  createGoldButton (): HTMLButtonElement {
    const goldButton = this.document.createElement('button')

    goldButton.className = this.cssController.returnMenuBarButtonsClassName()
    goldButton.style.cssText = this.cssController.returnGoldButtonStyle()
    goldButton.innerHTML = this.cssController.returnIconLabelButton('radio_button_unchecked', 'Gold')
    goldButton.addEventListener('click', (evt) => { this.goldOnClick(this.metalController, evt) })
    return goldButton
  }

  goldOnClick (metalController: MetalController, event: Event): void {
    this.metalController.changeToGold(this.appProperties.mainObject)
  }

  silverOnClick (metalController: MetalController, event: Event): void {
    metalController.changeToSilver(this.appProperties.mainObject)
  }
}
