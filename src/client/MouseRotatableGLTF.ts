import * as THREE from 'three'
import { MeshStandardMaterial } from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class MouseRotatableGLTF extends THREE.Mesh{
    mouseDown : boolean
    mouseX : number
    mouseY : number

    model : THREE.Group
    isModelLoaded = false
    
    constructor(canvas:HTMLCanvasElement) {
        super()
        this.mouseDown = false
        this.mouseY = 0
        this.mouseX = 0
        this.model = new THREE.Group()
        const loader = new GLTFLoader()

        const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
        loader.load(
            'models/decorated_ring/scene.gltf',
                (gltf) => {
                gltf.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                        m.receiveShadow = true
                        m.castShadow = true;
                        // Setting environmental map so the object is not dark
                        (m.material as MeshStandardMaterial).envMap = envTexture;
                    }
                    if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                        l.shadow.mapSize.height = 2048
                    }
                })
                this.model = gltf.scene
                gltf.scene.getObjectByName
                // console.log("MODEL:")
                // console.dir(this.model)
                this.isModelLoaded = true
                // console.log("loaded:")
                // console.dir(this.isModelLoaded)
                this.addMouseHandler(canvas, this.model)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
        return this
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

    onMouseMove(object: THREE.Group, evt : MouseEvent) {
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
    
    addMouseHandler(canvas : HTMLCanvasElement, object : THREE.Group) {
        const ormh = this
        canvas.addEventListener('mousemove', function (e) {
            ormh.onMouseMove(object, e);
            // console.log("Mouse Move")
        }, false);
        canvas.addEventListener('mousedown', function (e) {
            ormh.onMouseDown(e);
            // console.log("Mouse Down")
        }, false);
        canvas.addEventListener('mouseup', function (e) {
            ormh.onMouseUp(e);
            // console.log("Mouse Up")
        }, false);
    }
}

function rotateObject(object: THREE.Group, deltaX : number, deltaY : number) {
    object.rotation.y += deltaX / 100;
    object.rotation.x += deltaY / 100;
    // console.log("Rotating")
}
