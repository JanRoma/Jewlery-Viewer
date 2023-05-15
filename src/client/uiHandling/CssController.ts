import { Color } from 'three'
import { type ColorSet } from '../data/ColorSet'

export class CssController {
  sapphireColor: Color
  emeraldColor: Color
  goldColor: Color
  silverColor: Color
  backgroundColor: Color
  colorChgangingDivsWidth: number
  colorController: ColorSet

  constructor (colorController: ColorSet) {
    this.emeraldColor = colorController.emeraldColor
    this.sapphireColor = colorController.sapphireColor
    this.goldColor = colorController.goldColor
    this.silverColor = colorController.silverColor
    this.backgroundColor = new Color(0xffffff)
    this.colorChgangingDivsWidth = 200
    this.colorController = colorController
  }

  returnDivLabelStyle (): string {
    return 'font-size: 15px;display: block; position: absolute; bottom:55px;'
  }

  returnMetalDivStyle (): string {
    return this.returnDivStyle(85)
  }

  returnGemDivStyle (): string {
    return this.returnDivStyle(75)
  }

  returnModelDivStyle (): string {
    return this.returnDivStyle(95)
  }

  returnDivStyle (top: number): string {
    return `
    background-color: #${this.backgroundColor.getHexString()};
    background:rgba(255,255,255,0.5);
    width: ${this.colorChgangingDivsWidth}px;
    height: 36px;
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

  returnSilverButtonStyle (): string {
    return `color: #${this.colorController.silverColor.getHexString()};display:inline-block;vertical-align:bottom;`
  }

  returnGoldButtonStyle (): string {
    return `color: #${this.colorController.goldColor.getHexString()};display:inline-block;vertical-align:bottom;`
  }
}
