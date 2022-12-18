import React, {useEffect, useRef, useState} from "react";
import './Box.css';

interface Vector {
    x: number,
    y: number
}
interface BoxProps {
    sendPos: (positions: {a: Vector, b: Vector, c: Vector, d: Vector, e:Vector}) => void;
}

function Box({sendPos}: BoxProps) {
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null)
    const [center, setCenter] = useState({x: 0, y:0});

    useEffect(() => {
        if (boxRef.current == null) {
            return
        }
        const bounding = boxRef.current.getBoundingClientRect()
        setCenter({x: (bounding.right - bounding.left)/2 + bounding.left, y: (bounding.bottom - bounding.top)/2 + bounding.top})
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (topLeftRef.current == null || topRightRef.current == null ||
                bottomLeftRef.current == null || bottomRightRef.current == null) {
                return;
            }

            const topLeftRefBounding = topLeftRef.current.getBoundingClientRect();
            const topRightRefBounding = topRightRef.current.getBoundingClientRect();
            const bottomLeftRefBounding = bottomLeftRef.current.getBoundingClientRect();
            const bottomRightRefBounding = bottomRightRef.current.getBoundingClientRect();

            const positionArray = {
                a: {x: topLeftRefBounding.x, y: topLeftRefBounding.y},
                b: {x: topRightRefBounding.x, y:topRightRefBounding.y},
                c: {x: bottomLeftRefBounding.x, y:bottomLeftRefBounding.y},
                d: {x: bottomRightRefBounding.x, y: bottomRightRefBounding.y},
                e: center
            }

            sendPos(positionArray)
        }, 10);

        return () => {
            clearTimeout(interval);
        }
    }, [])

    return (
        <div className="box" ref={boxRef}>
            <div className="top-left-corner" ref={topLeftRef}></div>
            <div className="top-right-corner" ref={topRightRef}></div>
            <div className="bottom-left-corner" ref={bottomLeftRef}></div>
            <div className="bottom-right-corner" ref={bottomRightRef}></div>
        </div>
    )
}

export default Box;
