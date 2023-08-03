
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let near : number = 0

  function onInput() : void {
    appState.sceneProperties.camera.near = near
    appState.sceneProperties.camera.updateProjectionMatrix()
  }

</script>

<div class="container">
  <div class="label">Min Near:</div>
  <input type='number' class="inputField" bind:value={near} on:input={onInput} min="-10" max="10"/>
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
    width: 70%;
  }
  </style>