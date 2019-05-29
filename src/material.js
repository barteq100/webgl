import {Program} from "./program";
import {GLAttribute} from "./gl-attribute";
import {Geometry} from "./geometry";
import {Vector4} from "./vector4";

export class Material {
    constructor(gl)  {
        this._color = new Vector4(0, 0 ,0 , 1);
        this._geometry = new Geometry([], [], [], []);
        this.gl = gl;
        this.vertexShaderScript =
            '\r\n' +
            'precision highp float;\r\n' +
            'attribute vec4 a_position;\r\n' +
            'attribute vec4 a_color;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    v_color = a_color;\r\n' +
            '    gl_Position = a_position;\r\n' +
            '}\r\n';

        this.fragmentShaderScript = '\r\n' +
            'precision highp float;\r\n' +
            'varying vec4 v_color;\r\n' +
            'void main(void) {\r\n' +
            '    gl_FragColor = v_color;\r\n' +
            '}\r\n';
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3);
        this.colorAttribute = new GLAttribute(gl, this.program.program, 'a_color', 4);
    }

    set geometry(geometry: Geometry) {
        this._geometry = geometry;
        this.positionAttribute.BindData(this._geometry.positions);
        this.colorAttribute.BindData(this._geometry.colors);
    }

    set color(color: Vector4) {
        this._geometry.color = color;
        this._color = color;
        this.colorAttribute.BindData(this._geometry.colors);
    }

    render() {
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable();
        this.colorAttribute.Enable();
    }
}