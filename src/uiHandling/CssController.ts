import { Color } from 'three'
import { type ColorSet } from '../data/ColorSet'

export class CssController {
  sapphireColor: Color
  emeraldColor: Color
  goldColor: Color
  silverColor: Color
  backgroundColor: Color
  colorChangingDivsWidth: number
  colorController: ColorSet
  iconsColor: Color

  constructor (colorController: ColorSet) {
    this.emeraldColor = colorController.emeraldColor
    this.sapphireColor = colorController.sapphireColor
    this.goldColor = colorController.goldColor
    this.silverColor = colorController.silverColor
    this.backgroundColor = new Color(0xffffff)
    this.iconsColor = new Color(0x778877)
    this.colorChangingDivsWidth = 220
    this.colorController = colorController
  }

  returnDivLabelStyle (): string {
    return 'font-size: 15px;display: block; position: absolute; bottom:55px;'
  }

  returnMetalDivStyle (): string {
    return this.returnDivStyle(75)
  }

  returnGemDivStyle (): string {
    return this.returnDivStyle(75)
  }

  returnModelDivStyle (): string {
    return this.returnDivStyle(75)
  }

  returnMenuBarDivStyle (): string {
    return this.returnDivStyle(85)
  }

  returnDivStyle (top: number): string {
    return `
    background-color: #${this.backgroundColor.getHexString()};
    background:rgba(255,255,255,0.5);
    width: ${this.colorChangingDivsWidth}px;
    height: 50px;
    position: absolute;
    top: ${top}%;
    left: 50%;
    transform: translate(-50%, -${top}%);
    border-radius: 25px;
    text-align:center;
    display: flex;
    justify-content: center;
    `
  }

  returnIconLabelButton (icon: string, label: string): string {
    return `<span class="material-icons">${icon}</span><span class="mdc-button__label button-text">${label}</span>`
  }

  returnIconsStyle (): string {
    return `color: #${this.iconsColor.getHexString()};`
  }

  returnSilverButtonStyle (): string {
    return `color: #${this.colorController.silverColor.getHexString()};`
  }

  returnGoldButtonStyle (): string {
    return `color: #${this.colorController.goldColor.getHexString()};`
  }

  returnMenuBarButtonsStyle (): string {
    return `color: #${this.colorController.goldColor.getHexString()};`
  }

  returnMenuBarButtonsClassName (): string {
    return 'mdc-button button-with-text mdc-ripple-surface'
  }
}
