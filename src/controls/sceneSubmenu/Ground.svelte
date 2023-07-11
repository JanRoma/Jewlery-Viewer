
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let checked : boolean = false

  function onChange() : void {
    appState.sceneProperties.sceneMeshes[appState.sceneProperties.groundIndex].visible = checked ? false : true    
  }

</script>

<div class="container">
  <div class="label">Visible:</div>
  <input type="checkbox" on:change={onChange} bind:checked={checked}  />
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
  
  </style>