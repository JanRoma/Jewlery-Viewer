<script lang="ts">
  var exports = {};

  import { onMount } from 'svelte';
  import { runEnvironment, initializeAppState } from "./client";
  import Navbar from "./Navbar.svelte";
  import ControlBar from './ControlBar.svelte';
    import type { AppState } from './AppState';

  let canvas : HTMLCanvasElement;
  let appState: AppState;
  appState = initializeAppState(canvas)
    runEnvironment(appState)
  onMount(() => {
    
  });
   
</script>

<canvas bind:this={canvas}></canvas>

<main>
  <Navbar></Navbar>
  <ControlBar appState={appState}></ControlBar>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>