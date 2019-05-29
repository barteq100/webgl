export class GLAttribute{
    constructor(gl, program, name, numberOfComponents) {
        this.gl = gl;
        this.numOfComp = numberOfComponents;
        this.location = gl.getAttribLocation(program, name);
        this.buffer = gl.createBuffer();
    }

    BindData(data){
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    }

    Enable(){
        this.gl.enableVertexAttribArray(this.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        var numComponents = this.numOfComp;  // (x, y, z)
        var type = this.gl.FLOAT;    // 32bit floating point values
        var normalize = false;  // leave the values as they are
        var offset = 0;         // start at the beginning of the buffer
        var stride = 0;         // how many bytes to move to the next vertex
                                // 0 = use the correct stride for type and numComponents
        this.gl.vertexAttribPointer(this.location, numComponents, type, false, stride, offset);
    }
}