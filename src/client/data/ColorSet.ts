import { Color } from 'three'

export class ColorSet {
  sapphireColor: Color
  emeraldColor: Color
  goldColor: Color
  silverColor: Color

  constructor () {
    this.emeraldColor = new Color(0x50c878)
    this.sapphireColor = new Color(0x0f52ba)
    this.goldColor = new Color(0xffcc88)
    this.silverColor = new Color(0xc0c0c0)
  }
}
