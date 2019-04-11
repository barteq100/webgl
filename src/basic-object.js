import {Vector4} from "./vector4";
import {Program} from "./program";
import {Vector3} from "./vector3";
import {Geometry} from "./geometry";

export class BasicObject {

    constructor(gl) {
        this.vertexShaderScript =
            '\r\n' +
            'precision highp float;\r\n' +
            'attribute vec4 a_position;\r\n' +
            'void main(void) {\r\n' +
            '    gl_Position = a_position;\r\n' +
            '}\r\n';

        this.fragmentShaderScript = '\r\n' +
            'precision highp float;\r\n' +
            'void main(void) {\r\n' +
            '    gl_FragColor = vec4(0.3,0.1,0.1,0.7);\r\n' +
            '}\r\n';

        this._position = new Vector4(0, 0 ,0, 0);
        this._rotation = new Vector3(0, 0, 0);
        this._scale = new Vector3(1,1,1);
        this.geometry = new Geometry();
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
    }
}
