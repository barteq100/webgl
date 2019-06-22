import {Program} from "./program";

export class GLAttribute{
    private numOfComp: number;
    private location: GLint;

    constructor(private gl: WebGL2RenderingContext, program: WebGLProgram, name: string, numberOfComponents: number) {
        this.gl = gl;
        this.numOfComp = numberOfComponents;
        this.location = gl.getAttribLocation(program, name);
    }


    Enable(buffer: WebGLBuffer){
        this.gl.enableVertexAttribArray(this.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        var numComponents = this.numOfComp;  // (x, y, z)
        var type = this.gl.FLOAT;    // 32bit floating point values
        var normalize = false;  // leave the values as they are
        var offset = 0;         // start at the beginning of the buffer
        var stride = 0;         // how many bytes to move to the next vertex
                                // 0 = use the correct stride for type and numComponents
        this.gl.vertexAttribPointer(this.location, numComponents, type, false, stride, offset);
    }
}