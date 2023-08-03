
<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
  import * as THREE from 'three'

  let appState : AppState = getContext('appState')  
  let selected : {id: THREE.ToneMapping, text: string}
  let answer: string = ''

  let tones = [
		{ id: THREE.NoToneMapping , text: 'NoToneMapping' },
		{ id: THREE.LinearToneMapping , text: 'LinearToneMapping' },
    { id: THREE.ReinhardToneMapping, text: 'ReinhardToneMapping' },
    { id: THREE.CineonToneMapping , text: 'CineonToneMapping' },
    { id: THREE.ACESFilmicToneMapping, text: 'ACESFilmicToneMapping'},
    { id: THREE.CustomToneMapping , text: 'CustomToneMapping' },
	];

  function onChange() : void {
    console.log('selected')
    console.log(selected)
    appState.sceneProperties.renderer.toneMapping =  selected.id
  }

</script>

<div class="container">
  <div class="label">Tone Mapping:</div>
  <select bind:value={selected} on:change={onChange}>
		{#each tones as tone}
			<option value={tone}>
				{tone.text}
			</option>
		{/each}
	</select>
</div>
  
  <style>
  .label{
    width: 30%;
  }
  .container{
    display: flex;
    flex-direction:row;
  }
  
  .label {
    display: block;
    text-align: left;
  }
  
  </style>