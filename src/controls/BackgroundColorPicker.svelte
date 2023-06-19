<script lang="ts">
	import ColorPicker, { type RgbaColor } from 'svelte-awesome-color-picker';
    import type { AppState } from '../types';
    import { getContext } from 'svelte'

    import { Color } from 'three';

	let rgb : RgbaColor; // or hsv or hex

  const appState : AppState = getContext('appState')

  function getRGBString(){
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`
  }
</script>

<div class="container">
<div class="label">Color:</div>
<ColorPicker bind:rgb disableCloseClickOutside={true} hex="#ffffff" on:input={() => {appState.sceneProperties.scene.background = new Color(getRGBString())}}/>
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