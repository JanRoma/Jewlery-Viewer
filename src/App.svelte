<script lang="ts">
  import { runEnvironment, initializeAppState } from "./client";
  import Navbar from "./controls/Navbar.svelte";
  import ControlBar from './controls/ControlBar.svelte';
  import ProgressCircle from "./controls/ProgressCircle.svelte";
  import type { AppState } from './types';
  import SceneMenu from "./controls/sceneSubmenu/SceneMenu.svelte";
  import { setContext } from 'svelte'
  import Notifications from 'svelte-notifications';
  import DragAndDrop from "./controls/DragAndDrop.svelte";

  let appState: AppState;
  let sceneMenu: SceneMenu
  let dnd: DragAndDrop

  appState = initializeAppState()
  runEnvironment(appState)

  setContext('appState', appState)

  function showDnd() {
    dnd.show()
  }
  
  function showSceneMenu(){
    sceneMenu.show()
  }
</script>


<Notifications>
  <main>
    <SceneMenu bind:this={sceneMenu}></SceneMenu>
    <Navbar showSceneMenu={showSceneMenu} ></Navbar>
    <ControlBar showDnd={showDnd}></ControlBar>
    <ProgressCircle></ProgressCircle>
    <DragAndDrop bind:this={dnd}></DragAndDrop>
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