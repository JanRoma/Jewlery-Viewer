<script lang="ts">
  var exports = {};

  import { onMount } from 'svelte';
  import { runApp } from "./client";
  import Navbar from "./Navbar.svelte";

  let canvas;
  onMount(() => {
    console.log('abc')
    runApp()
  });
   
</script>

<canvas bind:this={canvas}></canvas>

<main>
  <Navbar></Navbar>
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