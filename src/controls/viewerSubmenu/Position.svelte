
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
    console.log('value.changed')
  }

  function onChangeX(){
    appState.sceneProperties.camera.position.x = x
  }

  function onChangeY(){
    appState.sceneProperties.camera.position.y = y
  }

  function onChangeZ(){
    appState.sceneProperties.camera.position.z = z
  }

</script>

<div class="container">
  <div class="label">Position:</div>
  <input type='number' class="inputField" bind:value={x} on:change={onChangeX} min="-100" max="100"/>
  <input type='number' class="inputField" bind:value={y} on:change={onChangeY}  min="-100" max="100"/>
  <input type='number' class="inputField" bind:value={z} on:change={onChangeZ} min="-100" max="100"/>
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