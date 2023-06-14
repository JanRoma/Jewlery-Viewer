import * as THREE from 'three'
import { Texture, type WebGLRenderer } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export class TextureDatabase {
  textures: Map<string, Texture>

  constructor (renderer: WebGLRenderer) {
    this.textures = new Map<string, Texture>()
    const generator = new THREE.PMREMGenerator(renderer)

    new RGBELoader().load('img/industrial_sunset_02_puresky_1k.hdr', (hdrmap) => {
      const envmap = generator.fromEquirectangular(hdrmap)
      this.textures.set('hdi', envmap.texture)
      this.textures.set('none', new Texture())
      this.textures.set('cube', new THREE.CubeTextureLoader().load(['img/cube/px.png', 'img/cube/nx.png', 'img/cube/py.png', 'img/cube/ny.png', 'img/cube/pz.png', 'img/cube/nz.png']))
    })
  }

  changeTexture (textureName: string, object: THREE.Mesh): void {
    if (this.textures.get(textureName) !== null) {
      (object.material as THREE.MeshStandardMaterial).envMap = this.textures.get(textureName) as Texture
    }
  }
}
