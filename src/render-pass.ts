import {Mesh} from "./mesh";

export class RenderPass {
    private targetTexture: WebGLTexture;
    private frameBuffer: WebGLFramebuffer;

    constructor(private gl: WebGL2RenderingContext,private width: number,private height: number) {
        const targetTextureWidth = width;
        const targetTextureHeight = height;
        this.targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        {
            // define size and format of level 0
            const level = 0;
            const internalFormat = gl.RGBA;
            const border = 0;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
            const data: ArrayBufferView = null;
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                targetTextureWidth, targetTextureHeight, border,
                format, type, data);

            // set the filtering so we don't need mips
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }

        this.frameBuffer = gl.createFramebuffer();
    }

    public renderTexture(objects: Mesh[]): WebGLTexture {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
        const attachmentPoint = this.gl.COLOR_ATTACHMENT0;
        const level = 0;
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, attachmentPoint, this.gl.TEXTURE_2D, this.targetTexture, level);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clearColor(0, 0, 1, 1);   // clear to blue
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(const o of objects) {
            o.render();
        }
        return this.targetTexture;
    }

}