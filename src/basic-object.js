import {Program} from "./program";
import {Vector3} from "./vector3";
import {Geometry} from "./geometry";
import {Matrix4} from "./matrix4";
import {GLAttribute} from "./gl-attribute";

export class BasicObject {

    constructor(gl) {
        this.gl = gl;
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

        this._position = new Vector3(0, 0 ,0);
        this._rotation = new Vector3(0, 0, 0);
        this._scale = new Vector3(1,1,1);
        this.geometry = new Geometry();
        this.modelMatrix = new Matrix4();
        this.recalculateModelMatrix();
        this.program = new Program(gl, this.vertexShaderScript, this.fragmentShaderScript);
        this.positionAttribute = new GLAttribute(gl, this.program.program, 'a_position', 3, this.geometry.positions);
    }

    set Position(newPosition: Vector3){
        this._position = newPosition;
        this.recalculateModelMatrix();
    }

    get Position() {
        return this._position;
    }

    set Rotation(newRotation: Vector3) {
        this._rotation = newRotation;
        this.recalculateModelMatrix();
    }

    get Rotation() {
        return this._rotation;
    }

    set Scale(newScaling: Vector3) {
        this._scale = newScaling;
        this.recalculateModelMatrix();
    }

    get Scale() {
        return this._scale;
    }

    get Geometry(){
        return this.geometry;
    }

    set Geometry(newGeometry: Geometry){
        this.geometry = newGeometry;
        this.positionAttribute.BindData(this.geometry.positions);
    }

    get ModelMatrix() {
        return this.modelMatrix;
    }

    recalculateModelMatrix(){
        const translation = Matrix4.getTranslation(this._position);
        const rotation = Matrix4.getRotation(this._rotation);
        const scale = Matrix4.getScaling(this._scale);
        this.modelMatrix = Matrix4.multiplyMatrices(scale, rotation).multiply(translation);
    }

    render(){
        this.gl.useProgram(this.program.program);
        this.positionAttribute.Enable();
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }
}
