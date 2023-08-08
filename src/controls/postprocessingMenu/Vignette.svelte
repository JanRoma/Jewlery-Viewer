<script lang="ts">
  import { getContext } from "svelte";
  import type { AppState } from "../../types";
    import THREE, { Fog, Vector2 } from "three";
    import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

  let appState : AppState = getContext('appState')  
  let activeChecked : boolean = false
  let minFog: number
  let maxFog: number


  function onActiveChange() : void {
    console.log(activeChecked)
    console.dir(appState.sceneProperties.scene.fog)

    var vignette = new ShaderPass(THREE.VignetteShader);
    vignette.uniforms[ "resolution" ].value = new Vector2( window.innerWidth, window.innerHeight );
    vignette.uniforms[ "horizontal" ].value = true; // default is false
    vignette.uniforms[ "radius" ].value = .8; // default is 0.75
    vignette.uniforms[ "softness" ].value = .3; // default is 0.3
    vignette.uniforms[ "gain" ].value = .3; // default is 0.9

    appState.sceneProperties.composer.addPass(vignette)

    // if(activeChecked){
    //   appState.sceneProperties.scene.fog = new Fog( 0xcccccc, 10, 30 );
    // }
    // else
    // {
    //   appState.sceneProperties.scene.fog = null
    // }

  }

  function onForceChange() : void {

    // appState.sceneProperties.scene.fog = new Fog()
  }

  function onMaxChange() : void {

}

</script>

<div class="container">
  <div class="label">Vignette:</div>
  <input type="checkbox" on:change={onActiveChange} bind:checked={activeChecked}  />
</div>
<div class="container">
  <div class="label">Vignette force:</div>
  <input type="number" on:change={onForceChange} bind:value={minFog}  />
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