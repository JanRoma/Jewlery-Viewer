import { Color, Mesh, MeshPhongMaterial } from "three"

export class LastClickedObject {
   
        objectLoaded : boolean
        object: Mesh
        originalColor : Color

        constructor(){
            this.objectLoaded = false
            this.object = new Mesh()
            this.originalColor = new Color(0xffffff)
        }

        resetPickedObject(){
            this.objectLoaded = false
            this.object = new Mesh()
            this.originalColor = new Color(0xffffff)
        }

        pickObject(object : Mesh){
            this.objectLoaded = true
            this.object = object
            this.originalColor = (object.material as MeshPhongMaterial).color;
            (this.object.material as MeshPhongMaterial).color = new Color(0xff00ff)
        }
}