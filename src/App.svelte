<script lang="ts">
  import { runEnvironment, initializeAppState } from "./client";
  import Navbar from "./controls/Navbar.svelte";
  import ControlBar from './controls/ControlBar.svelte';
  import ProgressCircle from "./controls/ProgressCircle.svelte";
  import type { AppState } from './types';
  import SceneMenu from "./controls/sceneSubmenu/SceneMenu.svelte";
  import { setContext } from 'svelte'
  import Notifications from 'svelte-notifications';


  let appState: AppState;
  appState = initializeAppState()
  runEnvironment(appState)

  setContext('appState', appState)
  
  let sceneMenu: SceneMenu; 

  function showSceneMenu(){
    sceneMenu.show()
  }
</script>

<Notifications>
  <main>
    <SceneMenu bind:this={sceneMenu}></SceneMenu>
    <Navbar showSceneMenu={showSceneMenu} ></Navbar>
    <ControlBar></ControlBar>
    <ProgressCircle></ProgressCircle>
  </main>
</Notifications>

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