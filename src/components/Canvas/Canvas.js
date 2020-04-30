import React from 'react';
import './Canvas.css';

class Canvas extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <canvas width={100} height={100}/>;
    }
  }

export default Canvas;