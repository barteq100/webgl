import {Vector3} from "./vector3";

//ROW MAJOR
export class Matrix4 {
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

    static getIdentity(): Matrix4 {
        return new Matrix4();
    }

    static getScaling(scale: Vector3): Matrix4 {
        const scalingMatrix = new Matrix4();
        scalingMatrix.n11 = scale.x;
        scalingMatrix.n22 = scale.y;
        scalingMatrix.n33 = scale.z;
        return scalingMatrix;
    }

    static getTranslation(vector: Vector3): Matrix4 {
        const translationMatrix = new Matrix4();
        translationMatrix.n14 = vector.x;
        translationMatrix.n24 = vector.y;
        translationMatrix.n34 = vector.z;
        return translationMatrix;
    }

    translate(vector: Vector3): Matrix4 {
        const m = Matrix4.getTranslation(vector);
        return this.multiply(m);
    }

    static getRotationX(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n22 = cos;
        rotationMatrix.n23 = -sin;
        rotationMatrix.n32 = sin;
        rotationMatrix.n33 = cos;
        return rotationMatrix;
    }

    static getRotationY(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos;
        rotationMatrix.n13 = sin;
        rotationMatrix.n31 = -sin;
        rotationMatrix.n33 = cos;
        return rotationMatrix;
    }

    static getRotationZ(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos;
        rotationMatrix.n12 = -sin;
        rotationMatrix.n21 = sin;
        rotationMatrix.n22 = cos;
        return rotationMatrix;
    }

