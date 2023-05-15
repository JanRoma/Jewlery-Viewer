import { MeshStandardMaterial } from 'three'
import { type MetalController } from '../model/MetalController'
import { type CssController } from './CssController'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { type MaterialSet } from '../data/MaterialSet'

export class MetalUIHandler {
  metalDiv!: HTMLDivElement
  metalDivAdded: boolean
  document: Document
  metalController: MetalController
  cssController: CssController
  appProperties: ApplicationProperties
  materialController: MaterialSet

  constructor (document: Document, metalController: MetalController, colorController: CssController, appProperties: ApplicationProperties, materialController: MaterialSet) {
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
    metalController.changeMetal(this.appProperties.mainObject, this.materialController.goldMaterial)
  }

  silverOnClick (metalController: MetalController, event: Event): void {
    const material = new MeshStandardMaterial({
      color: this.cssController.silverColor,
      roughness: 0.1,
      metalness: 0.6
    })

    metalController.changeMetal(this.appProperties.mainObject, material)
  }
}
