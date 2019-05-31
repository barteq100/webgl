import {Vector4} from "./vector4";

export class Geometry {
    constructor(gl: WebGLRenderingContext, positions = [], indices = [], normals = [], colors = []) {
        this.gl = gl;
        this.positions = new Float32Array(positions);
        this.indices = new Float32Array(indices);
        this.normals = new Float32Array(normals);
        this._colors = new Float32Array(colors);

        this._positionsBuffer = gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._positionsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
        this._indicesBuffer = gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._indicesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
        this._normalsBuffer = gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._normalsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.normals, this.gl.STATIC_DRAW);
        this._colorsBuffer = gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
    }

    get colors() {
        return this._colors;
    }

    set color(color: Vector4) {
        const newColors = [];
        for (let i = 0; i < this.positions.length; i++) {
            newColors.push(color.x, color.y, color.z, color.w);
        }
        this._colors = new Float32Array(newColors);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
    }

    set colors(colors: Vector4[]) {
        this._colors = new Float32Array(colors);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
    }

    get positionsBuffer(): WebGLBuffer {
        return this._positionsBuffer;
    }
    get colorsBuffer(): WebGLBuffer {
        return this._colorsBuffer;
    }


}