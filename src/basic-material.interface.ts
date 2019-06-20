import {Program} from "./program";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";

export const MaterialType = {
    DEFAULT: 'DEFAULT',
    BASIC: 'BASIC',
    TEXTURE: 'TEXTURE'
};

export class BasicMaterial {
    protected vertexShaderScript: string;
    protected fragmentShaderScript: string;
    protected program: Program;
    protected gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    public render(mesh: Mesh, camera: PerspectiveCamera) {
    }

    public renderArray(meshes: Mesh[], camera: PerspectiveCamera) {

    }
}