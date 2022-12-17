import React, {MouseEventHandler, useEffect, useMemo, useRef, useState} from 'react';
import Box from "./Box";
import './App.css';

const throttle = require('lodash.throttle');

function App() {
    const boxRef = useRef();
    const [mousePosition, setMousePosition] = useState([0,0]); // using array for micro optimization

    const mouseMoveHandler = useMemo(() => throttle((e: React.MouseEvent) => {
        setMousePosition([e.clientX, e.clientY]);
    }, 100), [])

    const positionsHandler = (positions: {x:number, y:number}[]) => {

    }

  return (
    <div className="App" onMouseMove={mouseMoveHandler}>
        <div className="box-holder">
            <Box sendPos = {positionsHandler}/>
        </div>
    </div>
  );
}

export default App;
