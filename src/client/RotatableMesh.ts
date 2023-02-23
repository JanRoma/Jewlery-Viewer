import * as THREE from 'three'

export class RotatableMesh extends THREE.Mesh
{
    mouseDown : boolean
    mouseX : number
    mouseY : number
     // There is a problem with calling super if the traspilation from TS to JS is going under ES6
    constructor(geometry: THREE.BoxGeometry, material : THREE.Material , canvas : HTMLCanvasElement) {
        super(geometry, material)
        this.mouseDown = false
        this.mouseY = 0
        this.mouseX = 0
        this.addMouseHandler(canvas, this)
     }

    onMouseUp(evt : MouseEvent) {
        evt.preventDefault();
    
        this.mouseDown = false;
    }

    onMouseDown(evt : MouseEvent) {
        evt.preventDefault();
    
        this.mouseDown = true;
        this.mouseX = evt.clientX;
        this.mouseY = evt.clientY;
    }

    onMouseMove(object: THREE.Mesh, evt : MouseEvent) {
        if (!this.mouseDown) {
            return;
        }
    
        evt.preventDefault();
    
        var deltaX = evt.clientX - this.mouseX,
            deltaY = evt.clientY - this.mouseY;
        this.mouseX = evt.clientX;
        this.mouseY = evt.clientY;
        rotateObject(object, deltaX, deltaY);
    }
    
    addMouseHandler(canvas : HTMLCanvasElement, object : THREE.Mesh) {
        const ormh = this
        canvas.addEventListener('mousemove', function (e) {
            ormh.onMouseMove(object, e);
        }, false);
        canvas.addEventListener('mousedown', function (e) {
            ormh.onMouseDown(e);
        }, false);
        canvas.addEventListener('mouseup', function (e) {
            ormh.onMouseUp(e);
        }, false);
    }
}


function rotateObject(object: THREE.Object3D,deltaX : number, deltaY : number) {
    object.rotation.y += deltaX / 100;
    object.rotation.x += deltaY / 100;
}