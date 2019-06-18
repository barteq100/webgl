import {Program} from "./program";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";

export const MaterialType = {
    DEFAULT: 'DEFAULT',
    BASIC: 'BASIC',
    TEXTURE: 'TEXTURE'
};

export class BasicMaterial {
    vertexShaderScript: string;
    fragmentShaderScript: string;
    program: Program;
    gl: WebGLRenderingContext;

    constructor(gl) {
        this.gl = gl;
    }

    render(mesh: Mesh, camera: PerspectiveCamera) {
    }

    renderArray(meshes: Mesh[], camera: PerspectiveCamera) {

    }
}