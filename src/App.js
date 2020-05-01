import React from 'react';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';

import './App.css';

class App extends React.Component{
    render() {
        return (
            <div>
                <Toolbar/>
                <Canvas/>
            </div>
        );
    }
}

export default App;
