import {BasicObject} from "./basic-object";
import {Geometry} from "./geometry";
import {Vector4} from "./vector4";

function main() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    var obj = new BasicObject(gl);
    obj.Geometry = new Geometry([
     -0.25, -0.25, 0,
     0.25, -0.25, 0,
     0, 0.25, 0
    ], [],[],[]);
    obj.Color = new Vector4(0.5, 0.5, 0.5, 1);
    var objects = [obj];
    drawScene();
    function drawScene() {
        //webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(const obj of objects){
            obj.render();
        }
    }
}

main();