import * as THREE from 'three'
import { type Texture, type WebGLRenderer } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export class TextureDatabase {
  //
  textures: Map<string, Texture>

  constructor (renderer: WebGLRenderer) {
    this.textures = new Map<string, Texture>()
    this.textures.set('cube', new THREE.CubeTextureLoader().load(['img/px_50.png', 'img/nx_50.png', 'img/py_50.png', 'img/ny_50.png', 'img/pz_50.png', 'img/nz_50.png']))

    const generator = new THREE.PMREMGenerator(renderer)

    new RGBELoader().load('img/industrial_sunset_02_puresky_1k.hdr', (hdrmap) => {
      // ...
      const envmap = generator.fromEquirectangular(hdrmap)
      this.textures.set('hdi', envmap.texture)
    })
  }

  changeTexture (textureName: string, object: THREE.Mesh): void {
    if (this.textures.get(textureName) !== null) {
      (object.material as THREE.MeshStandardMaterial).envMap = this.textures.get(textureName) as Texture
    }
  }
}
