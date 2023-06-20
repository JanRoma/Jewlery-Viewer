<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import MenuItemExtended from './MenuItemExtended.svelte';
  import SceneBackground from './SceneBackground.svelte';
  
  let shown = false;
  let dispatch = createEventDispatcher();

  export function show() {
      shown = !shown;
      dispatch('show', shown);
  }

  let sceneEntries = [
    {
      title: 'Background',
      id: 'background',
      component: SceneBackground
    },
    {
      title: 'Progressive Shadow',
      id: 'progressiveShadow',
    },
    {
      title: 'Ground',
      id: 'ground',
    },
    {
      title: 'Scene Objects',
      id: 'scene',
    },
    {
      title: 'Lights',
      id: 'lights',
    },
    {
      title: 'Cameras',
      id: 'cameras',
    },
    {
      title: 'HDRi Ground',
      id: 'hdriGround',
    }
    
  ]
</script>

{#if shown}
<div class="overflowContainer">
<div id="sceneSubmenuContainer">
  <div id="submenuHeader">Configuration</div>
  {#each sceneEntries as {title, id, component} }
    <MenuItemExtended title={title} id={id} component={component}></MenuItemExtended>
  {/each}
</div>
</div>
{/if}

<style>
#sceneSubmenuContainer {
  background-color: #333;
  margin-right: 1em;;
}

.overflowContainer{
  position: fixed;
    top: 10em;
    padding-right: 4px;
    padding-bottom: 10px;
    right: 10px;
    width: var(--tweakpane-ui-container-width);
    height: auto;
    overflow-y: scroll;
    z-index: 100;
    pointer-events: auto;
    max-height: calc(100% - 6rem);
    border-radius: 0.5rem;
    font-size: small;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    width:24em;
}

#submenuHeader{
  color: #fff;
  
}
</style>