import {Vector4} from "./vector4";
import {Program} from "./program";

export class BasicObject {

    constructor(gl){
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

        this.position = new Vector4();
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
    }
}