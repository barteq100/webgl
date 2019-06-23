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
    protected gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    public render(mesh: Mesh, camera: PerspectiveCamera) {
    }

    public renderArray(meshes: Mesh[], camera: PerspectiveCamera) {

    }

    public renderInstances(mesh: Mesh, camera: PerspectiveCamera) {

    }

}