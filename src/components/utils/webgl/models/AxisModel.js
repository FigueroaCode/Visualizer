import glm from '../GLManager';
import Transform from './Transform';

export default class AxisModel extends Transform {
    constructor(margin, tickSize) {
        super();
        this.margin = margin;
        this.tickSize = tickSize;
        this.tickCount = 18;
        this._genX_AxisBuffer();
        this._genY_AxisBuffer();
        this._genYTicksBuffer();
    }

    _createX_Axis() {
        this.x_Axis = [
            -1, -1,
             1, -1
        ];
    }

    _genX_AxisBuffer() {
        this._createX_Axis();
        this.x_AxisBuffer = glm.createBuffer();
        glm.bindArrayBuffer(this.x_AxisBuffer);
        glm.addArrayBufferData(this.x_Axis, glm.gl.STATIC_DRAW);
        glm.unbindArrayBuffer();
    }

    _createY_Axis() {
        this.y_Axis = [
            -1, -1,
            -1,  1
        ];
    }

    _genY_AxisBuffer() {
        this._createY_Axis();
        this.y_AxisBuffer = glm.createBuffer();
        glm.bindArrayBuffer(this.y_AxisBuffer);
        glm.addArrayBufferData(this.y_Axis, glm.gl.STATIC_DRAW);
        glm.unbindArrayBuffer();
    }

    _createYTicks() {
        let pixel_x = 2.0 / (glm.gl.canvas.width - this.margin * 2 - this.tickSize);
        let pixel_y = 2.0 / (glm.gl.canvas.height - this.margin * 2 - this.tickSize);

        const left = -1 + this.margin * pixel_x + this.tickSize * pixel_x - pixel_x;
        const bot = -1 + this.margin * pixel_y + this.tickSize * pixel_y - pixel_y;

        this.yTicks = [];

        for (let i = 0; i < this.tickCount; i++) {
            let y = bot + i * 0.1;
            this.yTicks.push(left);
            this.yTicks.push(y);
            const tickscale = ((i + 1) % 10) ? 0.5 : 1; 
            const x = left - this.tickSize * pixel_x * tickscale;
            this.yTicks.push(x);
            this.yTicks.push(y);
        }
    }

    _genYTicksBuffer() {
        this._createYTicks();
        this.yTicksBuffer = glm.createBuffer();
        glm.bindArrayBuffer(this.yTicksBuffer);
        glm.addArrayBufferData(this.yTicks, glm.gl.STREAM_DRAW);
        glm.unbindArrayBuffer();
    }

    _createXTicks() {
        let pixel_y = 2.0 / (glm.gl.canvas.height - this.margin * 2 - this.tickSize);

        this.xTicks = [];

        for (let i = 0; i < this.tickCount; i++) {

        }
    }

    _genXTicksBuffer() {
        this._createXTicks();
        this.xTicksBuffer = glm.createBuffer();
        glm.bindArrayBuffer(this.xTicksBuffer);
        glm.addArrayBufferData(this.xTicks, glm.gl.STREAM_DRAW);
        glm.unbindArrayBuffer();
    }

    use_X_Axis(shader) {
        glm.bindArrayBuffer(this.x_AxisBuffer);
        shader.enablePosition();
    }

    use_Y_Axis(shader) {
        glm.bindArrayBuffer(this.y_AxisBuffer);
        shader.enablePosition();
    }

    use_yTicks(shader) {
        glm.bindArrayBuffer(this.yTicksBuffer);
        shader.enablePosition();
    }

    use_xTicks(shader) {
        glm.bindArrayBuffer(this.xTicksBuffer);
        shader.enablePosition();
    }

    draw(shader) {
        glm.setViewport(
            this.margin + this.tickSize,
            this.margin + this.tickSize,
            glm.gl.canvas.width - this.margin * 2 - this.tickSize,
            glm.gl.canvas.height - this.margin * 2 - this.tickSize
        );
        this.use_X_Axis(shader);
        glm.drawLines(this.x_Axis.length / 2);
        this.use_Y_Axis(shader);
        glm.drawLines(this.y_Axis.length / 2);
        
        glm.viewport();
        this.use_yTicks(shader);
        glm.drawLines(this.yTicks.length / 2);
    }
}