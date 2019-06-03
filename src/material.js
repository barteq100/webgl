import {Program} from "./program";
import {GLAttribute} from "./gl-attribute";
import {Vector4} from "./vector4";
import {GLUniform, UniformType} from "./gl-uniform";

export class Material {
    constructor(gl: WebGLRenderingContext)  {
        this._color = new Vector4(0, 0 ,0 , 1);
        this.gl = gl;
        this.vertexShaderScript =
            '\r\n' +
            'precision highp float;\r\n' +
            'uniform mat4 u_world;\r\n' +
            'uniform mat4 u_model;\r\n' +
            'uniform mat4 u_view;\r\n' +
            'uniform mat4 u_projection;\r\n' +
            'attribute vec3 a_position;\r\n' +
            'attribute vec4 a_color;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    v_color = a_color;\r\n' +
            '    gl_Position = u_projection * u_view * u_world * u_model * vec4(a_position, 1.0);\r\n' +
            '}\r\n';

        this.fragmentShaderScript = '\r\n' +
            'precision highp float;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    gl_FragColor = v_color;\r\n' +
            '}\r\n';
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.world = new GLUniform(gl, this.program.program, 'u_world', UniformType.MATRIX4);
        this.model = new GLUniform(gl, this.program.program, 'u_model', UniformType.MATRIX4);
        this.view = new GLUniform(gl, this.program.program, 'u_view', UniformType.MATRIX4);
        this.projection = new GLUniform(gl, this.program.program, 'u_projection', UniformType.MATRIX4);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.colorAttribute = new GLAttribute(gl, this.program.program, 'a_color', 4);
    }
    set color(color: Vector4) {
        this._color = color;
    }

    render(positions: WebGLBuffer, colors: WebGLBuffer, world: Float32List, model: Float32List, view: Float32List, projection: Float32List,) {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable(positions);
        this.colorAttribute.Enable(colors);
        this.world.Enable(world);
        this.model.Enable(model);
        this.view.Enable(view);
        this.projection.Enable(projection);
    }
}