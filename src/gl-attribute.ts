export class GLAttribute {
    private numOfComp: number;
    private location: GLint;
    private divisor: number = 0;

    constructor(private gl: WebGL2RenderingContext, program: WebGLProgram, name: string, numberOfComponents: number, divisor?: number) {
        this.gl = gl;
        this.numOfComp = numberOfComponents;
        this.location = gl.getAttribLocation(program, name);
        if (divisor > 0) {
            this.divisor = divisor;
        }
    }


    Enable(buffer: WebGLBuffer) {
        this.gl.enableVertexAttribArray(this.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        var numComponents = this.numOfComp; // (x, y, z)
        const n = numComponents / 4;
        var type = this.gl.FLOAT;    // 32bit floating point values
        var normalize = false;  // leave the values as they are
        var offset = 0;         // start at the beginning of the buffer
        var stride = numComponents > 4 ? numComponents * 4 : 0;         // how many bytes to move to the next vertex
        var size  = numComponents > 4 ? 4 : numComponents ;

        for (let i = 0; i < n; i++) {
            this.gl.vertexAttribPointer(this.location + i, size , this.gl.FLOAT, false, stride , 16 * i);
        }
        if (this.divisor > 0) {
            for (let i = 0; i < n; i++) {
                this.gl.vertexAttribDivisor(this.location + i, this.divisor);
            }
        }
    }
}