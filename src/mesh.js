import {BasicObject} from "./basic-object";
import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {PerspectiveCamera} from "./perspective-camera";
import {Matrix4} from "./matrix4";

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

    render() {
        const mvp = Matrix4.multiplyMatrices(this.modelMatrix, this.camera.ViewMatrix).multiply(this.camera.projectionMatrix).toTransposedFloat32List();
        this.material.render(this.geometry.positionsBuffer, this.geometry.colorsBuffer, mvp);
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }
}