<script lang="ts">
  import { onMount } from "svelte";
  import type { NavigationButton } from "../types";
  export let showSceneMenu : Function;
  export let showPickingMenu : Function;
  export let showViewerMenu : Function;

  let navs: Array<NavigationButton> = []

  onMount(() => {
   navs = [
    {
      title: "Viewer",
      onClick: showViewerMenu,
    },
    {
      title: "Picking",
      onClick: showPickingMenu,    
    },
    {
      title: "Scene",
      onClick: showSceneMenu,
    },
    {
      title: "Anti-aliasing",
      onClick: () => {},
    },
    {
      title: "Post processing",
      onClick: () => {},
    },
    {
      title: "Export",
      onClick: () => {},
    },
    {
      title: "Animations",
      onClick: () => {},
    },
    {
      title: "Modifiers",
      onClick: () => {},
    },
    {
      title: "Configurators",
      onClick: () => {},
    },
    {
      title: "Plugins",
      onClick: () => {},
    },
    {
      title: "Extras",
      onClick: () => {},
    },
  ];

  });
</script>

<div class="container">
  <nav>
    <div class="itemsContainer">
        {#each navs as { title, onClick }}
        <div>
            <button {title} on:click={() => {onClick()}}>{title}</button>
          </div>
        {/each}
    </div>
  </nav>
</div>

<style>
  button{
    background-color: transparent;
    color: #ddd;
    border: none;
  }

  button:hover{
    color: #fff;
  }

  .container{
    position: absolute;
    width: 100%;
    top: 5em;
  }

  nav {
    padding: 0.5em;
    background-color: #343a40;
    color: white;
    margin: auto;
    width:70rem;
  }

  .itemsContainer {
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    margin: 0;
    margin-left: auto;
    list-style: none;
    font-size: 1em;
  }
  li {
    margin-right: 20px;
  }
  h1 {
    margin: 0;
    font-size: 1.3em;
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: #aaa;
  }
  .logo {
    color: white;
  }
  .active {
    color: white;
  }
</style>