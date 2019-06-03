import {BasicObject} from "./basic-object";
import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector3} from "./vector3";

export class Mesh extends BasicObject {
    constructor(gl: WebGLRenderingContext, camera: PerspectiveCamera) {
        super(gl);
        this.camera = camera;
        this.gl = gl;
        this.geometry = new Geometry(gl);
    }

    get Geometry(){
        return this.geometry;
    }

    set Geometry(newGeometry: Geometry){
        this.geometry = newGeometry;
    }

    set VerticesColor(color: Vector4) {
        this.geometry.color = color;
    }

    get Position() {
        return this._position;
    }

    set Position(newPosition: Vector3) {
        super.Position = newPosition;
    }

    render() {
        this.material.render(this.geometry.positionsBuffer, this.geometry.colorsBuffer,
            this.camera.cameraMatrix.toTransposedFloat32List(), this.modelMatrix.toTransposedFloat32List(),
            this.camera.ViewMatrix.toTransposedFloat32List(), this.camera.ProjectionMatrix.toFloat32List());
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = this.geometry.positions.length / 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }
}