import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector3} from "./vector3";
import {Texture} from "./texture";
import {Quaternion} from "./quaternion";
import {BasicObject} from "./basic-object";
import {Material} from "./material";

function main() {
    const canvas = document.getElementById("canvas");
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    let lastTime = 0;
    canvas.width = w;
    canvas.height = h;
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }
    // Create a vertex array object (attribute state)
    var vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);
    const camera = new PerspectiveCamera(gl, 1.0471, canvas.width / canvas.height, 1/1000, 200);
    camera.Position = new Vector3(0, 5, 10);
    var obj = new Mesh(gl, camera);
    obj.material = new Material(gl);
    obj.Geometry = new Geometry(
        gl,
        [
            -1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
            1, -1, 0,
            1, 1, 0,
            -1, 1 ,0
        ],
        [],[],[], []
    );
        //Geometry.GenerateSphere(gl, 1, 20);
    const instance = new BasicObject(gl);
    instance.Position = new Vector3(5, 0, 0);
    const instance2 = new BasicObject(gl);
    instance2.Position = new Vector3(0, 2, 0);
    const instance3 = new BasicObject(gl);
    instance3.Position = new Vector3(0, 0, -5);
    const parent = new BasicObject(gl);
    parent.Position = new Vector3(0, 0, 0);
    obj.VerticesColor = new Vector4(0.5, 0.5,0.5, 1);
    obj.Position = new Vector3(0,0,-5);
    obj.Parent = parent;
    obj.addInstance(instance);
    obj.addInstance(instance2);
    obj.addInstance(instance3);

    camera.lookAt(parent.Position, new Vector3(0, 1, 0));
    var objects = [obj];
    var quat = new Quaternion(1, 0, 0, 0);
    drawScene(0);
    function drawScene(deltaTime) {
        let now = lastTime + 1/60;
        lastTime = now;
        quat.setRotation(Math.sin(now));
       // parent.Rotation = new Vector3(0 , 0, now * 1.5);
        //obj.Rotation = new Vector3(now * 1.5, 0 , 0);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //Turn on culling. By default backfacing triangles
        // will be culled.
        //gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        //gl.enable(gl.DEPTH_TEST);
        //gl.depthFunc(gl.LESS);
        // for (const o of objects) {
        //     o.render();
        // }
        //obj.render();
        obj.render();
        window.requestAnimationFrame(drawScene);
    }
}

main();