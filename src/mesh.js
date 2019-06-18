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
        this.primitiveType = this.gl.TRIANGLES;
        this.drawCount = this.geometry.positions.length / 3;
    }

    get Geometry(){
        return this.geometry;
    }

    set Geometry(newGeometry: Geometry){
        this.geometry = newGeometry;
        this.drawCount = this.geometry.positions.length / 3;
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
        // const indentyCheck = new Matrix4().multiply(this.camera.modelMatrix).multiply(this.camera.ViewMatrix);
        // const p1 = new Vector4(0.5, 0.5, 0, 1).multiplyByMatrix(new Matrix4().multiply(this.modelMatrix).multiply(this.camera.ViewMatrix).multiply(this.camera.ProjectionMatrix));
        this.material.render(this, this.camera);
    }
}