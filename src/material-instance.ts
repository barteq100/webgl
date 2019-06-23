import {BasicMaterial} from "./basic-material.interface";
import {Texture} from "./texture";
import {GLUniform, UniformType} from "./gl-uniform";
import {GLAttribute} from "./gl-attribute";
import {Program} from "./program";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector4} from "./vector4";

export class InstanceMaterial extends BasicMaterial {
    private _color: Vector4;
    private model: GLUniform;
    private view: GLUniform;
    private projection: GLUniform;
    private positionAttribute: GLAttribute;
    private colorAttribute: GLAttribute;
    private instancesAttribute: GLAttribute;

    constructor(gl: WebGL2RenderingContext)  {
        super(gl);
        this._color = new Vector4(0, 0 ,0 , 1);
        this.gl = gl;
        this.vertexShaderScript =
            '#version 300 es \r\n' +
            '\r\n' +
            'precision highp float;\r\n' +
            'uniform mat4 u_model;\r\n' +
            'uniform mat4 u_view;\r\n' +
            'uniform mat4 u_projection;\r\n' +
            'in mat4 a_instanceModel; \r\n' +
            'in vec3 a_position;\r\n' +
            'in vec4 a_color;\r\n' +
            'out vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    v_color = a_color;\r\n' +
            '    mat4 model = a_instanceModel * u_model;\r\n' +
            '    gl_Position = u_projection * u_view *  model * vec4(a_position, 1.0);\r\n' +
            '}\r\n';

        this.fragmentShaderScript =
            '#version 300 es \r\n' +
            '\r\n' +
            'precision highp float;\r\n' +
            'in vec4 v_color;\r\n' +
            'out vec4 fragColor;\r\n' +
            'void main(void) {\r\n' +
            '    fragColor = v_color;\r\n' +
            '}\r\n';

        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.model = new GLUniform(gl, this.program.program, 'u_model', UniformType.MATRIX4);
        this.view = new GLUniform(gl, this.program.program, 'u_view', UniformType.MATRIX4);
        this.projection = new GLUniform(gl, this.program.program, 'u_projection', UniformType.MATRIX4);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.colorAttribute = new GLAttribute(gl, this.program.program, 'a_color', 4);
        this.instancesAttribute = new GLAttribute(gl, this.program.program, 'a_instanceModel', 16, 1)
    }
    set color(color: Vector4) {
        this._color = color;
    }

    render(mesh: Mesh, camera: PerspectiveCamera) {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable(mesh.Geometry.positionsBuffer);
        this.colorAttribute.Enable(mesh.Geometry.colorsBuffer);
        this.model.Enable(mesh.ModelMatrix.toFloat32List());
        this.view.Enable(camera.ViewMatrix.toFloat32List());
        this.projection.Enable(camera.ProjectionMatrix.toFloat32List());
        this.instancesAttribute.Enable(mesh.getInstanceBuffer());
        this.gl.drawArraysInstanced(mesh.primitiveType, 0, mesh.drawCount, mesh.getInstacesNumber());
    }
}