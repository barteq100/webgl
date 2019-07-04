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
    private _instances: BasicObject[] = [];
    private instancesBuffer: WebGLBuffer;
    private instancesData: Float32Array = new Float32Array([]);

    constructor(gl: WebGL2RenderingContext, private camera: PerspectiveCamera) {
        super(gl);
        this.camera = camera;
        this._geometry = new Geometry(gl);
        this.primitiveType = this.gl.TRIANGLES;
        this.drawCount = this._geometry.positions.length / 3;
        this.instancesBuffer = gl.createBuffer();
        gl.bindBuffer(this.gl.ARRAY_BUFFER, this.instancesBuffer);
        gl.bufferData(this.gl.ARRAY_BUFFER, this.instancesData, this.gl.DYNAMIC_DRAW);

    }

    public recalculateInstancesData(){
        const data: number[] = [];
        this._instances.forEach((v) =>{
            data.push(...(v.ModelMatrix.toFloat32List()));
        });
        this.instancesData = new Float32Array(data);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.instancesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.instancesData, this.gl.DYNAMIC_DRAW);
    }
    public get Instances(): BasicObject[] {
        return this._instances;
    }
    public removeInstance(instance: BasicObject): void {
      this._instances = this._instances.filter((v) => v !== instance);
      this.recalculateInstancesData();
    }

    public addInstance(instance: BasicObject): void {
        this._instances.push(instance);
        this.recalculateInstancesData();
    }

    public getInstacesNumber(): number {
        return this._instances.length;
    }

    public getInstanceBuffer(): WebGLBuffer {
        return this.instancesBuffer;
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

    renderInstances(){
        this.material.renderInstances(this, this.camera);
    }
}