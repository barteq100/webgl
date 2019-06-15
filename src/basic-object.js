import {Vector3} from "./vector3";
import {Matrix4} from "./matrix4";
import {Vector4} from "./vector4";
import {BasicMaterial} from "./basic-material.interface";

export class BasicObject {

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.material = new BasicMaterial(gl);
        this._position = new Vector3(0, 0 ,0);
        this._rotation = new Vector3(0, 0, 0);
        this._color = new Vector4(0, 0, 0, 1);
        this._scale = new Vector3(1,1,1);
        this.modelMatrix = new Matrix4();
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

    set Color(color: Vector4) {
        this._color = color;
    }

    get ModelMatrix() {
        return this.modelMatrix;
    }

    recalculateModelMatrix(){
        const translation = Matrix4.getTranslation(this._position);
        const rotationX = Matrix4.getRotationX(this._rotation.x);
        const rotationY = Matrix4.getRotationY(this._rotation.y);
        const rotationZ = Matrix4.getRotationZ(this._rotation.z);
        const scale = Matrix4.getScaling(this._scale);
        const rotation= rotationX.multiply(rotationY).multiply(rotationZ);
        this.modelMatrix = scale.multiply(rotation).multiply(translation);

    }

    lookAt(target: Vector3, up: Vector3) {
        const zAxis = Vector3.Sub(this._position, target).Normalize();
        const xAxis = Vector3.Cross(up, zAxis).Normalize();
        const yAxis = Vector3.Cross(zAxis, xAxis).Normalize();
        this.modelMatrix.n11 = xAxis.x;
        this.modelMatrix.n12 = xAxis.y;
        this.modelMatrix.n13 = xAxis.z;
        this.modelMatrix.n14 = 0;
        this.modelMatrix.n21 = yAxis.x;
        this.modelMatrix.n22 = yAxis.y;
        this.modelMatrix.n23 = yAxis.z;
        this.modelMatrix.n24 = 0;
        this.modelMatrix.n31 = zAxis.x;
        this.modelMatrix.n32 = zAxis.y;
        this.modelMatrix.n33 = zAxis.z;
        this.modelMatrix.n34 = 0;
        this.modelMatrix.n41 = this._position.x;
        this.modelMatrix.n42 = this._position.y;
        this.modelMatrix.n43 = this._position.z;
        this.modelMatrix.n44 = 1;
    }

}
