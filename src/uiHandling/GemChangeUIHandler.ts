import { type GemController } from '../model/GemController'
import { type CssController } from './CssController'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { type MaterialController } from '../data/MaterialController'

export class GemUIHandler {
  gemDiv!: HTMLDivElement
  gemlDivAdded: boolean
  document: Document
  gemController: GemController
  cssController: CssController
  materialController: MaterialController
  appProperties: ApplicationProperties

  constructor (document: Document, appProperties: ApplicationProperties, gemController: GemController, materialController: MaterialController, cssController: CssController) {
    this.gemlDivAdded = true
    this.document = document
    this.gemController = gemController
    this.cssController = cssController
    this.appProperties = appProperties
    this.materialController = materialController
    this.gemDiv = this.createGemDiv()
  }

  createGemDiv (): HTMLDivElement {
    this.gemDiv = this.document.createElement('div')

    const textLabel = this.createGemLabel()
    const emeraldButton = this.createEmeraldButton()
    const sapphireButton = this.createSapphireButton()

    this.gemDiv.appendChild(textLabel)
    this.gemDiv.appendChild(emeraldButton)
    this.gemDiv.appendChild(sapphireButton)
    this.gemDiv.style.cssText = this.cssController.returnGemDivStyle()
    this.gemDiv.style.visibility = 'hidden'

    return this.gemDiv
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

    emeraldButton.className = this.cssController.returnMenuBarButtonsClassName()
    emeraldButton.innerHTML = this.cssController.returnIconLabelButton('diamond', 'Emerald')
    emeraldButton.style.cssText = emeraldButtonStyle
    emeraldButton.addEventListener('click', (evt) => { this.emeraldOnClick(this.gemController, evt) })
    return emeraldButton
  }

  createSapphireButton (): HTMLButtonElement {
    const sapphireButton = this.document.createElement('button')
    const sapphireButtonStyle = `color: #${this.cssController.sapphireColor.getHexString()}`

    sapphireButton.style.cssText = sapphireButtonStyle
    sapphireButton.className = this.cssController.returnMenuBarButtonsClassName()
    sapphireButton.innerHTML = this.cssController.returnIconLabelButton('diamond', 'Sapphire')
    sapphireButton.addEventListener('click', (evt) => { this.sapphireOnClick(this.gemController, evt) })
    return sapphireButton
  }

  emeraldOnClick (gemController: GemController, evt: Event): void {
    gemController.changeToEmerald(this.appProperties.mainObject)
  }

  sapphireOnClick (gemController: GemController, evt: Event): void {
    gemController.changeToSapphire(this.appProperties.mainObject)
  }
}
