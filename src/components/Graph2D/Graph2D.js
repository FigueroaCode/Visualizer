import React from 'react';
import styled from 'styled-components';
import GL_Init from '../utils/webgl/GL_Init';
import MathInputHandler from '../utils/MathInputHandler';
import GraphScene from '../utils/webgl/render/GraphScene';
import { addStyles, EditableMathField } from 'react-mathquill';

addStyles();

export default class Graph2D extends React.Component{
    GraphCanvas = styled.canvas`
        border: 1px solid black;
        margin-bottom: 1em;
    `
    Container = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0.5em;
    `
    Controls = styled.div`
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `
    MathFieldLabel = styled.label`
        text-align: center;
    `
    CustomMathField = styled(EditableMathField)`
        width: 90%;
        align-self: center;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom-width: 2px;

        &:hover {
            border-bottom-color: darkblue;
        }
    `

    constructor(props) {
        super(props);
        this.canvasId = 'graphCanvas';
        this.onResizeListener = this.onResizeListener.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.inputHandler = new MathInputHandler();
    }

    componentDidMount() {
        this.canvas = document.querySelector('#'+this.canvasId);
        this.onResizeListener();
        window.addEventListener('resize', this.onResizeListener);
        GL_Init(this.canvas);
        this.graphScene = new GraphScene('');
        this.graphScene.draw();
    }

    onResizeListener() {
        this.canvas.width = window.innerWidth / 2.0;
        this.canvas.height = window.innerHeight / 2.0;
    }

    onKeyDown(e) {
        // console.log(e.key);
        // console.log(e.keyCode);
        this.inputHandler.addInput(e.key, e.keyCode);
    }

    render() {
        return (
            <this.Container>
                <this.GraphCanvas id={this.canvasId}/>
                <this.Controls>
                    <this.MathFieldLabel>Equation</this.MathFieldLabel>
                    <this.CustomMathField onKeyDown={this.onKeyDown}/>
                </this.Controls>
            </this.Container>
        );
    }
}