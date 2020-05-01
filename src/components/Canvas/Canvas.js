import React from 'react';
import styled from 'styled-components';

export default class Canvas extends React.Component {
    GlCanvas = styled.canvas`
    width: 100px;
    height: 100px;
    border: 1px solid black;
    `
    render() {
        return <this.GlCanvas/>;
    }
}
