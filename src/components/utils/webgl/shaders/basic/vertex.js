import Attributes from './attributes';
import Uniforms from './uniforms';

export default `
    precision mediump float;
    attribute vec3 ${Attributes.POSITION};
    attribute vec3 ${Attributes.COLOR};

    uniform mat4 ${Uniforms.MODEL};
    uniform mat4 ${Uniforms.VIEW};
    uniform mat4 ${Uniforms.PROJECTION};

    varying vec3 v_Color;

    vec4 getWorldPosition() {
        return ${Uniforms.PROJECTION} * ${Uniforms.VIEW} * ${Uniforms.PROJECTION} * vec4(${Attributes.POSITION}, 1.0);
    }

    void main() {
        gl_Position = getWorldPosition();
        gl_PointSize = 1.0;

        v_Color = ${Attributes.COLOR};
    }
`