import {Vector3} from "./vector3";

export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static FromEuler(axis: Vector3): Quaternion {
        var x = axis.x;
        var y = axis.y;
        var z = axis.z;

        var cos = Math.cos;
        var sin = Math.sin;

        var c1 = cos(x / 2);
        var c2 = cos(y / 2);
        var c3 = cos(z / 2);

        var s1 = sin(x / 2);
        var s2 = sin(y / 2);
        var s3 = sin(z / 2);

        return new Quaternion(
            s1 * c2 * c3 + c1 * s2 * s3,
            c1 * s2 * c3 - s1 * c2 * s3,
            c1 * c2 * s3 + s1 * s2 * c3,
            c1 * c2 * c3 - s1 * s2 * s3
        );
    }

    static FromAxisAngle(axis: Vector3, angle: number): Quaternion {
        var halfAngle = angle / 2, s = Math.sin(halfAngle);
        return new Quaternion(
            axis.x * s,
            axis.y * s,
            axis.z * s,
            Math.cos(halfAngle)
        );
    }

    static MultiplyQuaternions(a: Quaternion, b: Quaternion) {
        var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;
        return new Quaternion(
            qax * qbw + qaw * qbx + qay * qbz - qaz * qby,
            qay * qbw + qaw * qby + qaz * qbx - qax * qbz,
            qaz * qbw + qaw * qbz + qax * qby - qay * qbx,
            qaw * qbw - qax * qbx - qay * qby - qaz * qbz
        );
    }

    multiply(q: Quaternion){
        const newQuat = Quaternion.MultiplyQuaternions(this, q);
        this.x = newQuat.x;
        this.y = newQuat.y;
        this.z = newQuat.z;
        this.w = newQuat.w;
        return this;
    }

    getEulerRotationAxis(): Vector3 {
        var theta = Math.acos(this.w) * 2;
        var sin = Math.sin(theta / 2);
        return new Vector3(this.x / sin,
            this.y / sin,
            this.z / sin).Normalize();
    }

    conjugate(): Quaternion {
        this.w = -this.w;
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    copy(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    normalize(): Quaternion {
        var l = this.length();

        if (l === 0) {

            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;

        } else {

            l = 1 / l;

            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;

        }
        return this;
    }

    setRotation(angle: number): Quaternion {
        this.w = angle;
        this.normalize();
        return this;
    }


}