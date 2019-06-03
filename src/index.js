import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector3} from "./vector3";

function main() {
    const canvas = document.getElementById("canvas");
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    const camera = new PerspectiveCamera(gl, 1.0471, canvas.width / canvas.height, 1/1000, 200);
    camera.Position = new Vector3(0, 0, 10);
    var obj = new Mesh(gl, camera);
    obj.Geometry = new Geometry(gl, [
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        0.5, 0.5, 0
    ], [], [], []);
    obj.VerticesColor = new Vector4(0.5, 0.5, 0.5, 1);
    obj.Position = new Vector3(0,0,-5);
   // camera.lookAt(obj.Position, new Vector3(0, 1, 0));
    var objects = [obj];
    drawScene();

    function drawScene() {

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Turn on culling. By default backfacing triangles
        // // will be culled.
        // gl.enable(gl.CULL_FACE);
        //
        // // Enable the depth buffer
        // gl.enable(gl.DEPTH_TEST);

        for (const obj of objects) {
            obj.render();
        }
        window.requestAnimationFrame(drawScene);
    }
}

main();