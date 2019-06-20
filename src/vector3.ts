export class Vector3 {
    constructor(public x: number,public y: number,public z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static Cross(a: Vector3, b: Vector3) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }

    static Sub(a: Vector3, b: Vector3) {
        return new Vector3(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z
        );
    }

    Sub(v: Vector3){
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    Cross(b: Vector3) {
        return new Vector3(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
    }

    Normalize(){
        var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        // make sure we don't divide by 0.
        if (length > 0.00001) {
            this.x = this.x / length;
            this.y = this.y / length;
            this.z = this.z / length;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    }
}