import { mat4, vec3 } from 'gl-matrix';
import { toRadians } from '../../math';

export default class Transform {
    constructor() {
        this.transform = mat4.create();
        this._scale = 1;
    }

    translate(x, y, z) {
        mat4.translate(this.transform, this.transform, vec3.fromValues(x, y, z));
    }

    rotate(deg, rx, ry, rz) {
        mat4.rotate(this.transform, this.transform, toRadians(deg), vec3.fromValues(rx, ry, rz));
    }

    rotateX(deg) {
        mat4.rotateX(this.transform, this.transform, toRadians(deg));
    }

    rotateY(deg) {
        mat4.rotateY(this.transform, this.transform, toRadians(deg));
    }

    rotateZ(deg) {
        mat4.rotateZ(this.transform, this.transform, toRadians(deg));
    }

    scale(scale) {
        if (scale <= 0)
            return;
        this._scale = scale;
        mat4.scale(this.transform, this.transform, vec3.fromValues(this._scale, this._scale, this._scale));
    }

    getTransform() {
        return this.transform;
    }
}