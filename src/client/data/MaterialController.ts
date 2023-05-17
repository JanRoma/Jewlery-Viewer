import { type Mesh, MeshPhysicalMaterial, type Object3D, type Texture } from 'three'
import { type ColorSet } from './ColorSet'
import * as THREE from 'three'
import { type TextureDatabase } from '../fileHandling/TextureDatabase'

export class MaterialController {
  sapphireMaterial: MeshPhysicalMaterial
  emeraldMaterial: MeshPhysicalMaterial
  goldMaterial: MeshPhysicalMaterial
  silverMaterial: MeshPhysicalMaterial

  envTexture: Texture
  envTextureName: string

  colorController: ColorSet

  constructor (colorController: ColorSet, textureDatabase: TextureDatabase) {
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
    this.envTextureName = 'hdi'
    this.envTexture = textureDatabase.textures.get(this.envTextureName) as Texture

    console.log(this.envTexture)
    this.goldMaterial = new MeshPhysicalMaterial({
      color: this.colorController.goldColor,
      roughness: 0.1,
      metalness: 0.6,
      envMap: this.envTexture
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
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping
    imgTexture.anisotropy = 16
    return imgTexture
  }

  changeMetalEnvMap (envMap: Texture, envMapName: string): void {
    this.envTextureName = envMapName

    this.envTexture = envMap
    this.goldMaterial.envMap = envMap
    this.silverMaterial.envMap = envMap
  }

  changeGemEnvMap (envMap: Texture, envMapName: string): void {
    this.envTextureName = envMapName
    this.envTexture = envMap
    this.sapphireMaterial.envMap = envMap
    this.emeraldMaterial.envMap = envMap
  }

  changeToEmerald (object: Object3D): void {
    this.changeGem(object, this.emeraldMaterial)
  }

  changeToSapphire (object: Object3D): void {
    this.changeGem(object, this.sapphireMaterial)
  }

  changeGem (object: Object3D, material: MeshPhysicalMaterial): void {
    console.dir(object)
    object.children.forEach(element => {
      if (element.name.startsWith('Gem')) {
        (element as Mesh).material = material
      }
    })
  }

  changeToSilver (object: Object3D): void {
    this.changeMetal(object, this.silverMaterial)
  }

  changeToGold (object: Object3D): void {
    this.changeMetal(object, this.goldMaterial)
  }

  changeMetal (object: Object3D, material: MeshPhysicalMaterial): void {
    console.dir(object)
    object.children.forEach(element => {
      if (element.name.startsWith('Metal')) {
        (element as Mesh).material = material
      }
    })
  }
}
