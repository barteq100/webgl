import {Matrix4} from "./matrix4";
import {Vector3} from "./vector3";
import {BasicObject} from "./basic-object";

export class PerspectiveCamera extends BasicObject{
    constructor(gl: WebGLRenderingContext, fov: number, aspect: number, near: number, far: number) {
        super(gl);
        this._perspective = Matrix4.perspective(fov, aspect, near, far);
        this._cameraMatrix = this._perspective;
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
        this._viewProjectionMatrix = Matrix4.multiplyMatrices(this._cameraMatrix, this._viewMatrix);
    }

    set Position(position: Vector3) {
        super.Position = position;
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
        this._viewProjectionMatrix = Matrix4.multiplyMatrices(this._cameraMatrix, this._viewMatrix);
    }

    set Rotation(rotation: Vector3) {
        super.Rotation = rotation;
        this._viewMatrix = Matrix4.getInverseMatrix4(this.modelMatrix);
        this._viewProjectionMatrix = Matrix4.multiplyMatrices(this._cameraMatrix, this._viewMatrix);
    }

    get cameraMatrix(): Matrix4 {
        return this._cameraMatrix;
    }

    get projectionMatrix(): Matrix4 {
        return this._perspective;
    }

    get ViewMatrix(): Matrix4 {
        return this._viewMatrix;
    }

    get ViewProjectionMatrix(): Matrix4 {
        return this._viewProjectionMatrix;
    }
}