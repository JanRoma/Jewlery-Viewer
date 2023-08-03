<script lang="ts">
  import { runEnvironment, initializeAppState } from "./client";
  import Navbar from "./controls/Navbar.svelte";
  import ControlBar from './controls/ControlBar.svelte';
  import ProgressCircle from "./controls/ProgressCircle.svelte";
  import type { AppState } from './types';
  import SceneMenu from "./controls/sceneSubmenu/SceneMenu.svelte";
  import PickingMenu from "./controls/pickingSubmenu/PickingMenu.svelte";
  import { setContext } from 'svelte'
  import Notifications from 'svelte-notifications';
  import DragAndDrop from "./controls/DragAndDrop.svelte";
    import ViewerMenu from "./controls/viewerSubmenu/ViewerMenu.svelte";

  let appState: AppState;
  let sceneMenu: SceneMenu
  let pickingMenu: PickingMenu
  let viewerMenu: ViewerMenu
  let dnd: DragAndDrop

  appState = initializeAppState()
  runEnvironment(appState)

  setContext('appState', appState)

  function showDnd() {
    dnd.show()
  }
  
  function showSceneMenu(){
    pickingMenu.hide()
    viewerMenu.hide()
    sceneMenu.show()
  }

  function showPickingMenu(){
    sceneMenu.hide()
    viewerMenu.hide()
    pickingMenu.show()
  }

  function showViewerMenu(){
    sceneMenu.hide()
    pickingMenu.hide()
    viewerMenu.show()
  }
</script>


<Notifications>
  <main>
    <SceneMenu bind:this={sceneMenu}></SceneMenu>
    <PickingMenu bind:this={pickingMenu}></PickingMenu>
    <ViewerMenu bind:this={viewerMenu}></ViewerMenu>
    <Navbar showSceneMenu={showSceneMenu} showPickingMenu={showPickingMenu} showViewerMenu={showViewerMenu}></Navbar>
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