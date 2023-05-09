import { Color } from 'three'
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
    const metalDivStyle = 'font-size: 10px;width: 200px;height: 100px;position: absolute;bottom: 100px;left:50%;-webkit-transform: translateX(-30%);-ms-transform: translateX(-30%);transform: translateX(-30%);'

    this.metalDiv = this.document.createElement('div')
    const button = this.document.createElement('button')
    button.className = 'foo-button mdc-button'
    button.innerHTML = '<div class="mdc-button__ripple"></div><span id="metal-text" class="mdc-button__label">Metal</span><span class="material-icons ">autorenew</span>'
    button.addEventListener('click', (evt) => { this.onClick(this.metalController, evt) })
    this.metalDiv.appendChild(button)
    this.metalDiv.style.cssText = metalDivStyle

    this.document.body.appendChild(this.metalDiv)
  }

  onClick (metalController: MetalController, event: Event): void {
    const metalTextSpan = this.document.getElementById('metal-text') as HTMLSpanElement

    const silverColor = new Color(0xfffff)
    const goldColor = new Color(0xffff00)
    const pickedColor = metalController.color ? goldColor : silverColor
    metalController.changeMetal(pickedColor)
    const onOffText = metalController.color ? 'Silver' : 'Gold'
    metalTextSpan.textContent = onOffText
  }
}
