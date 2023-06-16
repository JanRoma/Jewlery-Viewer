import { BackSide, Color, EdgesGeometry, LineSegments, Mesh, MeshBasicMaterial, type MeshPhongMaterial } from 'three'
import type { SceneProperties } from '../properties/SceneProperties'

export class LastClickedObject {
  objectLoaded: boolean
  object: Mesh

  constructor () {
    this.objectLoaded = false
    this.object = new Mesh()
  }

  removePickedObject (): void {
    this.objectLoaded = false
    this.object = new Mesh()
  }

  setObjectNotPicked (sceneProperties: SceneProperties): void {
    this.removePickedObject()
    sceneProperties.scene.remove( sceneProperties.objectOutline );
  }

  pickNewObject (object: Mesh, sceneProperties: SceneProperties): void {
    this.objectLoaded = true
    this.object = object
    object.traverse( function ( node ) {
      let geometry = (node as Mesh).geometry
      const edges = new EdgesGeometry( geometry ); 
      const line = new LineSegments(edges, new MeshBasicMaterial( { color: 0xff0000 } ) ); 
      line.scale.set(0.1,0.1,0.1)
      sceneProperties.objectOutline = line
      sceneProperties.scene.add( sceneProperties.objectOutline );
     });
  }
}
