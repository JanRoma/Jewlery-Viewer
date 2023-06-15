<script lang="ts">
  import { runEnvironment, initializeAppState } from "./client";
  import Navbar from "./Navbar.svelte";
  import ControlBar from './ControlBar.svelte';
  import ProgressCircle from "./ProgressCircle.svelte";
  import type { AppState } from './types';
  import SceneMenu from "./sceneSubmenu/SceneMenu.svelte";
  import { setContext } from 'svelte'

  let canvas : HTMLCanvasElement;
  let appState: AppState;

  appState = initializeAppState(canvas)
  runEnvironment(appState)

  setContext('appState', appState)
  
  let sceneMenu: SceneMenu; 

  function showSceneMenu(){
    sceneMenu.show()
  }
</script>

<canvas bind:this={canvas}></canvas>

<main>
  <SceneMenu bind:this={sceneMenu}></SceneMenu>
  <Navbar showSceneMenu={showSceneMenu} ></Navbar>
  <ControlBar></ControlBar>
  <ProgressCircle></ProgressCircle>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>