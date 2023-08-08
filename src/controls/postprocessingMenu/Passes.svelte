

<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
  import * as THREE from 'three'
    import { MaskPass } from "three/examples/jsm/postprocessing/MaskPass.js";
    import type { Pass } from "three/examples/jsm/postprocessing/Pass";
    import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
    import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
    import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
    import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
    import { ClearPass } from "three/examples/jsm/postprocessing/ClearPass.js";
    import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
    import { HalftonePass, type HalftonePassParameters } from "three/examples/jsm/postprocessing/HalftonePass.js";

  let appState : AppState = getContext('appState')  
  let selected : {id: number, type: Pass, text: string}

  let halftoneParams : HalftonePassParameters
  
  let glitchPass = new GlitchPass()
  let passes = [
		{ id: 0, type: null , text: 'None' },
		{ id: 1, type: new AfterimagePass() , text: 'AfterimagePass' },
		{ id: 2, type: new BloomPass() , text: 'BloomPass' },
    { id: 3, type:  glitchPass, text: 'GlitchPass' },
    { id: 4, type: new FilmPass() , text: 'FilmPass' },
    { id: 5, type: new ClearPass() , text: 'ClearPass' },
    { id: 6, type: new DotScreenPass() , text: 'DotScreenPass' },
    { id: 7, type: new HalftonePass(100,100, halftoneParams) , text: 'HalftonePass' },
	];

  function onChange() : void {
    console.log('selected')
    console.log(selected)
    console.dir(appState.sceneProperties.composer.passes)
    passes.forEach(element => {
      if(element.id!==0) appState.sceneProperties.composer.removePass(element.type)
    });
    console.log('deletion')
    console.dir(appState.sceneProperties.composer.passes)
    if(selected.id===0) return;
    appState.sceneProperties.composer.addPass(selected.type)

  }

</script>

<div class="container">
  <div class="label">Passes:</div>
  <select bind:value={selected} on:change={onChange}>
		{#each passes as tone}
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