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
    //TODO VERIFY
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
        multiplied.n42 = m1.n41 * m2.n11 + m1.n42 * m2.n21 + m1.n43 * m2.n31 + m1.n44 * m2.n41;
        multiplied.n43 = 0;
        multiplied.n44 = 1;
    }


}