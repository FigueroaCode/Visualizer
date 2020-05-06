import glm from '../GLManager';

export default class Shader {
    constructor(vertexSource, fragmentSource, attributes, uniforms) {
        this.attributes = attributes;
        this.uniforms = uniforms;

        const vertexShader = glm.createVertexShader();
        glm.addShaderSource(vertexShader, vertexSource);
        glm.compileShader(vertexShader);
        this.compileStatus(vertexShader);

        const fragmentShader = glm.createFragmentShader();
        glm.addShaderSource(fragmentShader, fragmentSource);
        glm.compileShader(fragmentShader);
        this.compileStatus(fragmentShader);

        this.program = glm.createShaderProgram();
        glm.attachShaderToProgram(this.program, vertexShader);
        glm.attachShaderToProgram(this.program, fragmentShader);
        glm.linkProgram(this.program);
    }

    compileStatus(shader) {
        if(!glm.gl.getShaderParameter(shader, glm.gl.COMPILE_STATUS)) {
            console.error(glm.gl.getShaderInfoLog(shader));
        }
    }

    use() {
        glm.useProgram(this.program);
    }

    enableModel(matrix) {
        const modelLocation = glm.getUniformLocation(this.program, this.uniforms.MODEL);
        glm.uploadMatrix4fv(modelLocation, matrix);
    }

    enableView(matrix) {
        const viewLocation = glm.getUniformLocation(this.program, this.uniforms.VIEW);
        glm.uploadMatrix4fv(viewLocation, matrix);
    }

    enableProjection(matrix) {
        const projLocation = glm.getUniformLocation(this.program, this.uniforms.PROJECTION);
        glm.uploadMatrix4fv(projLocation, matrix);
    }
}