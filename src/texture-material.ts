import {Texture} from "./texture";
import {Program} from "./program";
import {GLUniform, UniformType} from "./gl-uniform";
import {GLAttribute} from "./gl-attribute";
import {BasicMaterial, MaterialType} from "./basic-material.interface";
import {PerspectiveCamera} from "./perspective-camera";
import {Mesh} from "./mesh";

export class TextureMaterial extends BasicMaterial{
    private texture: Texture;
    private model: GLUniform;
    private view: GLUniform;
    private textureUniform: GLUniform;
    private projection: GLUniform;
    private positionAttribute: GLAttribute;
    private uvAttribute: GLAttribute;

    constructor(gl: WebGL2RenderingContext, texture: Texture){
        super(gl);
        this.texture = texture;
        this.vertexShaderScript =
            '#version 300 es \r\n' +
            '\r\n' +
            'precision highp float;\r\n' +
            'uniform mat4 u_model;\r\n' +
            'uniform mat4 u_view;\r\n' +
            'uniform mat4 u_projection;\r\n' +
            'in vec3 a_position;\r\n' +
            'in vec2 a_uv;\r\n' +
            'out vec2 v_texCoord;\r\n' +
            'void main(void) {\r\n' +
            '    v_texCoord = a_uv;\r\n' +
            '    gl_Position = u_projection * u_view *  u_model * vec4(a_position, 1.0);\r\n' +
            '    gl_Position /= gl_Position.w ;\r\n' +
            '}\r\n';

        this.fragmentShaderScript =
            '#version 300 es \r\n' +
            '\r\n' +
            'precision highp float;\r\n' +
            'in vec2 v_texCoord;\r\n' +
            'uniform sampler2D u_texture;\r\n' +
            'out vec4 fragColor;\r\n' +
            'void main(void) {\r\n' +
            '    fragColor = texture(u_texture, v_texCoord);\r\n' +
            '}\r\n';

        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.model = new GLUniform(gl, this.program.program, 'u_model', UniformType.MATRIX4);
        this.view = new GLUniform(gl, this.program.program, 'u_view', UniformType.MATRIX4);
        this.textureUniform = new GLUniform(gl, this.program.program, 'u_texture', UniformType.TEXTURE);
        this.projection = new GLUniform(gl, this.program.program, 'u_projection', UniformType.MATRIX4);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.uvAttribute = new GLAttribute(gl, this.program.program, 'a_uv', 2);
    }

    render(mesh: Mesh, camera: PerspectiveCamera) {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable(mesh.Geometry.positionsBuffer);
        this.model.Enable(mesh.ModelMatrix.toFloat32List());
        this.view.Enable(camera.ViewMatrix.toFloat32List());
        this.projection.Enable(camera.ProjectionMatrix.toFloat32List());
        this.uvAttribute.Enable(mesh.Geometry.uvsBuffer);
        this.textureUniform.Enable();
        this.gl.drawArrays(mesh.primitiveType, 0, mesh.drawCount);
    }
}