import { LoadingManager } from "three";
import { ApplicationProperties } from "../ApplicationProperties";
import { ModelLoadingUtils } from "./ModelLoadingUtils";

export class DragAndDropFileHandler{
    dropZoneAdded : boolean
    loadingManager: LoadingManager
    appProperties: ApplicationProperties
    document: Document

    constructor(document: Document, loadingManager : LoadingManager, appProperties : ApplicationProperties){
        this.dropZoneAdded = false
        this.loadingManager = loadingManager
        this.appProperties = appProperties
        this.document = document
    }
    // Drag and Drop handling  - prototype
     SetDragAndDropZone(){
        if (this.dropZoneAdded) return
        if (document.readyState === "complete") {
            const dropZone = this.createDnDDiv()

            dropZone.addEventListener('dragover', this.dragOverHandler, false);
            dropZone.addEventListener('drop', this.dropHandler, false)
            dropZone.addEventListener('click', this.onClick, false)
        }
    }
  
    onClick(ev: Event){
        console.log('CLICKED!!')
        ev.preventDefault();

    }

    dragOverHandler(ev: DragEvent) {
        console.log('File(s) in drop zone');
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }
    
    dropHandler(ev : DragEvent) {
        console.log('File(s) dropped');
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
        const file : File = ev.dataTransfer?.files[0] as File
        ModelLoadingUtils.loadGLTFModelFromFile(file, this.loadingManager, this.appProperties)
    
        console.log(ev.dataTransfer?.files[0])
        // if (ev.dataTransfer.items) {
        //   // Use DataTransferItemList interface to access the file(s)
        //   [...ev.dataTransfer.items].forEach((item, i) => {
        //     // If dropped items aren't files, reject them
        //     if (item.kind === 'file') {
        //       const file = item.getAsFile();
        //       console.log(`… file[${i}].name = ${file.name}`);
        //     }
        //   });
        // } else {
        //   // Use DataTransfer interface to access the file(s)
        //   [...ev.dataTransfer.files].forEach((file, i) => {
        //     console.log(`… file[${i}].name = ${file.name}`);
        //   });
        // }
    }

    createDnDDiv(){
        const dragAndDropStyle = 'border: 5px solid #ffaaaa;width: 200px;height: 100px;position: absolute;bottom: 20px;left:50%;-webkit-transform: translateX(-50%);-ms-transform: translateX(-50%);transform: translateX(-50%);'

        const dndDiv = document.createElement('div')
        dndDiv.innerHTML = '<p>Drag one or more files to this <i>drop zone</i>.</p>'
        dndDiv.style.cssText = dragAndDropStyle

        document.body.appendChild(dndDiv)
        return dndDiv
    }

    
 
}