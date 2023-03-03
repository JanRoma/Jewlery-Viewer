import * as THREE from 'three'
import { type LoadingManager } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { type ApplicationProperties } from './properties/ApplicationProperties'
import { type SceneProperties } from './properties/SceneProperties'

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
    onMouseMove(e, appProperties)
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

function onMouseMove (evt: MouseEvent, appProperties: ApplicationProperties): void {
}
