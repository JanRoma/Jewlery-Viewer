import { MeshStandardMaterial } from 'three'
import { type MetalController } from '../model/MetalController'

export class MetalUIHandler {
  metalDiv!: HTMLDivElement
  metalDivAdded: boolean
  document: Document
  metalController: MetalController

  constructor (document: Document, metalController: MetalController) {
    this.metalDivAdded = true
    this.document = document
    this.metalController = metalController
  }

  setMetalDivToDocument (): void {
    const metalDivStyle = 'font-size: 10px;width: 200px;height: 50px;position: absolute;bottom: 150px;left:50%;-webkit-transform: translateX(-30%);-ms-transform: translateX(-30%);transform: translateX(-30%);'

    this.metalDiv = this.document.createElement('div')
    const goldButton = this.createGoldButton()
    const silverButton = this.createSilverButton()

    this.metalDiv.appendChild(goldButton)
    this.metalDiv.appendChild(silverButton)
    this.metalDiv.style.cssText = metalDivStyle

    this.document.body.appendChild(this.metalDiv)
  }

  createSilverButton (): HTMLButtonElement {
    const silverButton = this.document.createElement('button')
    silverButton.className = 'foo-button mdc-button'
    silverButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="silver-text" class="mdc-button__label">Silver</span>'
    silverButton.addEventListener('click', (evt) => { this.silverOnClick(this.metalController, evt) })
    return silverButton
  }

  createGoldButton (): HTMLButtonElement {
    const goldButton = this.document.createElement('button')
    goldButton.className = 'foo-button mdc-button'
    goldButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="gold-text" class="mdc-button__label">Gold</span>'
    goldButton.addEventListener('click', (evt) => { this.goldOnClick(this.metalController, evt) })
    return goldButton
  }

  goldOnClick (metalController: MetalController, event: Event): void {
    const material = new MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.1,
      metalness: 0.4
    })

    metalController.changeMetal(material)
  }

  silverOnClick (metalController: MetalController, event: Event): void {
    const material = new MeshStandardMaterial({
      color: 0xc0c0c0,
      roughness: 0.1,
      metalness: 0.4
    })

    metalController.changeMetal(material)
  }
}
