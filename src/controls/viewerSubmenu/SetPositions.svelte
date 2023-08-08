
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
  import type { PerspectiveCamera } from "three";
  let x : number
  let y : number
  let z : number

  let appState : AppState = getContext('appState')  
  x = appState.sceneProperties.camera.position.x
  y = appState.sceneProperties.camera.position.y
  z = appState.sceneProperties.camera.position.z

  appState.sceneProperties.orbitControls.addEventListener( 'change', updateValues );
  function updateValues(){
    x = appState.sceneProperties.camera.position.x
    y = appState.sceneProperties.camera.position.y
    z = appState.sceneProperties.camera.position.z
  }

  function onLeftClick(){
    let left = appState.sceneProperties.cameraLeftPosition
    appState.sceneProperties.camera.position.set(left.x, left.y, left.z)
  }

  function onRightClick(){
    let right = appState.sceneProperties.cameraRightPosition
    appState.sceneProperties.camera.position.set(right.x, right.y, right.z)
  }

  function onFrontClick(){
    let front = appState.sceneProperties.cameraFrontPosition
    appState.sceneProperties.camera.position.set(front.x, front.y, front.z)
  }

  function onResetClick(){
    let zero = appState.sceneProperties.cameraZeroPosition
    appState.sceneProperties.camera.position.set(zero.x, zero.y, zero.z)
  }

</script>

<div class="container">
  <div class="label">Set Position:</div>
  <button on:click={onLeftClick}>Left</button>
  <button on:click={onRightClick}>Right</button>
  <button on:click={onFrontClick}>Front</button>
  <button on:click={onResetClick}>Reset</button>
</div>
  
  <style>
  .label{
    width: 30%;
  }
  .container{
    display: flex;
    flex-direction:row;
  }
  
  .label {
    display: block;
    text-align: left;
  }
  .inputField{
    width: 23%;
  }
  </style>