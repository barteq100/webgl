export class Program {
    constructor(gl, vertexShaderScript, fragmentShaderScript) {
        this.vertexShader = compileShader(gl, vertexShaderScript, gl.VERTEX_SHADER);
        this.fragmentShader = compileShader(gl, fragmentShaderScript, gl.FRAGMENT_SHADER);
        this.program = createProgram(gl, this.vertexShader, this.fragmentShader);
    }
}