import type { SceneProperties } from "../properties/SceneProperties";

export class ScreenshotController {
  sceneProperties: SceneProperties
  constructor(sceneProperties: SceneProperties){
    this.sceneProperties = sceneProperties
  }

  takeScreenshot() {

    var w = window.open('', '');
    w.document.title = "Screenshot";
    var img = new Image();

    // to-do think if the preserveDrawingBuffer should be added
    // Without 'preserveDrawingBuffer' set to true, we must render now

    this.sceneProperties.renderer.render(this.sceneProperties.scene, this.sceneProperties.camera);
    img.src = this.sceneProperties.renderer.domElement.toDataURL();
    var button = document.createElement("BUTTON");
    button.textContent = "Save image"
    var saveLinkDiv = document.createElement('div')
    var saveLink = document.createElement('a'); 
    saveLink.href = img.src; 
    saveLink.download = 'canvas.png'; 

    saveLink.appendChild(button);
    saveLinkDiv.appendChild(saveLink)

    w.document.body.appendChild(saveLinkDiv);
    w.document.body.appendChild(img);  
  
  }
}