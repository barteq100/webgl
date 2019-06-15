export const UniformType = {
    VECTOR: 'VECTOR',
    MATRIX4: 'MATRIX4',
    TEXTURE: 'TEXTURE'
};

export class GLUniform {
    constructor(gl: WebGLRenderingContext, program, name, type: UniformType) {
        this.gl = gl;
        this.location = gl.getUniformLocation(program, name);
        this.type = type;
    }


    Enable(buffer?: Float32List) {
        switch(this.type){
            case UniformType.MATRIX4:
                this.gl.uniformMatrix4fv(this.location, false, buffer);
                break;
            case UniformType.TEXTURE:
                this.gl.uniform1i(this.location, 0);
                break;
        }
    }
}