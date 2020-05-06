import glm from '../../GLManager';
import VertexSrc from './vertex';
import FragmentSrc from './fragment';
import Attributes from './attributes';
import Uniforms from './uniforms';
import Shader from '../Shader';

export default class Graph2DShader extends Shader {
    constructor() {
        super(VertexSrc, FragmentSrc, Attributes, Uniforms);
    }

    enablePosition() {
        const posLocation = glm.getAttribLocation(this.program, this.attributes.POSITION);
        glm.enableVertexAttribArray(posLocation);
        glm.pointToAttribute(posLocation, 2);
    }
}