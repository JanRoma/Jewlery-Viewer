
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let x : number = 0
  let y: number = 0
  let z : number = 0

  function onXInput() : void {
    let camera = appState.sceneProperties.camera
    appState.sceneProperties.camera.position.set(x, camera.position.y, camera.position.z)  
  }
  function onYInput() : void {
    let camera = appState.sceneProperties.camera
    appState.sceneProperties.camera.position.set(camera.position.x, y, camera.position.z)  
  }
  function onZInput() : void {
    let camera = appState.sceneProperties.camera
    console.dir(camera.position)
    appState.sceneProperties.camera.position.set(camera.position.x, camera.position.y, z)  
    console.dir(camera.position)
  }

</script>

<div class="container">
  <div class="label">Position:</div>
  <input type='number' class="inputField" bind:value={x} on:input={onXInput} min="-10" max="10"/>
  <input type='number' class="inputField" bind:value={y} on:input={onYInput} min="-10" max="10"/>
  <input type='number' class="inputField" bind:value={z} on:input={onZInput} min="-10" max="10"/>
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