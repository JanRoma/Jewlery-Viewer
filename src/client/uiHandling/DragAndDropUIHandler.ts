import { type LoadingManager } from 'three'
import { type ApplicationProperties } from '../properties/ApplicationProperties'
import { type ModelLoader } from '../fileHandling/ModelLoader'

export class DragAndDropUIHandler {
  dropZoneAdded: boolean
  loadingManager: LoadingManager
  appProperties: ApplicationProperties
  document: Document
  dropZoneDiv!: HTMLDivElement
  modelLoader: ModelLoader

  constructor (document: Document, loadingManager: LoadingManager, appProperties: ApplicationProperties, modelLoader: ModelLoader) {
    this.dropZoneAdded = false
    this.loadingManager = loadingManager
    this.appProperties = appProperties
    this.document = document
    this.modelLoader = modelLoader
    this.dropZoneDiv = this.createDragAndDropDiv()
  }

  createDragAndDropDiv (): HTMLDivElement {
    if (this.dropZoneAdded) return this.dropZoneDiv
    if (document.readyState === 'complete') {
      this.dropZoneDiv = this.createAndReturnDropZoneDiv()

      this.dropZoneDiv.addEventListener('dragover', this.dragOverHandler, false)
      this.dropZoneDiv.addEventListener('drop', this.dropHandler, false)
      this.dropZoneDiv.addEventListener('click', this.onClick, false)
    }
    return this.dropZoneDiv
  }

  onClick (ev: Event): void {
    console.log('CLICKED!!')
    ev.preventDefault()
  }

  dragOverHandler (ev: DragEvent): void {
    console.log('File(s) in drop zone')
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
  }

  dropHandler (ev: DragEvent): void {
    console.log('File(s) dropped')
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
    const file: File = ev.dataTransfer?.files[0] as File
    this.modelLoader.loadGLTFModelFromFile(file, this.loadingManager, this.appProperties)

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

  createAndReturnDropZoneDiv (): HTMLDivElement {
    const dragAndDropStyle = 'border: 5px solid #ffaaaa;width: 200px;height: 100px;position: absolute;bottom: 20px;left:50%;-webkit-transform: translateX(-50%);-ms-transform: translateX(-50%);transform: translateX(-50%);'

    const dndDiv = document.createElement('div')
    dndDiv.innerHTML = '<p>Drag one or more files to this <i>drop zone</i>.</p>'
    dndDiv.style.cssText = dragAndDropStyle
    return dndDiv
  }
}
