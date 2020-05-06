import Attributes from './attributes';
import Uniforms from './uniforms';

export default `
    precision mediump float;
    attribute vec2 ${Attributes.POSITION};

    uniform mat4 ${Uniforms.MODEL};
    uniform mat4 ${Uniforms.VIEW};
    uniform mat4 ${Uniforms.PROJECTION};

    vec4 getWorldPosition() {
        return ${Uniforms.MODEL} * vec4(${Attributes.POSITION}, 0, 1.0);
    }

    void main() {
        vec4 worldPos = getWorldPosition();
        gl_Position = worldPos;
        gl_PointSize = 2.0;
    }
`