
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let x : number = 0
  let y: number = 0
  let z : number = 0

  function onXInput() : void {
    let target = appState.sceneProperties.orbitControls.target
    appState.sceneProperties.orbitControls.target.set(x, target.y, target.z)  
  }
  function onYInput() : void {
    let target = appState.sceneProperties.orbitControls.target
    appState.sceneProperties.orbitControls.target.set(target.x, y, target.z)  
  }
  function onZInput() : void {
    let target = appState.sceneProperties.orbitControls.target
    appState.sceneProperties.orbitControls.target.set(target.x, target.y, z)  
  }

</script>

<div class="container">
  <div class="label">Look at:</div>
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