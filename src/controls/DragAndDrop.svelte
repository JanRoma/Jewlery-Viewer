<script lang="ts">
  import { createEventDispatcher, getContext, onMount } from "svelte";
  const { addNotification } = getNotificationsContext();
  import { getNotificationsContext } from 'svelte-notifications';
  import type { AppState } from "../types";

  let dndDiv: HTMLDivElement;
  let shown = false;

  export let appState : AppState = getContext('appState')

  let dispatch = createEventDispatcher();

  export function show() {
    if(dndDiv.style.visibility == 'visible'){
      dndDiv.style.visibility = 'hidden'
    }
    else {
      dndDiv.style.visibility = 'visible'
    }
    dispatch('show', shown);
  }

  function onClick (ev: Event): void {
    show()
    ev.preventDefault()
  }

  function dragOverHandler (ev: DragEvent): void {
    console.log('File(s) in drop zone')
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
  }

  function dropHandler (ev: DragEvent): void {
    console.log('File(s) dropped')
    ev.preventDefault()
    const file: File = ev.dataTransfer?.files[0] as File

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          var urlPath = window.webkitURL.createObjectURL(file);

          if(file.type === "model/obj"){
            console.log('webkitpath')
            console.log(file.webkitRelativePath)
            dndDiv.style.visibility = 'hidden'
            appState.modelController.modelLoader.loadOBJModelFromFileBrowser(urlPath)
            addNotification({
              text: 'Model properly loaded',
              position: 'bottom-center',
              type: 'success',
              removeAfter: 3000,
            })
          } else {
            addNotification({
              text: 'File should be of type OBJ',
              position: 'bottom-center',
              type: 'warning',
              removeAfter: 3000,
            })
          }
        } else {
          addNotification({
              text: 'Dropped object must be the file',
              position: 'bottom-center',
              type: 'warning',
              removeAfter: 3000,
            })
        }
      });
    } 
  }

  onMount(() => {
      dndDiv.addEventListener('dragover', dragOverHandler, false)
      dndDiv.addEventListener('drop', dropHandler, false)
  })
</script>

  <div bind:this={dndDiv} id="draganddrop">
    <button class="close" on:click={onClick}><span class="material-icons">close</span></button>
    <div class="dndDecription">
      <p>Drag one or more files to this <i>drop zone</i>.</p>
    </div>
  </div>

<style>
#draganddrop {
  background-color: white !important;
  position: absolute;
  bottom: 50%;
  left: 50%;
  margin-bottom: -10em;
  margin-left: -10em;
  width: 20em;
  height: 20em;
  background-color: transparent;
  text-align: center;
  padding: 10px;
  visibility: hidden;
  border-style: dotted dashed solid double;
  display: flex;
  flex-direction: column;
  align-items:end;
}
.close{
  position: relative;
  width:3em;
  outline:none;
  background-color: transparent;
  border-color: transparent;
  justify-content: flex-end;
}

.dndDecription{
  margin: auto;

}
</style>
