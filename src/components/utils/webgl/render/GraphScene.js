import Graph2DShader from '../shaders/graph2D/Graph2DShader';
import Camera from '../camera/Camera';
import Graph2DModel from '../models/Graph2DModel';
import AxisModel from '../models/AxisModel';
import Scene from './Scene';

export default class GraphScene {
    constructor(equation) {
        this.maxPoints = 2000;
        this.margin = 15;
        this.tickSize = 10;

        this.equation = equation;

        this.graphShader = new Graph2DShader();
        this.scene = new Scene(this.graphShader);
    
        this.camera = new Camera();
    
        this.updateDataPoints();

        this.graphModel = new Graph2DModel(this.dataPoints, this.margin, this.tickSize);
        this.graphModel.curDrawStyle = this.graphModel.DRAW_STYLES.LINE_STRIP;
        this.graphModel.scale(0.5);

        this.axisModel = new AxisModel(this.margin, this.tickSize);

        this.scene.registerModel('axis', this.axisModel);
        this.scene.registerModel('graph2d', this.graphModel);
    }

    updateEquation(eq) {
        this.equation = eq;
        this.updateDataPoints();
    }

    updateDataPoints() {
        this.dataPoints = [];
        for(let i = 0; i < 2000; i++) {
            const x = (i - 1000.0) / 100.0;
            const y = Math.sin(x * 10.0) / (1.0 + x * x);
            this.dataPoints.push(x);
            this.dataPoints.push(y);
        }
    }

    draw() {
        const render = () => {
            this.scene.render(this.camera);
            window.requestAnimationFrame(render);
        }
    
        window.requestAnimationFrame(render);
    }
}