import {Vector3} from "./vector3";
import {Quaternion} from "./quaternion";

//ROW MAJOR
export class Matrix4 {
    public n11: number;
    public n12: number;
    public n13: number;
    public n14: number;
    public n21: number;
    public n22: number;
    public n23: number;
    public n24: number;
    public n31: number;
    public n32: number;
    public n33: number;
    public n34: number;
    public n41: number;
    public n42: number;
    public n43: number;
    public n44: number;

    constructor() {
        this.n11 = 1;
        this.n12 = 0;
        this.n13 = 0;
        this.n14 = 0;
        this.n21 = 0;
        this.n22 = 1;
        this.n23 = 0;
        this.n24 = 0;
        this.n31 = 0;
        this.n32 = 0;
        this.n33 = 1;
        this.n34 = 0;
        this.n41 = 0;
        this.n42 = 0;
        this.n43 = 0;
        this.n44 = 1;
    }

    public static getIdentity(): Matrix4 {
        return new Matrix4();
    }

    public static getScaling(scale: Vector3): Matrix4 {
        const scalingMatrix = new Matrix4();
        scalingMatrix.n11 = scale.x;
        scalingMatrix.n22 = scale.y;
        scalingMatrix.n33 = scale.z;
        return scalingMatrix;
    }

    public static getTranslation(vector: Vector3): Matrix4 {
        const translationMatrix = new Matrix4();
        translationMatrix.n41 = vector.x;
        translationMatrix.n42 = vector.y;
        translationMatrix.n43 = vector.z;
        return translationMatrix;
    }

    public translate(vector: Vector3): Matrix4 {
        const m = Matrix4.getTranslation(vector);
        return this.multiply(m);
    }

    public static getRotationX(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n22 = cos;
        rotationMatrix.n23 = sin;
        rotationMatrix.n32 = -sin;
        rotationMatrix.n33 = cos;
        return rotationMatrix;
    }

    public static getRotationY(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos;
        rotationMatrix.n13 = -sin;
        rotationMatrix.n31 = sin;
        rotationMatrix.n33 = cos;
        return rotationMatrix;
    }

    public static getRotationZ(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos;
        rotationMatrix.n12 = sin;
        rotationMatrix.n21 = -sin;
        rotationMatrix.n22 = cos;
        return rotationMatrix;
    }

