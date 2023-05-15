import { type GemController } from '../model/GemController'
import { type CssController } from './CssController'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { type MaterialSet } from '../data/MaterialSet'

export class GemUIHandler {
  gemDiv!: HTMLDivElement
  gemlDivAdded: boolean
  document: Document
  gemController: GemController
  cssController: CssController
  materialController: MaterialSet
  appProperties: ApplicationProperties

  constructor (document: Document, appProperties: ApplicationProperties, gemController: GemController, materialController: MaterialSet, cssController: CssController) {
    this.gemlDivAdded = true
    this.document = document
    this.gemController = gemController
    this.cssController = cssController
    this.appProperties = appProperties
    this.materialController = materialController
  }

  setGemDivToDocument (): void {
    this.gemDiv = this.document.createElement('div')

    const textLabel = this.createGemLabel()
    const emeraldButton = this.createEmeraldButton()
    const sapphireButton = this.createSapphireButton()

    this.gemDiv.appendChild(textLabel)
    this.gemDiv.appendChild(emeraldButton)
    this.gemDiv.appendChild(sapphireButton)
    this.gemDiv.style.cssText = this.cssController.returnGemDivStyle()

    this.document.body.appendChild(this.gemDiv)
  }

  createGemLabel (): HTMLLabelElement {
    const textLabel = this.document.createElement('label')
    textLabel.innerHTML = '<span style="font-family:Arial;">Gem Color</span>'
    textLabel.style.cssText = this.cssController.returnDivLabelStyle()
    return textLabel
  }

  createEmeraldButton (): HTMLButtonElement {
    const emeraldButton = this.document.createElement('button')
    const emeraldButtonStyle = `color: #${this.cssController.emeraldColor.getHexString()}`

    emeraldButton.className = 'foo-button mdc-button'
    emeraldButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="emerald-text" class="mdc-button__label"><span class="material-icons">diamond</span></span>'
    emeraldButton.style.cssText = emeraldButtonStyle
    emeraldButton.addEventListener('click', (evt) => { this.emeraldOnClick(this.gemController, evt) })
    return emeraldButton
  }

  createSapphireButton (): HTMLButtonElement {
    const sapphireButton = this.document.createElement('button')
    const sapphireButtonStyle = `color: #${this.cssController.sapphireColor.getHexString()}`

    sapphireButton.style.cssText = sapphireButtonStyle
    sapphireButton.className = 'foo-button mdc-button'
    sapphireButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="sapphire-text" class="mdc-button__label"><span class="material-icons">diamond</span></span>'
    sapphireButton.addEventListener('click', (evt) => { this.sapphireOnClick(this.gemController, evt) })
    return sapphireButton
  }

  emeraldOnClick (gemController: GemController, evt: Event): void {
    gemController.changeGem(this.appProperties.mainObject, this.materialController.emeraldMaterial)
  }

  sapphireOnClick (gemController: GemController, evt: Event): void {
    gemController.changeGem(this.appProperties.mainObject, this.materialController.sapphireMaterial)
  }
}
