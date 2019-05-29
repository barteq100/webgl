import {Vector4} from "./vector4";

export class Geometry {
    constructor(positions, indices, normals, colors) {
        this.positions = new Float32Array(positions);
        this.indices = new Float32Array(indices);
        this.normals = new Float32Array(normals);
        this._colors = new Float32Array(colors);
    }

    get colors() {
        return this._colors;
    }

    set color(color: Vector4) {
        const newColors = [];
        for (let i = 0; i < this.positions.length; i++) {
            newColors.push(color);
        }
        this._colors = new Float32Array(newColors);
    }

    set colors(colors: Vector4[]) {
        this._colors = new Float32Array(colors);
    }
}