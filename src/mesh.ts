import {BasicObject} from "./basic-object";
import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {PerspectiveCamera} from "./perspective-camera";
import {BasicMaterial} from "./basic-material.interface";

export class Mesh extends BasicObject {
    private _geometry: Geometry;
    public primitiveType: GLenum;
    public drawCount: number;
    public material: BasicMaterial;

    constructor(gl: WebGLRenderingContext, private camera: PerspectiveCamera) {
        super(gl);
        this.camera = camera;
        this._geometry = new Geometry(gl);
        this.primitiveType = this.gl.TRIANGLES;
        this.drawCount = this._geometry.positions.length / 3;
    }

    public get Geometry(){
        return this._geometry;
    }

    public set Geometry(newGeometry: Geometry){
        this._geometry = newGeometry;
        this.drawCount = this._geometry.positions.length / 3;
    }

    public set VerticesColor(color: Vector4) {
        this._geometry.color = color;
    }

    render() {
        // const indentyCheck = new Matrix4().multiply(this.camera.modelMatrix).multiply(this.camera.ViewMatrix);
        // const p1 = new Vector4(0.5, 0.5, 0, 1).multiplyByMatrix(new Matrix4().multiply(this.modelMatrix).multiply(this.camera.ViewMatrix).multiply(this.camera.ProjectionMatrix));
        this.material.render(this, this.camera);
    }
}