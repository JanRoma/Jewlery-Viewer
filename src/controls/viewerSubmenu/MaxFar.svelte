
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let far : number = 0

  function onInput() : void {
    appState.sceneProperties.camera.far =far
    appState.sceneProperties.camera.updateProjectionMatrix()
    console.log(appState.sceneProperties.camera.far)
  }

</script>

<div class="container">
  <div class="label">Max Far:</div>
  <input type='number' class="inputField" bind:value={far} on:input={onInput} min="-10" max="10"/>
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