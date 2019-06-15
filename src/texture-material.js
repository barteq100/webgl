import {Texture} from "./texture";
import {Program} from "./program";
import {GLUniform, UniformType} from "./gl-uniform";
import {GLAttribute} from "./gl-attribute";
import {BasicMaterial, MaterialType} from "./basic-material.interface";

export class TextureMaterial extends BasicMaterial{

    constructor(gl: WebGLRenderingContext, texture: Texture){
        super(gl);
        this.texture = texture;
        this.materialType = MaterialType.TEXTURE;
        this.vertexShaderScript =
            '\r\n' +
            'precision highp float;\r\n' +
            'uniform mat4 u_model;\r\n' +
            'uniform mat4 u_view;\r\n' +
            'uniform mat4 u_projection;\r\n' +
            'attribute vec3 a_position;\r\n' +
            'attribute vec2 a_uv;\r\n' +
            'varying vec2 v_texCoord;\r\n' +
            'void main(void) {\r\n' +
            '    v_texCoord = a_uv;\r\n' +
            '    gl_Position = u_projection * u_view *  u_model * vec4(a_position, 1.0);\r\n' +
            '}\r\n';

        this.fragmentShaderScript = '\r\n' +
            'precision highp float;\r\n' +
            'varying vec2 v_texCoord;\r\n' +
            'uniform sampler2D u_texture;\r\n' +
            'void main(void) {\r\n' +
            '    gl_FragColor = texture2D(u_texture, v_texCoord);\r\n' +
            '}\r\n';

        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.model = new GLUniform(gl, this.program.program, 'u_model', UniformType.MATRIX4);
        this.view = new GLUniform(gl, this.program.program, 'u_view', UniformType.MATRIX4);
        this.textureUniform = new GLUniform(gl, this.program.program, 'u_texture', UniformType.TEXTURE);
        this.projection = new GLUniform(gl, this.program.program, 'u_projection', UniformType.MATRIX4);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.uvAttribute = new GLAttribute(gl, this.program.program, 'a_uv', 2);
    }

    render(positions: WebGLBuffer, uvs: WebGLBuffer, model: Float32List, view: Float32List, projection: Float32List) {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable(positions);
        this.uvAttribute.Enable(uvs);
        this.model.Enable(model);
        this.view.Enable(view);
        this.projection.Enable(projection);
        this.textureUniform.Enable();
    }
}