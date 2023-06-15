<script lang="ts">
    import BackgroundColorPicker from "../controls/BackgroundColorPicker.svelte";
    import BackgroundImagePicker from "../controls/BackgroundImagePicker.svelte";
    export let id;
    export let title;

  function showSubmenuElement(name: string){
    let display: string = (document.getElementById(name) as HTMLDivElement).style.display;
    if(display == 'none' || !display){
      (document.getElementById(name) as HTMLDivElement).style.display = 'block'
    }
    else{
      (document.getElementById(name) as HTMLDivElement).style.display = 'none'
    }
  }

</script>

<div id="{id}">
  <button id="{id}Button" class="submenuButton" on:click={() => { showSubmenuElement(id+'Div') }}><span class="material-icons expandIcon">expand</span>{title}</button>
  <div class="submenuDiv" id='{id}Div'>
    <BackgroundColorPicker></BackgroundColorPicker>
    <hr style="padding-top: 0; margin-top:1em; margin-bottom:0; visibility:hidden;"/>
    <BackgroundImagePicker></BackgroundImagePicker>
    <hr style="padding-top: 0; margin-top:1em; margin-bottom:0; visibility:hidden;"/>

  </div>
</div>


<style>

.submenuDiv{
  display: none;
  color: #fff;
}

.submenuButton{
  width:100%;
  text-align: left;
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  background: #333;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}


.submenuButton:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}

.expandIcon{
  font-size: small;
  margin-right: 1em;
}
</style>