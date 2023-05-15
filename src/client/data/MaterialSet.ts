import { MeshPhysicalMaterial, type Texture } from 'three'
import { type ColorSet } from './ColorSet'
import * as THREE from 'three'

export class MaterialSet {
  sapphireMaterial: MeshPhysicalMaterial
  emeraldMaterial: MeshPhysicalMaterial
  goldMaterial: MeshPhysicalMaterial
  silverMaterial: MeshPhysicalMaterial

  envTexture: Texture

  colorController: ColorSet

  constructor (colorController: ColorSet) {
    this.colorController = colorController

    const emeraldMaterial = new MeshPhysicalMaterial({
      color: this.colorController.emeraldColor,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.99
    })

    const sapphireMaterial = new MeshPhysicalMaterial({
      color: this.colorController.sapphireColor,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.99
    })

    this.emeraldMaterial = emeraldMaterial
    this.sapphireMaterial = sapphireMaterial
    this.envTexture = this.loadTexture()

    this.goldMaterial = new MeshPhysicalMaterial({
      color: this.colorController.goldColor,
      roughness: 0.1,
      metalness: 0.6

    })

    this.silverMaterial = new MeshPhysicalMaterial({
      color: this.colorController.silverColor,
      roughness: 0.1,
      metalness: 0.6,
      envMap: this.envTexture
    })
  }

  loadTexture (): THREE.Texture {
    const imgTexture = new THREE.CubeTextureLoader().setPath('img/SCM/')
      .load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
      ])
    // imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
    imgTexture.anisotropy = 16
    return imgTexture
  }
}
