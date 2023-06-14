import { type MenuBarUIHandler } from './MenuBarUIHandler'

export class HideMenuUIHandler {
  hideMenuDiv: HTMLDivElement
  hideMenuButton: HTMLButtonElement
  rotationDivAdded: boolean
  document: Document
  menuBarUIHandler: MenuBarUIHandler

  constructor (document: Document, menuBarUIHandler: MenuBarUIHandler) {
    this.rotationDivAdded = true
    this.document = document
    this.menuBarUIHandler = menuBarUIHandler
    this.hideMenuButton = this.createHideMenuButton()
    this.hideMenuDiv = this.createHideMenuDiv()
  }

  createHideMenuDiv (): HTMLDivElement {
    const hideMenuDivStyle = 'font-size: 10px;width: 200px;height: 100px;position: absolute;bottom: -60px;left:50%;-webkit-transform: translateX(-30%);-ms-transform: translateX(-30%);transform: translateX(-30%);'

    this.hideMenuDiv = this.document.createElement('div')

    this.hideMenuDiv.appendChild(this.hideMenuButton)
    this.hideMenuDiv.style.cssText = hideMenuDivStyle

    return this.hideMenuDiv
  }

  createHideMenuButton (): HTMLButtonElement {
    const hideMenuButton = this.document.createElement('button')
    hideMenuButton.className = 'foo-button mdc-button'
    hideMenuButton.innerHTML = '<div class="mdc-button__ripple"><span id="hidden-text" class="mdc-button__label">Hide Menu</span></div>'
    hideMenuButton.addEventListener('click', (evt) => { this.onClick(this.menuBarUIHandler, evt) })
    return hideMenuButton
  }

  onClick (menuBarUIHandler: MenuBarUIHandler, event: Event): void {
    const onOffTextSpan = this.document.getElementById('hidden-text') as HTMLSpanElement

    const menuHidden = this.menuBarUIHandler.menuBarDiv.style.visibility === 'hidden'

    if (!menuHidden) {
      menuBarUIHandler.showMenuBar(false)
    } else {
      menuBarUIHandler.showMenuBar(true)
      menuBarUIHandler.showLastClickedDiv()
    }
    const onOffText = !menuHidden ? 'Show Menu' : 'Hide Menu'
    onOffTextSpan.textContent = onOffText
  }
}
