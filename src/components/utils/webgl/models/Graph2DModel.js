import glm from '../GLManager';
import Transform from './Transform';
import MouseEvent from '../event_handlers/mouse';

export default class Graph2DModel extends Transform {
    DRAW_STYLES = {
        POINTS      : 0,
        LINES       : 1,
        LINE_STRIP  : 2
    };

    constructor(dataPoints, margin, tickSize) {
        super();
        this.margin = margin;
        this.tickSize = tickSize;
        this.points = dataPoints;
        this.curDrawStyle = this.DRAW_STYLES.POINTS;
        this._genPointBuffer();
        MouseEvent.subscribeToDrag(this);
        MouseEvent.subscribeToWheel(this);
    }

    onDrag = (dx, dy) => {
        this.translate(-dx * 0.01, dy*0.01, 0);
    }

    onWheel = (e) => {
        //this.z += e.deltaY * 0.01;
    }

    _genPointBuffer() {
        this.pointBuffer = glm.createBuffer();
        glm.bindArrayBuffer(this.pointBuffer);
        glm.addArrayBufferData(this.points, glm.gl.STATIC_DRAW);
        glm.unbindArrayBuffer();
    }

    use(shader) {
        glm.bindArrayBuffer(this.pointBuffer);
        shader.enablePosition();
    }

    updatePoints(dataPoints) {
        glm.bindArrayBuffer(this.pointBuffer);
        glm.addArrayBufferSubdata(dataPoints);
        glm.unbindArrayBuffer();
    }

    prerender() {
        glm.setViewport(
            this.margin + this.tickSize,
            this.margin + this.tickSize,
            glm.gl.canvas.width - this.margin * 2 - this.tickSize,
            glm.gl.canvas.height - this.margin * 2 - this.tickSize
        );
        glm.scissorTest(true);
        glm.scissor(
            this.margin + this.tickSize,
            this.margin + this.tickSize,
            glm.gl.canvas.width - this.margin * 2 - this.tickSize,
            glm.gl.canvas.height - this.margin * 2 - this.tickSize
        );
        // glm.scissorTest(false);
    }

    draw(shader) {
        this.prerender();
        this.use(shader);
        switch (this.curDrawStyle) {
            case this.DRAW_STYLES.POINTS:
                glm.drawPoints(this.points.length / 2);
                break;
            case this.DRAW_STYLES.LINES:
                glm.drawLines(this.points.length / 2);
                break;
            case this.DRAW_STYLES.LINE_STRIP:
                glm.drawLineStrip(this.points.length / 2);
                break;
            default:
                glm.drawPoints(this.points.length / 2);
        }
        glm.scissorTest(false);
    }
}