    public static getRotation(vector: Vector3): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cosX = Math.cos(vector.x);
        const sinX = Math.sin(vector.x);
        const cosY = Math.cos(vector.y);
        const sinY = Math.sin(vector.y);
        const cosZ = Math.cos(vector.z);
        const sinZ = Math.sin(vector.z);
        rotationMatrix.n11 = cosX * cosY * cosZ - sinX * sinZ;
        rotationMatrix.n12 = -cosX * cosY * sinZ - sinX * cosZ;
        rotationMatrix.n13 = cosX * sinY;
        rotationMatrix.n21 = sinX * cosY * cosZ + cosX * sinZ;
        rotationMatrix.n22 = -sinX * cosY * sinZ + cosX * cosZ;
        rotationMatrix.n23 = sinX * sinY;
        rotationMatrix.n31 = -sinY * cosZ;
        rotationMatrix.n32 = sinY * sinZ;
        rotationMatrix.n33 = cosY;
        return rotationMatrix;
    }

    //ROW MAJOR
    public static multiplyMatrices(m1: Matrix4, m2: Matrix4) {
        const multiplied = new Matrix4();
        multiplied.n11 = m1.n11 * m2.n11 + m1.n12 * m2.n21 + m1.n13 * m2.n31 + m1.n14 * m2.n41;
        multiplied.n12 = m1.n11 * m2.n12 + m1.n12 * m2.n22 + m1.n13 * m2.n32 + m1.n14 * m2.n42;
        multiplied.n13 = m1.n11 * m2.n13 + m1.n12 * m2.n23 + m1.n13 * m2.n33 + m1.n14 * m2.n43;
        multiplied.n14 = m1.n11 * m2.n14 + m1.n12 * m2.n24 + m1.n13 * m2.n34 + m1.n14 * m2.n44;
        multiplied.n21 = m1.n21 * m2.n11 + m1.n22 * m2.n21 + m1.n23 * m2.n31 + m1.n24 * m2.n41;
        multiplied.n22 = m1.n21 * m2.n12 + m1.n22 * m2.n22 + m1.n23 * m2.n32 + m1.n24 * m2.n42;
        multiplied.n23 = m1.n21 * m2.n13 + m1.n22 * m2.n23 + m1.n23 * m2.n33 + m1.n24 * m2.n43;
        multiplied.n24 = m1.n21 * m2.n14 + m1.n22 * m2.n24 + m1.n23 * m2.n34 + m1.n24 * m2.n44;
        multiplied.n31 = m1.n31 * m2.n11 + m1.n32 * m2.n21 + m1.n33 * m2.n31 + m1.n34 * m2.n41;
        multiplied.n32 = m1.n31 * m2.n12 + m1.n32 * m2.n22 + m1.n33 * m2.n32 + m1.n34 * m2.n42;
        multiplied.n33 = m1.n31 * m2.n13 + m1.n32 * m2.n23 + m1.n33 * m2.n33 + m1.n34 * m2.n43;
        multiplied.n34 = m1.n31 * m2.n14 + m1.n32 * m2.n24 + m1.n33 * m2.n34 + m1.n34 * m2.n44;
        multiplied.n41 = m1.n41 * m2.n11 + m1.n42 * m2.n21 + m1.n43 * m2.n31 + m1.n44 * m2.n41;
        multiplied.n42 = m1.n41 * m2.n12 + m1.n42 * m2.n22 + m1.n43 * m2.n32 + m1.n44 * m2.n42;
        multiplied.n43 = m1.n41 * m2.n13 + m1.n42 * m2.n23 + m1.n43 * m2.n33 + m1.n44 * m2.n43;
        multiplied.n44 = m1.n41 * m2.n14 + m1.n42 * m2.n24 + m1.n43 * m2.n34 + m1.n44 * m2.n44;
        return multiplied;
    }

    public static fromQuaternion(quaternion: Quaternion, position?: Vector3): Matrix4 {
        var x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;
        if (!position) {
            position = new Vector3(0, 0, 0);
        }
        const te = new Matrix4();
        te.n11 = (1 - (yy + zz));
        te.n12 = (xy + wz);
        te.n13 = (xz - wy);
        te.n14 = 0;

        te.n21 = (xy - wz);
        te.n22 = (1 - (xx + zz));
        te.n23 = (yz + wx);
        te.n24 = 0;

        te.n31 = (xz + wy);
        te.n32 = (yz - wx);
        te.n33 = (1 - (xx + yy));
        te.n34 = 0;

        te.n41 = position.x;
        te.n42 = position.y;
        te.n43 = position.z;
        te.n44 = 1;

        return te;
    }

    public multiply(m: Matrix4): Matrix4 {
        const multiplied = Matrix4.multiplyMatrices(this, m);
        this.n11 = multiplied.n11;
        this.n12 = multiplied.n12;
        this.n13 = multiplied.n13;
        this.n14 = multiplied.n14;
        this.n21 = multiplied.n21;
        this.n22 = multiplied.n22;
        this.n23 = multiplied.n23;
        this.n24 = multiplied.n24;
        this.n31 = multiplied.n31;
        this.n32 = multiplied.n32;
        this.n33 = multiplied.n33;
        this.n34 = multiplied.n34;
        this.n41 = multiplied.n41;
        this.n42 = multiplied.n42;
        this.n43 = multiplied.n43;
        this.n44 = multiplied.n44;
        return this;
    }

    public static perspective(fov: number, aspect: number, near: number, far: number) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1.0 / (near - far);

        const matrix = new Matrix4();
        matrix.n11 = f / aspect;
        matrix.n12 = 0;
        matrix.n13 = 0;
        matrix.n14 = 0;
        matrix.n21 = 0;
        matrix.n22 = f;
        matrix.n23 = 0;
        matrix.n24 = 0;
        matrix.n31 = 0;
        matrix.n32 = 0;
        matrix.n33 = (near + far) * rangeInv;
        matrix.n34 = -1;
        matrix.n41 = 0;
        matrix.n42 = 0;
        matrix.n43 = near * far * rangeInv * 2;
        matrix.n44 = 0;
        return matrix;
    }

    public static getInverseMatrix4(m: Matrix4): Matrix4 {
        var tmp_0 = m.n33 * m.n44;
        var tmp_1 = m.n43 * m.n34;
        var tmp_2 = m.n23 * m.n44;
        var tmp_3 = m.n43 * m.n24;
        var tmp_4 = m.n23 * m.n34;
        var tmp_5 = m.n33 * m.n24;
        var tmp_6 = m.n13 * m.n44;
        var tmp_7 = m.n43 * m.n14;
        var tmp_8 = m.n13 * m.n34;
        var tmp_9 = m.n33 * m.n14;
        var tmp_10 = m.n13 * m.n24;
        var tmp_11 = m.n23 * m.n14;
        var tmp_12 = m.n31 * m.n42;
        var tmp_13 = m.n41 * m.n32;
        var tmp_14 = m.n21 * m.n42;
        var tmp_15 = m.n41 * m.n22;
        var tmp_16 = m.n21 * m.n32;
        var tmp_17 = m.n31 * m.n22;
        var tmp_18 = m.n11 * m.n42;
        var tmp_19 = m.n41 * m.n12;
        var tmp_20 = m.n11 * m.n32;
        var tmp_21 = m.n31 * m.n12;
        var tmp_22 = m.n11 * m.n22;
        var tmp_23 = m.n21 * m.n12;

        var t0 = (tmp_0 * m.n22 + tmp_3 * m.n32 + tmp_4 * m.n42) -
            (tmp_1 * m.n22 + tmp_2 * m.n32 + tmp_5 * m.n42);
        var t1 = (tmp_1 * m.n12 + tmp_6 * m.n32 + tmp_9 * m.n42) -
            (tmp_0 * m.n12 + tmp_7 * m.n32 + tmp_8 * m.n42);
        var t2 = (tmp_2 * m.n12 + tmp_7 * m.n22 + tmp_10 * m.n42) -
            (tmp_3 * m.n12 + tmp_6 * m.n22 + tmp_11 * m.n42);
        var t3 = (tmp_5 * m.n12 + tmp_8 * m.n22 + tmp_11 * m.n32) -
            (tmp_4 * m.n12 + tmp_9 * m.n22 + tmp_10 * m.n32);

        var d = 1.0 / (m.n11 * t0 + m.n12 * t1 + m.n31 * t2 + m.n41 * t3);
        const dst = new Matrix4();
        dst.n11 = d * t0;
        dst.n12 = d * t1;
        dst.n13 = d * t2;
        dst.n14 = d * t3;
        dst.n21 = d * ((tmp_1 * m.n12 + tmp_2 * m.n31 + tmp_5 * m.n42) -
            (tmp_0 * m.n12 + tmp_3 * m.n31 + tmp_4 * m.n42));
        dst.n22 = d * ((tmp_0 * m.n11 + tmp_7 * m.n31 + tmp_8 * m.n41) -
            (tmp_1 * m.n11 + tmp_6 * m.n31 + tmp_9 * m.n41));
        dst.n23 = d * ((tmp_3 * m.n11 + tmp_6 * m.n21 + tmp_11 * m.n41) -
            (tmp_2 * m.n11 + tmp_7 * m.n21 + tmp_10 * m.n41));
        dst.n24 = d * ((tmp_4 * m.n11 + tmp_9 * m.n21 + tmp_10 * m.n31) -
            (tmp_5 * m.n11 + tmp_8 * m.n21 + tmp_11 * m.n31));
        dst.n31 = d * ((tmp_12 * m.n24 + tmp_15 * m.n34 + tmp_16 * m.n44) -
            (tmp_13 * m.n24 + tmp_14 * m.n34 + tmp_17 * m.n44));
        dst.n32 = d * ((tmp_13 * m.n14 + tmp_18 * m.n34 + tmp_21 * m.n44) -
            (tmp_12 * m.n14 + tmp_19 * m.n34 + tmp_20 * m.n44));
        dst.n33 = d * ((tmp_14 * m.n14 + tmp_19 * m.n24 + tmp_22 * m.n44) -
            (tmp_15 * m.n14 + tmp_18 * m.n24 + tmp_23 * m.n44));
        dst.n34 = d * ((tmp_17 * m.n14 + tmp_20 * m.n24 + tmp_23 * m.n34) -
            (tmp_16 * m.n14 + tmp_21 * m.n24 + tmp_22 * m.n34));
        dst.n41 = d * ((tmp_14 * m.n33 + tmp_17 * m.n43 + tmp_13 * m.n23) -
            (tmp_16 * m.n43 + tmp_12 * m.n23 + tmp_15 * m.n33));
        dst.n42 = d * ((tmp_20 * m.n43 + tmp_12 * m.n13 + tmp_19 * m.n33) -
            (tmp_18 * m.n33 + tmp_21 * m.n43 + tmp_13 * m.n13));
        dst.n43 = d * ((tmp_18 * m.n23 + tmp_23 * m.n43 + tmp_15 * m.n13) -
            (tmp_22 * m.n43 + tmp_14 * m.n13 + tmp_19 * m.n23));
        dst.n44 = d * ((tmp_22 * m.n33 + tmp_16 * m.n13 + tmp_21 * m.n23) -
            (tmp_20 * m.n23 + tmp_23 * m.n33 + tmp_17 * m.n13));

        return dst;
    }

    public toFloat32List(): Float32List {
        return [this.n11, this.n12, this.n13, this.n14, this.n21, this.n22, this.n23, this.n24, this.n31, this.n32, this.n33, this.n34, this.n41, this.n42, this.n43, this.n44];
    }

    public toTransposedFloat32List(): Float32List {
        return [
            this.n11, this.n21, this.n31, this.n41,
            this.n12, this.n22, this.n32, this.n42,
            this.n13, this.n23, this.n33, this.n43,
            this.n14, this.n24, this.n34, this.n44,
        ];
    }


}