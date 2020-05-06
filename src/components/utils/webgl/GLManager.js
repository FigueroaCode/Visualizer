class GLManager {
    init(gl) {
        this.gl = gl;
    }

    viewport = () => this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    setViewport = (x_Offset, y_Offset, width, height) => this.gl.viewport(x_Offset, y_Offset, width, height);

    depthTest = (use) => use ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST);

    blending = (use) => {
        if (use) {
            // Enable transparency
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.enable(this.gl.BLEND);
         } else {
            this.gl.disable(this.gl.BLEND);
         }
    };

    scissorTest = (use) => use ? this.gl.enable(this.gl.SCISSOR_TEST) : this.gl.disable(this.gl.SCISSOR_TEST);

    scissor = (x, y, width, height) => this.gl.scissor(x, y, width, height);

    clear = (r, g, b, a) => {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    createBuffer = () => this.gl.createBuffer();

    // float array buffers
    bindArrayBuffer = (bufferId) => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferId);
    unbindArrayBuffer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    addArrayBufferData = (vertices, drawType) =>
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), drawType);
    addArrayBufferSubdata = (vertices) => 
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
    // uint array buffers
    bindElementArrayBuffer = (bufferId) => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferId);
    unbindElementArrayBuffer = () => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    addElementArrayBufferData = (indices, drawType) =>
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), drawType);
    // shader functions
    createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);
    createFragmentShader = () => this.gl.createShader(this.gl.FRAGMENT_SHADER);

    addShaderSource = (shader, source) => this.gl.shaderSource(shader, source);
    compileShader = (shader) => this.gl.compileShader(shader);
    createShaderProgram = () => this.gl.createProgram();
    attachShaderToProgram = (program, shader) => this.gl.attachShader(program, shader);
    linkProgram = (program) => this.gl.linkProgram(program);
    useProgram = (program) => this.gl.useProgram(program);

    getAttribLocation = (program, attribute) => this.gl.getAttribLocation(program, attribute);
    enableVertexAttribArray = (attribute) => this.gl.enableVertexAttribArray(attribute);
    pointToAttribute = (attribute, dimension, dataType = this.gl.FLOAT, normalized = false, stride = 0, attrib_offset = 0) =>
        this.gl.vertexAttribPointer(attribute, dimension, dataType, normalized, stride, attrib_offset);

    drawTriangles = (indexCount) => this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
    drawLines = (vertexCount) => this.gl.drawArrays(this.gl.LINES, 0, vertexCount);
    drawLineStrip = (vertexCount) => this.gl.drawArrays(this.gl.LINE_STRIP, 0, vertexCount);
    drawLineLoop = (vertexCount) => this.gl.drawArrays(this.gl.LINE_LOOP, 0, vertexCount);
    drawPoints = (vertexCount) => this.gl.drawArrays(this.gl.POINTS, 0, vertexCount);
    drawTriangleStrip = (vertexCount) => this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexCount);

    uploadInt = (location, val) => this.gl.uniform1i(location, val);
    uploadBool = (location, val) => this.gl.uniform1i(location, val ? 1 : 0);
    uploadFloat = (location, val) => this.gl.uniform1f(location, val);
    uploadVec3f = (location, vec) => this.gl.uniform3fv(location, vec);
    uploadMatrix4fv = (location, matrix) => this.gl.uniformMatrix4fv(location, false, matrix);
    getUniformLocation = (program, uniform) => this.gl.getUniformLocation(program, uniform);

    createTexture = () => this.gl.createTexture();
    bindTexture = (texture) => this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    activeTexture = (texture) => this.gl.activeTexture(this.gl.TEXTURE0 + texture);
    defineTexture = (img) =>
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    defineDummyTexture = () =>
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0,255,255,255]));
    texturePowerOfTwo = () => this.gl.generateMipmap(this.gl.TEXTURE_2D);
    textureNoPowerOfTwo = () => {
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }
}

const glm = new GLManager();
export default glm;