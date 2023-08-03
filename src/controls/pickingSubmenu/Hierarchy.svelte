
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
    import { children, onMount } from "svelte/internal";
    import { Group, Object3D } from "three";

  let appState : AppState = getContext('appState')  
  
  function onChange(uuid: string) : void {
     let child : Object3D 
     let children : Group
     children = appState.sceneProperties.mainObject as Group
     child = children.getObjectByProperty('uuid', uuid)
     child.visible = !child.visible
  }

</script>

<div class="container">
  <div class="label">Scene:</div>
  <div>
    {#each appState.sceneProperties.scene.children as child}
    <div>
        <p><b>{child.type}<br></b></p>
        {#if child.children.length != 0}
        {#each child.children as child2}
          <p>{child2.name}<input type="checkbox" on:change={()=>{onChange(child2.uuid)}}  /></p>
        {/each}
        {/if}
      </div>
    {/each}
  </div>

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