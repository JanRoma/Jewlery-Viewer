<script>
  import { createEventDispatcher } from 'svelte';

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
  {#each sceneEntries as {title, id} }
  <div id="{id}">
    <button id="{id}Button" class="submenuButton"><span class="material-icons expandIcon">expand</span>{title}</button>
  </div>
    
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
    width:16em;
}

#submenuHeader{
  color: #fff;
}

.submenuButton{
  width:100%;
  text-align: left;
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  background: #333;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}


.submenuButton:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}

.expandIcon{
  font-size: small;
  margin-right: 1em;
}
</style>