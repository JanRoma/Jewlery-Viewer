<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type { AppState } from "../types";
    import { TextureLoader } from "three";

	let  avatar, fileinput : HTMLInputElement;
  const appState : AppState = getContext('appState')

	const onFileSelected =(e)=>{
    console.log('file')
    if(e.target.files[0] !=null){
      let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                avatar = e.target.result

                const userImageURL = URL.createObjectURL(image)
                const loader = new TextureLoader().setCrossOrigin('')
                const texture = loader.load(userImageURL)

                appState.sceneProperties.scene.background = texture

            };
    }
  }
    onMount(() => {
      //resetting set image, so it can be loaded multiple times in a row
      fileinput.onclick = function () {
            fileinput.value = null;
          };
    })
	
</script>
<div class="container">
  <div class="label">BG Image:</div>
  <button class="upload" on:click={()=>{fileinput.click();}} >Pick Image</button>
  <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>{onFileSelected(e)}} bind:this={fileinput} >
  {#if avatar}
  <img class="avatar" src="{avatar}" alt="d"on:click={()=>{fileinput.click();}}/>
  {:else}
  <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"  alt="" on:click={()=>{fileinput.click();}}/> 
  {/if}
</div>
<style>

.avatar{
  width: 3em;
  height: 3em;
}
	.container{
  display: flex;
  flex-direction:row;
  align-items: center;
}

.label {
  display: block;
  text-align: left;
  width: 30%;
}
.upload{
  background-color: transparent;
  color: #ddd;
}
</style>

 