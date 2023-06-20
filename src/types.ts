import type { SceneProperties } from "./properties/SceneProperties"
import type { ColorSet } from "./data/ColorSet"
import type { TextureDatabase } from "./fileHandling/TextureDatabase"
import { MaterialController } from "./data/MaterialController"
import { GemController } from "./model/GemController"
import { MenuBarController } from "./model/MenuBarController"
import { MetalController } from "./model/MetalController"
import { ModelController } from "./model/ModelController"
import type { ModelLoader } from "./fileHandling/ModelLoader"
import type { ScreenshotController } from "./fileHandling/ScreenshotController"
import type { RotationController } from "./model/RotationController"

export type AppState = {
  sceneProperties: SceneProperties,  
  colorSet: ColorSet,
  textureDatabase: TextureDatabase,
  materialController: MaterialController
  metalController: MetalController
  gemController: GemController
  modelLoader: ModelLoader

  rotationController: RotationController
  modelController: ModelController
  screenshotController: ScreenshotController
}


export type IconNavigationButton = {
  icon: string,
  title: string,
  onClick: Function
}

export type NavigationButton = {
  title: string,
  onClick: Function
}

