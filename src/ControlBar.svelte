<script lang="ts">
  import { onMount } from "svelte";
  import type { AppState } from "./AppState";
  
  export let appState : AppState;

  type NavigationButton = {
      icon: string,
      title: string,
      onClick: Function
  }

  let navs: Array<NavigationButton> = []

  onMount(() => {
    navs = [
      {
        icon: "refresh",
        title: "Auto Rotate",
        onClick: appState.rotationUIHandler.rotationController.changeRotation.bind({orbitControls: appState.rotationUIHandler.rotationController.orbitControls}),
      },
      {
        icon: "photo_camera",
        title: "Take Screenshot",
        onClick: () => {console.log( "screenshot")},
      }
    ]
  });
  
</script>

<nav class="div-primary-color">
  <div class="w3-bar">
      {#each navs as { title, icon, onClick}, i}
      <div class="w3-bar-item">
          <button class="foo-button mdc-button tooltip" title={title} on:click={() => {onClick()}} data-text={title}><span class="material-icons">{icon}</span></button>
      </div>
      {/each}
  </div>
</nav>

<style>

.mdc-button{
  color: #ddd !important;
}
.mdc-button:hover{
  color: #fff !important;
}
  nav {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
  .w3-bar{
    overflow: visible;
  }

  .w3-bar-item {
    padding: 4px 2px !important;
  }

  .tooltip {
  position:relative; /* making the .tooltip span a container for the tooltip text */
  border-bottom:1px dashed #000; /* little indicater to indicate it's hoverable */
  } 

.tooltip:before {
  content: attr(data-text); /* here's the magic */
  position:absolute;
  
  /* vertically center */
  /* move to right */
  bottom: 100%;
  margin-left: 10%;
  
  /* basic styles */
  width:15em;
  padding:10px;
  border-radius:10px;
  font-size: x-small;
  background:#000;
  color: #fff;
  text-align:center;

  display:none; /* hide by default */
}

.tooltip:hover:before {
  display:block;
}


</style>