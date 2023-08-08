<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
    import { Fog } from "three";

  let appState : AppState = getContext('appState')  
  let activeChecked : boolean = false
  let minFog: number
  let maxFog: number


  function onActiveChange() : void {
    console.log(activeChecked)
    console.dir(appState.sceneProperties.scene.fog)
    if(!activeChecked){
      appState.sceneProperties.scene.fog = new Fog( 0xcccccc, 1, 10 );
    }
    else
    {
      appState.sceneProperties.scene.fog = null
    }
  }

  function onMinChange() : void {

    // appState.sceneProperties.scene.fog = new Fog()
  }

  function onMaxChange() : void {

}

</script>

<div class="container">
  <div class="label">Fog:</div>
  <input type="checkbox" on:change={onActiveChange} bind:checked={activeChecked}  />
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