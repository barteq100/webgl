import {Vector3} from "./vector3";
//ROW MAJOR
export class Matrix4 {
    constructor() {
        this.n11 = 1; this.n12 = 0; this.n13 = 0; this.n14 = 0;
        this.n21 = 0; this.n22 = 1; this.n23 = 0; this.n24 = 0;
        this.n31 = 0; this.n32 = 0; this.n33 = 1; this.n34 = 0;
        this.n41 = 0; this.n42 = 0; this.n43 = 0; this.n44 = 1;
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

    static getRotationX(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n22 = cos; rotationMatrix.n23 = -sin;
        rotationMatrix.n32 = sin; rotationMatrix.n33 = cos;
        return rotationMatrix;
    }
    static getRotationY(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos; rotationMatrix.n13 = sin;
        rotationMatrix.n31 = -sin;  rotationMatrix.n33 = cos;
        return rotationMatrix;
    }

    static getRotationZ(radians: number): Matrix4 {
        const rotationMatrix = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix.n11 = cos; rotationMatrix.n12 = -sin;
        rotationMatrix.n21 = sin; rotationMatrix.n22 = cos;
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
        rotationMatrix.n11 = cosX*cosY*cosZ - sinX*sinZ; rotationMatrix.n12 = -cosX*cosY*sinZ-sinX*cosZ; rotationMatrix.n13 = cosX*sinY;
        rotationMatrix.n21 = sinX*cosY*cosZ+cosX*sinZ; rotationMatrix.n22 = -sinX*cosY*sinZ+cosX*cosZ; rotationMatrix.n23 = sinX*sinY;
        rotationMatrix.n31 = -sinY*cosZ; rotationMatrix.n32 = sinY*sinZ; rotationMatrix.n33 = cosY;
        return rotationMatrix;
    }
    //ROW MAJOR
    static multiplyMatrices(m1: Matrix4, m2: Matrix4){
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
    }

    multiply(m: Matrix4) {
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
        this.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * this.n44;
    }

}