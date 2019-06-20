import {compileShader, createProgram} from "./webgl-utils";

export class Program {
    public vertexShader: WebGLShader;
    public fragmentShader: WebGLShader;
    public program: WebGLProgram;
    constructor(gl: WebGLRenderingContext, vertexShaderScript: string, fragmentShaderScript: string) {
        this.vertexShader = compileShader(gl, vertexShaderScript, gl.VERTEX_SHADER);
        this.fragmentShader = compileShader(gl, fragmentShaderScript, gl.FRAGMENT_SHADER);
        this.program = createProgram(gl, this.vertexShader, this.fragmentShader);
    }
}