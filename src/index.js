import {Geometry} from "./geometry";
import {Vector4} from "./vector4";
import {Mesh} from "./mesh";
import {PerspectiveCamera} from "./perspective-camera";
import {Vector3} from "./vector3";
import {Quaternion} from "./quaternion";
import {BasicObject} from "./basic-object";
import {Material} from "./material";
import {RenderPass} from "./render-pass";
import {Texture} from "./texture";
import {TextureMaterial} from "./texture-material";

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
    camera.Position = new Vector3(0, 0, 10);
    const obj = new Mesh(gl, camera);
    obj.Geometry = new Geometry(gl, [
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,
        -1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        -1.0, -1.0, -1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0, -1.0, -1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
        -1.0, -1.0, -1.0,

    ], [], [], [], [
        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0,

        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0,

        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0,

        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0,

        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0,

        0,0,
        1,0,
        1,1,
        1,1,
        0,1,
        0,0
    ]);
    //     new Geometry(
    //     gl,
    //     [
    //         -1, 1, 0,
    //         -1, -1, 0,
    //         1, -1, 0,
    //         1, -1, 0,
    //         1, 1, 0,
    //         -1, 1 ,0
    //     ],
    //     [],[],[], []
    // );
    obj.VerticesColor = new Vector4(0.5, 0.5,0.5, 1);
    obj.Position = new Vector3(0,0,-5);



    camera.lookAt(obj.Position, new Vector3(0, 1, 0));
    // const renderPass = new RenderPass(gl, 512, 512);
    //     // const renderPassCamera = new PerspectiveCamera(gl, 1.0471, 512 / 512, 1/1000, 200);
    //     // renderPassCamera.Position = new Vector3(0, 0, 3);
    // const sphere = new Mesh(gl, renderPassCamera);
    // sphere.Geometry = Geometry.GenerateSphere(gl, 1, 20);
    const starsTexture = Texture.createFromSrc(gl, 'textures/stars.jpg');
    // sphere.material = new TextureMaterial(gl, starsTexture);
    // sphere.primitiveType = gl.TRIANGLE_STRIP;
    // sphere.VerticesColor = new Vector4(0.7, 0.1, 0.4, 1);
    // sphere.Position = new Vector3(0, 0, 0);
    // renderPassCamera.lookAt(sphere.Position, new Vector3(0, 1, 0));
    // const afterPassTexture = new Texture(gl);
    obj.material = new TextureMaterial(gl, starsTexture);
    for(let x = -5; x< 5; x++){
        for(let y=-5; y<5; y++){
            for(let z = 0; z<5; z++){
                const instance = new BasicObject(gl);
                instance.Position = new Vector3(x* 0.7,y * 0.7,-z * 0.7);
                instance.Scale = new Vector3(0.3, 0.3, 0.3);
                obj.addInstance(instance);
            }
        }
    }
    drawScene(0);
    function drawScene(deltaTime) {
        const now = deltaTime;
        const delta = now - lastTime;
        lastTime = now;
        const d = deltaTime * 0.001;
        const instances = obj.Instances;
        for(const instance of instances) {
            const currentRotation = instance.Rotation;
            // currentRotation.x = now * 0.1;
            // currentRotation.y = now * 0.1;
            // currentRotation.z = now * 0.1;
            const dist = Vector3.sqrDistance(instance.Position, obj.Position);

            const sign = Math.sign(Math.sin(d * 0.8 * Math.PI));
            let moveDirection = Vector3.Sub(instance.Position, obj.Position).Normalize().MultiplyByFloat(delta * sign * 0.01 );
            // if(dist > 100) {
            //    moveDirection = Vector3.Sub(instance.Position, obj.Position).Normalize().MultiplyByFloat(-delta * 0.01 );
            // }
           // instance.Rotation = currentRotation;
            instance.Position = instance.Position.Add(moveDirection);
        }
        camera.Position = new Vector3(Math.cos(d * 0.8 * Math.PI) * 0.1, 0, 10 + (Math.sin(d  * 0.8 * Math.PI) * Math.cos(d * 0.8 * Math.PI) ));
        camera.lookAt(obj.Position, new Vector3(0, 1, 0));
        obj.recalculateInstancesData();

        // sphere.Rotation = new Vector3(now * 1.5, now * 1.5, now * 1.5);
        // afterPassTexture.texture = renderPass.renderTexture([sphere]);

       // parent.Rotation = new Vector3(0 , 0, now * 1.5);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Clear the canvas.
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // for (const o of objects) {
        //     o.render();
        // }
        //obj.render();
        obj.renderInstances();
        window.requestAnimationFrame(drawScene);
    }
}

main();