import { type RotationController } from '../model/RotationController'

export class RotationUIHandler {
  rotationDiv: HTMLDivElement
  rotationDivAdded: boolean
  document: Document
  rotationController: RotationController

  constructor (document: Document, rotationController: RotationController) {
    this.rotationDivAdded = true
    this.document = document
    this.rotationController = rotationController
    this.rotationDiv = this.createRotationDiv()
  }

  createRotationDiv (): HTMLDivElement {
    const rotationDivStyle = 'font-size: 10px;width: 200px;height: 100px;position: absolute;bottom: -20px;left:50%;-webkit-transform: translateX(-30%);-ms-transform: translateX(-30%);transform: translateX(-30%);'

    this.rotationDiv = this.document.createElement('div')
    const rotationButton = this.document.createElement('button')
    rotationButton.className = 'foo-button mdc-button'
    rotationButton.innerHTML = '<div class="mdc-button__ripple"></div><span id="rotation-text" class="mdc-button__label">Rotate On</span><span class="material-icons ">refresh</span>'
    rotationButton.addEventListener('click', (evt) => { this.onClick(this.rotationController, evt) })
    this.rotationDiv.appendChild(rotationButton)
    this.rotationDiv.style.cssText = rotationDivStyle

    return this.rotationDiv
  }

  onClick (rotationController: RotationController, event: Event): void {
    const onOffTextSpan = this.document.getElementById('rotation-text') as HTMLSpanElement

    rotationController.rotate(!rotationController.isRotating)
    const onOffText = rotationController.isRotating ? 'Rotate Off' : 'Rotate On'
    onOffTextSpan.textContent = onOffText
  }
}
