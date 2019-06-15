import {Program} from "./program";
export const MaterialType = {
    DEFAULT: 'DEFAULT',
    BASIC: 'BASIC',
    TEXTURE: 'TEXTURE'
};
export class BasicMaterial {
    vertexShaderScript: string;
    fragmentShaderScript: string;
    program: Program;
    materialType: MaterialType;
    gl: WebGLRenderingContext;
    constructor(gl){
        this.gl = gl;
    }
    render() {
    }
}