    static getRotation(vector: Vector3): Matrix4 {
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
    static multiplyMatrices(m1: Matrix4, m2: Matrix4) {
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

    multiply(m: Matrix4): Matrix4 {
        this.n11 = this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41;
        this.n12 = this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42;
        this.n13 = this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43;
        this.n14 = this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44;
        this.n21 = this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41;
        this.n22 = this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42;
        this.n23 = this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43;
        this.n24 = this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44;
        this.n31 = this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41;
        this.n32 = this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42;
        this.n33 = this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43;
        this.n34 = this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44;
        this.n41 = this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41;
        this.n42 = this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42;
        this.n43 = this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43;
        this.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44;
        return this;
    }

    static perspective(foV, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * foV);
        var rangeInv = 1.0 / (near - far);
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
        matrix.n34 = near * far * rangeInv * 2;
        matrix.n41 = 0;
        matrix.n42 = 0;
        matrix.n43 = -1;
        matrix.n44 = 0;
        return matrix;
    }

    static getInverseMatrix4(m: Matrix4): Matrix4 {

        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var
            t11 = m.n23 * m.n34 * m.n42 - m.n24 * m.n33 * m.n42 + m.n24 * m.n32 * m.n43 - m.n22 * m.n34 * m.n43 - m.n23 * m.n32 * m.n44 + m.n22 * m.n33 * m.n44,
            t12 = m.n14 * m.n33 * m.n42 - m.n13 * m.n34 * m.n42 - m.n14 * m.n32 * m.n43 + m.n12 * m.n34 * m.n43 + m.n13 * m.n32 * m.n44 - m.n12 * m.n33 * m.n44,
            t13 = m.n13 * m.n24 * m.n42 - m.n14 * m.n23 * m.n42 + m.n14 * m.n22 * m.n43 - m.n12 * m.n24 * m.n43 - m.n13 * m.n22 * m.n44 + m.n12 * m.n23 * m.n44,
            t14 = m.n14 * m.n23 * m.n32 - m.n13 * m.n24 * m.n32 - m.n14 * m.n22 * m.n33 + m.n12 * m.n24 * m.n33 + m.n13 * m.n22 * m.n34 - m.n12 * m.n23 * m.n34;

        var det = m.n11 * t11 + m.n21 * t12 + m.n31 * t13 + m.n41 * t14;

        if (det === 0) {

            var msg = "can't invert matrix, determinant is 0";
            throw new Error(msg);
        }

        var detInv = 1 / det;
        var result: Matrix4 = Matrix4.getIdentity();
        result.n11 = t11 * detInv;
        result.n12 = (m.n24 * m.n33 * m.n41 - m.n23 * m.n34 * m.n41 - m.n24 * m.n31 * m.n43 + m.n21 * m.n34 * m.n43 + m.n23 * m.n31 * m.n44 - m.n21 * m.n33 * m.n44) * detInv;
        result.n13 = (m.n22 * m.n34 * m.n41 - m.n24 * m.n32 * m.n41 + m.n24 * m.n31 * m.n42 - m.n21 * m.n34 * m.n42 - m.n22 * m.n31 * m.n44 + m.n21 * m.n32 * m.n44) * detInv;
        result.n14 = (m.n23 * m.n32 * m.n41 - m.n22 * m.n33 * m.n41 - m.n23 * m.n31 * m.n42 + m.n21 * m.n33 * m.n42 + m.n22 * m.n31 * m.n43 - m.n21 * m.n32 * m.n43) * detInv;

        result.n21 = t12 * detInv;
        result.n22 = (m.n13 * m.n34 * m.n41 - m.n14 * m.n33 * m.n41 + m.n14 * m.n31 * m.n43 - m.n11 * m.n34 * m.n43 - m.n13 * m.n31 * m.n44 + m.n11 * m.n33 * m.n44) * detInv;
        result.n23 = (m.n14 * m.n32 * m.n41 - m.n12 * m.n34 * m.n41 - m.n14 * m.n31 * m.n42 + m.n11 * m.n34 * m.n42 + m.n12 * m.n31 * m.n44 - m.n11 * m.n32 * m.n44) * detInv;
        result.n24 = (m.n12 * m.n33 * m.n41 - m.n13 * m.n32 * m.n41 + m.n13 * m.n31 * m.n42 - m.n11 * m.n33 * m.n42 - m.n12 * m.n31 * m.n43 + m.n11 * m.n32 * m.n43) * detInv;

        result.n31 = t13 * detInv;
        result.n32 = (m.n14 * m.n23 * m.n41 - m.n13 * m.n24 * m.n41 - m.n14 * m.n21 * m.n43 + m.n11 * m.n24 * m.n43 + m.n13 * m.n21 * m.n44 - m.n11 * m.n23 * m.n44) * detInv;
        result.n33 = (m.n12 * m.n24 * m.n41 - m.n14 * m.n22 * m.n41 + m.n14 * m.n21 * m.n42 - m.n11 * m.n24 * m.n42 - m.n12 * m.n21 * m.n44 + m.n11 * m.n22 * m.n44) * detInv;
        result.n34 = (m.n13 * m.n22 * m.n41 - m.n12 * m.n23 * m.n41 - m.n13 * m.n21 * m.n42 + m.n11 * m.n23 * m.n42 + m.n12 * m.n21 * m.n43 - m.n11 * m.n22 * m.n43) * detInv;

        result.n41 = t14 * detInv;
        result.n42 = (m.n13 * m.n24 * m.n31 - m.n14 * m.n23 * m.n31 + m.n14 * m.n21 * m.n33 - m.n11 * m.n24 * m.n33 - m.n13 * m.n21 * m.n34 + m.n11 * m.n23 * m.n34) * detInv;
        result.n43 = (m.n14 * m.n22 * m.n31 - m.n12 * m.n24 * m.n31 - m.n14 * m.n21 * m.n32 + m.n11 * m.n24 * m.n32 + m.n12 * m.n21 * m.n34 - m.n11 * m.n22 * m.n34) * detInv;
        result.n44 = (m.n12 * m.n23 * m.n31 - m.n13 * m.n22 * m.n31 + m.n13 * m.n21 * m.n32 - m.n11 * m.n23 * m.n32 - m.n12 * m.n21 * m.n33 + m.n11 * m.n22 * m.n33) * detInv;

        return result;
    }

    toFloat32List(): Float32List {
        return [this.n11, this.n12, this.n13, this.n14, this.n21, this.n22, this.n23, this.n24, this.n31, this.n32, this.n33, this.n34, this.n41, this.n42, this.n43, this.n44];
    }

    toTransposedFloat32List(): Float32List {
        return [
            this.n11, this.n21, this.n31, this.n41,
            this.n12, this.n22, this.n32, this.n42,
            this.n13, this.n23, this.n33, this.n43,
            this.n14, this.n24, this.n34, this.n44,
        ];
    }


}