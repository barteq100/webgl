import {Vector3} from "./vector3";
import {Matrix4} from "./matrix4";
import {Vector4} from "./vector4";
import {BasicMaterial} from "./basic-material.interface";

export class BasicObject {
   protected _childs: BasicObject[];
   protected _parent: BasicObject;
   protected _position: Vector3;
   protected _rotation: Vector3;
   protected _color: Vector4;
   protected _scale: Vector3;
   protected modelMatrix: Matrix4;

    constructor(protected gl: WebGLRenderingContext) {
        this.gl = gl;
        this._position = new Vector3(0, 0, 0);
        this._rotation = new Vector3(0, 0, 0);
        this._color = new Vector4(0, 0, 0, 1);
        this._scale = new Vector3(1, 1, 1);
        this.modelMatrix = new Matrix4();
        this._childs = [];
    }

    public set Parent(parent: BasicObject){
        this._parent = parent;
        this._parent.addChild(this);
        this.recalculateModelMatrix();
    }

    public addChild(child: BasicObject) {
        this._childs.push(child);
        child._parent = this;
        child.recalculateModelMatrix();
    }

    public removeChild(child: BasicObject) {
       this._childs =  this._childs.filter(v => v !== child);
       child._parent = null;
       child.recalculateModelMatrix();
    }

    public set Position(newPosition: Vector3) {
        this._position = newPosition;
        this.recalculateModelMatrix();
    }

    public get Position() {
        return this._position;
    }

    public set Rotation(newRotation: Vector3) {
        this._rotation = newRotation;
        this.recalculateModelMatrix();
    }

    public get Rotation() {
        return this._rotation;
    }

    public set Scale(newScaling: Vector3) {
        this._scale = newScaling;
        this.recalculateModelMatrix();
    }

    public get Scale() {
        return this._scale;
    }

    public set Color(color: Vector4) {
        this._color = color;
    }

    public get ModelMatrix() {
        return this.modelMatrix;
    }

    public recalculateModelMatrix() {
        const translation = Matrix4.getTranslation(this._position);
        const rotationX = Matrix4.getRotationX(this._rotation.x);
        const rotationY = Matrix4.getRotationY(this._rotation.y);
        const rotationZ = Matrix4.getRotationZ(this._rotation.z);
        const scale = Matrix4.getScaling(this._scale);
        const rotation = rotationX.multiply(rotationY).multiply(rotationZ);
        const parentMatrix = this._parent ? this._parent.ModelMatrix : new Matrix4();
        this.modelMatrix = Matrix4.multiplyMatrices(scale.multiply(rotation).multiply(translation), parentMatrix);
        for(const c of this._childs){
            c.recalculateModelMatrix();
        }
    }

    public lookAt(target: Vector3, up: Vector3) {
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
