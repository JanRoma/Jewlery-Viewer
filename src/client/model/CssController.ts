import { Color } from 'three'

export class CssController {
  sapphireColor: Color
  emeraldColor: Color
  goldColor: Color
  silverColor: Color
  backgroundColor: Color
  colorChgangingDivsWidth: number

  constructor () {
    this.emeraldColor = new Color(0x50c878)
    this.sapphireColor = new Color(0x0f52ba)
    this.goldColor = new Color(0xffcc88)
    this.silverColor = new Color(0xc0c0c0)
    this.backgroundColor = new Color(0xffffff)
    this.colorChgangingDivsWidth = 200
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

  returnDivStyle (top: number): string {
    return `
    background-color: #${this.backgroundColor.getHexString()};
    background:rgba(255,255,255,0.5);
    width: ${this.colorChgangingDivsWidth}px;
    height: 36px;
    position: absolute;
    top: ${top}%;
    left: 50%;
    transform: translate(-50%, -90%);
    border-radius: 25px;
    text-align:center;
    display: flex;
    justify-content: center;
    `
  }

  returnSilverButtonStyle (): string {
    return `color: #${this.silverColor.getHexString()};display:inline-block;vertical-align:bottom;`
  }

  returnGoldButtonStyle (): string {
    return `color: #${this.goldColor.getHexString()};display:inline-block;vertical-align:bottom;`
  }
}
