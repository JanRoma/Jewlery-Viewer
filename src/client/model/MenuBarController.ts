
export class MenuBarController {
  modelDiv: HTMLDivElement
  metalDiv: HTMLDivElement
  gemDiv: HTMLDivElement

  constructor (modelDiv: HTMLDivElement, metalDiv: HTMLDivElement, gemDiv: HTMLDivElement) {
    this.modelDiv = modelDiv
    this.metalDiv = metalDiv
    this.gemDiv = gemDiv
  }

  showModelDiv (): void {
    this.modelDiv.style.visibility = 'visible'
    this.metalDiv.style.visibility = 'hidden'
    this.gemDiv.style.visibility = 'hidden'
  }

  showMetalDiv (): void {
    this.modelDiv.style.visibility = 'hidden'
    this.metalDiv.style.visibility = 'visible'
    this.gemDiv.style.visibility = 'hidden'
  }

  showGemDiv (): void {
    this.modelDiv.style.visibility = 'hidden'
    this.metalDiv.style.visibility = 'hidden'
    this.gemDiv.style.visibility = 'visible'
  }

  hideAllDivs (): void {
    this.modelDiv.style.visibility = 'hidden'
    this.metalDiv.style.visibility = 'hidden'
    this.gemDiv.style.visibility = 'hidden'
  }
}
