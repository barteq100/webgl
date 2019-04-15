export class Geometry {
    constructor(positions, indices, normals, colors) {
        this.positions = new Float32Array(positions);
        this.indices = new Float32Array(indices);
        this.normals = new Float32Array(normals);
        this.colors = new Float32Array(colors);
    }
}