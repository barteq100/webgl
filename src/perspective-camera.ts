import {Matrix4} from "./matrix4";
import {Vector3} from "./vector3";
import {BasicObject} from "./basic-object";

export class PerspectiveCamera extends BasicObject{
    private _projection: Matrix4;
    private _viewMatrix: Matrix4;

    constructor(gl: WebGLRenderingContext, fov: number, aspect: number, near: number, far: number) {
        super(gl);
        this._projection = Matrix4.perspective(fov, aspect, near, far);
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
    }

    public set Position(position: Vector3) {
        // @ts-ignore
        super.Position = position;
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
    }

    public set Rotation(rotation: Vector3) {
        // @ts-ignore
        super.Rotation = rotation;
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
    }

    public get cameraMatrix(): Matrix4 {
        return this.modelMatrix;
    }

    public get ProjectionMatrix(): Matrix4 {
        return this._projection;
    }

    public get ViewMatrix(): Matrix4 {
        return this._viewMatrix;
    }

    public lookAt(target: Vector3, up: Vector3) {
        super.lookAt(target, up);
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
    }

}