import React from 'react';
import styled from 'styled-components';

import Graph2D from './components/Graph2D/Graph2D';

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: lightblue;
`

class App extends React.Component{
    render() {
        return (
            <Main>
                <Graph2D/>
            </Main>
        );
    }
}

export default App;
