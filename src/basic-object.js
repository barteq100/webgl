import {Vector3} from "./vector3";
import {Geometry} from "./geometry";
import {Matrix4} from "./matrix4";
import {Material} from "./material";
import {Vector4} from "./vector4";

export class BasicObject {

    constructor(gl) {
        this.gl = gl;
        this.material = new Material(gl);
        this._position = new Vector3(0, 0 ,0);
        this._rotation = new Vector3(0, 0, 0);
        this._scale = new Vector3(1,1,1);
        this.geometry = new Geometry();
        this.modelMatrix = new Matrix4();
        this.recalculateModelMatrix();
    }

    set Position(newPosition: Vector3){
        this._position = newPosition;
        this.recalculateModelMatrix();
    }

    get Position() {
        return this._position;
    }

    set Rotation(newRotation: Vector3) {
        this._rotation = newRotation;
        this.recalculateModelMatrix();
    }

    get Rotation() {
        return this._rotation;
    }

    set Scale(newScaling: Vector3) {
        this._scale = newScaling;
        this.recalculateModelMatrix();
    }

    get Scale() {
        return this._scale;
    }

    get Geometry(){
        return this.geometry;
    }

    set Geometry(newGeometry: Geometry){
        this.geometry = newGeometry;
        this.material.geometry = this.geometry;
    }

    set Color(color: Vector4) {
        this.material.color = color;
    }

    get ModelMatrix() {
        return this.modelMatrix;
    }

    recalculateModelMatrix(){
        const translation = Matrix4.getTranslation(this._position);
        const rotation = Matrix4.getRotation(this._rotation);
        const scale = Matrix4.getScaling(this._scale);
        this.modelMatrix = Matrix4.multiplyMatrices(scale, rotation).multiply(translation);
    }

    render() {
        this.material.render();
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }
}
