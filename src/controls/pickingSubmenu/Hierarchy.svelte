
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
    import { children } from "svelte/internal";

  let appState : AppState = getContext('appState')  
  let activeChecked : boolean = true

  console.dir(appState.sceneProperties.scene.children)

  function onActiveChange() : void {
    let objectPicker = appState.sceneProperties.objectPicker
    objectPicker.enabled = activeChecked ? false : true    
    if(!objectPicker.enabled){
      objectPicker.deselectAllObjects()
    }
  }

</script>

<div class="container">
  <div class="label">Scene:</div>
  {#each appState.sceneProperties.scene.children as child}
        <div>
            <p><b>{child.type}<br></b></p>
            {#if child.children.length != 0}
            {#each child.children as child2}
              <p>{child2.name}</p>
            {/each}
            {/if}
          </div>
        {/each}
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