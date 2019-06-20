import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector3} from "./vector3";
import {Texture} from "./texture";
import {TextureMaterial} from "./texture-material";
import {Quaternion} from "./quaternion";
import {BasicObject} from "./basic-object";

function main() {
    const canvas = document.getElementById("canvas");
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    let lastTime = 0;
    canvas.width = w;
    canvas.height = h;
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    const camera = new PerspectiveCamera(gl, 1.0471, canvas.width / canvas.height, 1/1000, 200);
    camera.Position = new Vector3(0, 5, 10);
    var obj = new Mesh(gl, camera);
    var texture = Texture.createFromSrc(gl, 'textures/stars.jpg');
    obj.material = new TextureMaterial(gl, texture);
    obj.Geometry = new Geometry(gl, [
        -1.0,-1.0,-1.0, // triangle 1 : begin
        -1.0,-1.0, 1.0,
        -1.0, 1.0, 1.0, // triangle 1 : end
        1.0, 1.0,-1.0, // triangle 2 : begin
        -1.0,-1.0,-1.0,
        -1.0, 1.0,-1.0, // triangle 2 : end
        1.0,-1.0, 1.0,
        -1.0,-1.0,-1.0,
        1.0,-1.0,-1.0,
        1.0, 1.0,-1.0,
        1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0,-1.0,
        1.0,-1.0, 1.0,
        -1.0,-1.0, 1.0,
        -1.0,-1.0,-1.0,
        -1.0, 1.0, 1.0,
        -1.0,-1.0, 1.0,
        1.0,-1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0,-1.0,-1.0,
        1.0, 1.0,-1.0,
        1.0,-1.0,-1.0,
        1.0, 1.0, 1.0,
        1.0,-1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0,-1.0,
        -1.0, 1.0,-1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0,-1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0,-1.0, 1.0
    ], [], [], [], [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
    ]);
    const parent = new BasicObject(gl);
    parent.Position = new Vector3(0, 0, -5);
    obj.VerticesColor = new Vector4(0.5, 0.5, 0.5, 1);
    obj.Position = new Vector3(5,0,0);
    obj.Parent = parent;
    camera.lookAt(parent.Position, new Vector3(0, 1, 0));
    var objects = [obj];
    var quat = new Quaternion(1, 0, 0, 0);
    drawScene(0);
    function drawScene(deltaTime) {
        let now = lastTime + 1/60;
        lastTime = now;
        quat.setRotation(Math.sin(now));
        parent.Rotation = new Vector3(0 , 0, now * 1.5);
        obj.Rotation = new Vector3(now * 1.5, 0 , 0);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        for (const obj of objects) {
            obj.render();
        }
        window.requestAnimationFrame(drawScene);
    }
}

main();