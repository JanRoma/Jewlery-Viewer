
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";

  let appState : AppState = getContext('appState')  
  let activeChecked : boolean = true
  let focusChecked : boolean = false


  function onActiveChange() : void {
    let objectPicker = appState.sceneProperties.objectPicker
    objectPicker.enabled = activeChecked ? false : true    
    if(!objectPicker.enabled){
      objectPicker.deselectAllObjects()
    }
  }

  function onFocusChange() : void {
    appState.sceneProperties.objectPicker.autoFocus = appState.sceneProperties.objectPicker.autoFocus  ? false : true
  }


</script>

<div class="container">
  <div class="label">Active:</div>
  <input type="checkbox" on:change={onActiveChange} bind:checked={activeChecked}  />
</div>
<div class="container">
  <div class="label">Auto Focus:</div>
  <input type="checkbox" on:change={onFocusChange} bind:checked={focusChecked}  />
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