import glm from './GLManager';
import MouseEvent from './event_handlers/mouse';

export default function GL_Init(canvas) {
    if(!canvas) {
        console.error('No canvas provided');
        return;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('Webgl not supported');
        return;
    }

    glm.init(gl);
    MouseEvent.init();
}