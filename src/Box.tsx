import React, {useEffect, useRef} from "react";
import './Box.css';

interface BoxProps {
    sendPos: (positions: {x: number, y:number}[]) => void;
}

function Box({sendPos}: BoxProps) {
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInterval(() => {
            if (topLeftRef.current == null || topRightRef.current == null ||
                bottomLeftRef.current == null || bottomRightRef.current == null) {
                return;
            }

            const topLeftRefBounding = topLeftRef.current.getBoundingClientRect();
            const topRightRefBounding = topRightRef.current.getBoundingClientRect();
            const bottomLeftRefBounding = bottomLeftRef.current.getBoundingClientRect();
            const bottomRightRefBounding = bottomRightRef.current.getBoundingClientRect();

            const positionArray = [
                {x: topLeftRefBounding.x, y: topLeftRefBounding.y},
                {x: topRightRefBounding.x, y:topRightRefBounding.y},
                {x: bottomLeftRefBounding.x, y:bottomLeftRefBounding.y},
                {x: bottomRightRefBounding.x, y: bottomRightRefBounding.y}
            ]

            sendPos(positionArray)
        }, 100)
    })

    return (
        <div className="box">
            <div className="top-left-corner" ref={topLeftRef}></div>
            <div className="top-right-corner" ref={topRightRef}></div>
            <div className="bottom-left-corner" ref={bottomLeftRef}></div>
            <div className="bottom-right-corner" ref={bottomRightRef}></div>
        </div>
    )
}

export default Box;
