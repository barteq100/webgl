import {Program} from "./program";
import {GLAttribute} from "./gl-attribute";
import {Vector4} from "./vector4";
import {GLUniform, UniformType} from "./gl-uniform";
import {BasicMaterial, MaterialType} from "./basic-material.interface";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";

export class Material extends BasicMaterial{

    constructor(gl: WebGLRenderingContext): BasicMaterial  {
        super(gl);
        this._color = new Vector4(0, 0 ,0 , 1);
        this.gl = gl;
        this.vertexShaderScript =
            '\r\n' +
            'precision highp float;\r\n' +
            'uniform mat4 u_model;\r\n' +
            'uniform mat4 u_view;\r\n' +
            'uniform mat4 u_projection;\r\n' +
            'attribute vec3 a_position;\r\n' +
            'attribute vec4 a_color;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    v_color = a_color;\r\n' +
            '    gl_Position = u_projection * u_view *  u_model * vec4(a_position, 1.0);\r\n' +
            '}\r\n';

        this.fragmentShaderScript = '\r\n' +
            'precision highp float;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    gl_FragColor = v_color;\r\n' +
            '}\r\n';
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.model = new GLUniform(gl, this.program.program, 'u_model', UniformType.MATRIX4);
        this.view = new GLUniform(gl, this.program.program, 'u_view', UniformType.MATRIX4);
        this.projection = new GLUniform(gl, this.program.program, 'u_projection', UniformType.MATRIX4);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.colorAttribute = new GLAttribute(gl, this.program.program, 'a_color', 4);
    }
    set color(color: Vector4) {
        this._color = color;
    }

    render(mesh: Mesh, camera: PerspectiveCamera) {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable(mesh.Geometry.positionsBuffer);
        this.colorAttribute.Enable(mesh.geometry.colorsBuffer);
        this.model.Enable(mesh.modelMatrix.toFloat32List());
        this.view.Enable(camera.ViewMatrix.toFloat32List());
        this.projection.Enable(camera.ProjectionMatrix.toFloat32List());
        this.gl.drawArrays(mesh.primitiveType, 0, mesh.drawCount);
    }

    renderArray(meshes: Mesh[], camera: PerspectiveCamera) {
        this.gl.useProgram(this.program.program);
        this.view.Enable(camera.ViewMatrix.toFloat32List());
        this.projection.Enable(camera.ProjectionMatrix.toFloat32List());
        for(const mesh of meshes) {
            this.positionAttribute.Enable(mesh.Geometry.positionsBuffer);
            this.colorAttribute.Enable(mesh.geometry.colorsBuffer);
            this.model.Enable(mesh.modelMatrix.toFloat32List());
            this.gl.drawArrays(mesh.primitiveType, 0, mesh.drawCount);
        }
    }
}