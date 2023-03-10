import React, {useState} from "react";
import './App.css'
import Shadow from "./Shadow";

export default function App() {
    const [mouse, setMouse] = useState({x: 0, y:0})

    function onMouse(e: React.MouseEvent) {
        setMouse({x: e.clientX, y: e.clientY})
    }

    return (
        <div className={'App'} onMouseMove={onMouse}>
            <Shadow style={{}} mouse={mouse}/>
            <Shadow style={{flexDirection: 'column-reverse'}} mouse={mouse}/>
            <Shadow style={{flexDirection: 'row-reverse'}} mouse={mouse}/>
            <Shadow style={{alignItems: 'flex-end', justifyContent: 'flex-end'}} mouse={mouse}/>
        </div>
    )
}