import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { type LoadingManager } from 'three'
import { type OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { type ApplicationProperties } from './ApplicationProperties'
import { type SceneProperties } from './SceneProperties'

export function addGUI (object: THREE.Group, controls: OrbitControls): void {
  const gui = new GUI()
  const ringFolder = gui.addFolder('Ring')
  ringFolder.add(object.rotation, 'x', 0, Math.PI * 2)
  ringFolder.add(object.rotation, 'y', 0, Math.PI * 2)
  ringFolder.add(object.rotation, 'z', 0, Math.PI * 2)
  ringFolder.open()
  const autoRotateFolder = gui.addFolder('Auto Rotate')
  autoRotateFolder.add(controls, 'autoRotate').listen()
  autoRotateFolder.open()
}

export function returnLoadingManager (loadProgressDiv: HTMLDivElement): LoadingManager {
  const manager = new THREE.LoadingManager()

  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    loadProgressDiv.style.visibility = 'visible'
  }

  manager.onLoad = function () {
    console.log('Loading complete!')
    loadProgressDiv.style.visibility = 'hidden'
  }

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  }

  manager.onError = function (url) {
    console.log('There was an error loading ' + url)
  }

  return manager
}

export function addMouseHandler (envProperties: SceneProperties, appProperties: ApplicationProperties): void {
  envProperties.renderer.domElement.addEventListener('mousemove', function (e) {
    onMouseMove(e, appProperties, envProperties.controls)
  }, false)
  envProperties.renderer.domElement.addEventListener('mousedown', function (e) {
    onMouseDown(e, appProperties)
  }, false)
  envProperties.renderer.domElement.addEventListener('mouseup', function (e) {
    onMouseUp(e, appProperties)
  }, false)
}

export function addStats (): Stats {
  const stats = Stats()
  document.body.appendChild(stats.dom)
  return stats
}

function onMouseUp (evt: MouseEvent, appProperties: ApplicationProperties): void {
  appProperties.mouseDown = false
}

function onMouseDown (evt: MouseEvent, appProperties: ApplicationProperties): void {
  appProperties.mouseDown = true
}

function onMouseMove (evt: MouseEvent, appProperties: ApplicationProperties, controls: OrbitControls): void {
  if (!appProperties.mouseDown) {
    return
  }
  controls.autoRotate = false
}
