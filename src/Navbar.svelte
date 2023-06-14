<script lang="ts">
  import { onMount } from "svelte";

  import SceneMenu from "./SceneMenu.svelte";

  export let showSceneMenu : Function;
  
  type NavigationButton = {
      title: string,
      onClick: Function
  }

  let navs: Array<NavigationButton> = []

  onMount(() => {
   navs = [
    {
      title: "Viewer",
      onClick: () => {},
    },
    {
      title: "Picking",
      onClick: () => {},    
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

<nav>
  <div class="container">

      {#each navs as { title, onClick }}
      <div>
          <button {title} on:click={() => {onClick()}}>{title}</button>
        </div>

      {/each}
  </div>
</nav>

<style>
button{
  background-color: transparent;
  color: #ddd;
  border: none;
}

button:hover{
  color: #fff;
}

  nav {
    padding: 0.5em;
    background-color: #343a40;
    color: white;
    position: absolute;
    top: 50px;
    margin: auto;
  }

  .container {
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