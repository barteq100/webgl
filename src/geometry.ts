import {Vector4} from "./vector4";

export class Geometry {
    public positions: Float32Array;
    private indices: Float32Array;
    private gl: WebGL2RenderingContext;
    private normals: Float32Array;
    private _colors: Float32Array;
    private _uvs: Float32Array;
    private _positionsBuffer: WebGLBuffer;
    private _indicesBuffer: WebGLBuffer;
    private _normalsBuffer: WebGLBuffer;
    private _colorsBuffer: WebGLBuffer;
    private _uvsBuffer: WebGLBuffer;
    constructor(gl: WebGL2RenderingContext, positions: number[] = [], indices: number[] = [], normals: number[] = [], colors: number[] = [], uvs: number[] = []) {
        this.gl = gl;
        this.positions = new Float32Array(positions);
        this.indices = new Float32Array(indices);
        this.normals = new Float32Array(normals);
        this._colors = new Float32Array(colors);
        this._uvs = new Float32Array(uvs);
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
        this._uvsBuffer = gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._uvsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._uvs, this.gl.STATIC_DRAW);
    }

    public get colors(): Float32Array {
        return this._colors;
    }

    public set color(color: Vector4) {
        const newColors: number[] = [];
        for (let i = 0; i < this.positions.length / 3; i++) {
            newColors.push(color.x, color.y, color.z, color.w);
        }
        this._colors = new Float32Array(newColors);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
    }

    public set colors(colors: Float32Array) {
        this._colors = colors;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
    }

    public get positionsBuffer(): WebGLBuffer {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._positionsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
        return this._positionsBuffer;
    }
    public get colorsBuffer(): WebGLBuffer {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._colorsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._colors, this.gl.STATIC_DRAW);
        return this._colorsBuffer;
    }

    public get uvsBuffer(): WebGLBuffer {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._uvsBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this._uvs, this.gl.STATIC_DRAW);
        return this._uvsBuffer;
    }

    static GenerateSphere(gl: WebGL2RenderingContext, radius: number, detail: number) {
        // Based on Paul Bourke's geometry article
        var vertices = [];
        var normals = [];
        var texcoords = [];

        var TWOPI = 6.28318530717958;
        var PIDIV2 = 1.57079632679489;

        var p = detail;
        var r = radius;
        var cx = 0;
        var cy = 0;
        var cz = 0;

        for( var i = 0; i < p/2; ++i )
        {

            var theta1 = i * TWOPI / p - PIDIV2;
            var theta2 = (i + 1) * TWOPI / p - PIDIV2;

            for(var j = 0; j <= p; ++j )
            {
                var theta3 = j * TWOPI / p;

                var ex = Math.cos(theta2) * Math.cos(theta3);
                var ey = Math.sin(theta2);
                var ez = Math.cos(theta2) * Math.sin(theta3);
                var px = cx + r * ex;
                var py = cy + r * ey;
                var pz = cz + r * ez;
                var tu  = -(j/p);
                var tv  = 2*(i+1)/p;

                vertices.push(px, py, pz);
                normals.push(ex, ey, ez);
                texcoords.push(tu, -tv);

                ex = Math.cos(theta1) * Math.cos(theta3);
                ey = Math.sin(theta1);
                ez = Math.cos(theta1) * Math.sin(theta3);
                px = cx + r * ex;
                py = cy + r * ey;
                pz = cz + r * ez;
                tu  = -(j/p);
                tv  = 2*i/p;

                vertices.push(px, py, pz);
                normals.push(ex, ey, ez);
                texcoords.push(tu, -tv);
            }
        }

        return new Geometry(gl, vertices, [], normals, [], texcoords );
    }


}