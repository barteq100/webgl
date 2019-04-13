import {Matrix4} from "./matrix4";
import {Vector3} from "./vector3";

export class Vector4 {

    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    multiplyByMatrix(matrix: Matrix4) {
        return new Vector4(
            matrix.n11 * this.x + matrix.n12 * this.y + matrix.n13 * this.z + matrix.n14 * this.w,
            matrix.n21 * this.x + matrix.n22 * this.y + matrix.n23 * this.z + matrix.n24 * this.w,
            matrix.n31 * this.x + matrix.n32 * this.y + matrix.n33 * this.z + matrix.n34 * this.w,
            matrix.n41 * this.x + matrix.n42 * this.y + matrix.n43 * this.z + matrix.n44 * this.w
        );
    }

    toVector3(){
        return new Vector3(this.x, this.y, this.z);
    }
}