import glm from '../GLManager';

export default class Scene {
    constructor(shader) {
        this.shader = shader;
        this.models = {};
        this.clearColor = [0.1, 0.2, 0.3, 1.0];
    }

    registerModel(id, model) {
        if (!this.models[id]) {
            this.models[id] = {
                model: model
            };
        }
    }

    setClearColor(r, g, b, a) {
        this.clearColor[0] = r;
        this.clearColor[1] = g;
        this.clearColor[2] = b;
        this.clearColor[3] = a;
    }

    render(camera) {
        glm.clear(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
        this.shader.use();
        camera.enable(this.shader);
        Object.keys(this.models).forEach(key => {
            const model = this.models[key].model;
            this.shader.enableModel(model.getTransform());
            model.draw(this.shader);
        })
    }
}