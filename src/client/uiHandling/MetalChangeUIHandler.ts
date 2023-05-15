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
  }

  setMetalDivToDocument (): void {
    this.metalDiv = this.document.createElement('div')

    const textLabel = this.createMetalLabel()
    const goldButton = this.createGoldButton()
    const silverButton = this.createSilverButton()

    this.metalDiv.appendChild(textLabel)
    this.metalDiv.appendChild(goldButton)
    this.metalDiv.appendChild(silverButton)
    this.metalDiv.style.cssText = this.cssController.returnMetalDivStyle()

    this.document.body.appendChild(this.metalDiv)
  }

  createMetalLabel (): HTMLLabelElement {
    const textLabel = this.document.createElement('label')
    textLabel.innerHTML = '<span style="font-family:Arial;">Metal Color</span>'
    textLabel.style.cssText = this.cssController.returnDivLabelStyle()
    return textLabel
  }

  createSilverButton (): HTMLButtonElement {
    const silverButton = this.document.createElement('button')
    const silverButtonStyle = `color: #${this.cssController.silverColor.getHexString()};display:inline-block;vertical-align:bottom;`
    silverButton.className = 'foo-button mdc-button'
    silverButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="silver-text" class="mdc-button__label"><span class="material-icons">radio_button_unchecked</span></span>'
    silverButton.style.cssText = silverButtonStyle
    silverButton.addEventListener('click', (evt) => { this.silverOnClick(this.metalController, evt) })
    return silverButton
  }

  createGoldButton (): HTMLButtonElement {
    const goldButton = this.document.createElement('button')

    goldButton.className = 'foo-button mdc-button'
    goldButton.style.cssText = this.cssController.returnGoldButtonStyle()
    goldButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="gold-text" class="mdc-button__label"><span class="material-icons">radio_button_unchecked</span></span>'
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
