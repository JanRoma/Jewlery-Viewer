import type { LoadingManager } from "three"
import type { ApplicationProperties } from "./properties/ApplicationProperties"
import type { SceneProperties } from "./properties/SceneProperties"
import type { ColorSet } from "./data/ColorSet"
import type { TextureDatabase } from "./fileHandling/TextureDatabase"
import { MaterialController } from "./data/MaterialController"
import { GemController } from "./model/GemController"
import { MenuBarController } from "./model/MenuBarController"
import { MetalController } from "./model/MetalController"
import { ModelController } from "./model/ModelController"
import type { CssController } from "./uiHandling/CssController"
import { DragAndDropUIHandler } from "./uiHandling/DragAndDropUIHandler"
import { GUIHandler } from "./uiHandling/GUIHandler"
import { GemUIHandler } from "./uiHandling/GemChangeUIHandler"
import { HideMenuUIHandler } from "./uiHandling/HideMenuUIHandler"
import { MenuBarUIHandler } from "./uiHandling/MenuBarUIHandler"
import { MetalUIHandler } from "./uiHandling/MetalChangeUIHandler"
import { ModelUIHandler } from "./uiHandling/ModelChangeUIHandler"
import { RotationUIHandler } from "./uiHandling/RotationUIHandler"
import { UIHandler } from "./uiHandling/UIHandler"
import type { ModelLoader } from "./fileHandling/ModelLoader"
import type { ScreenshotController } from "./fileHandling/ScreenshotController"

export type AppState = {
  appProperties: ApplicationProperties,
  loadingManager: LoadingManager,
  sceneProperties: SceneProperties,  
  colorSet: ColorSet,
  cssController:  CssController,
  textureDatabase: TextureDatabase,
  materialController: MaterialController
  metalController: MetalController
  gemController: GemController
  guiHandler: GUIHandler
  modelLoader: ModelLoader
  
  modelController: ModelController
  
  rotationUIHandler: RotationUIHandler
  metalUIHandler: MetalUIHandler
  gemUIHandler: GemUIHandler
  modelUIHandler: ModelUIHandler
  
  dndHandler: DragAndDropUIHandler
  
  menuBarController: MenuBarController
  menuBarUIHandler: MenuBarUIHandler
  hideMenuUIHandler: HideMenuUIHandler
  
  uiHandler: UIHandler

  screenshotController: ScreenshotController
}