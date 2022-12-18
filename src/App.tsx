import React, {MouseEventHandler, useEffect, useMemo, useRef, useState} from 'react';
import Box from "./Box";
import './App.css';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const throttle = require('lodash.throttle');

interface Vector {
    x: number,
    y: number
}

function App() {
    const boxRef = useRef();
    const [mousePosition, setMousePosition] = useState({x: 0,y: 0});
    const stateRef = useRef(mousePosition);
    stateRef.current = mousePosition;

    const [a1, seta1] = useState({x: 0, y: 0})
    const seta1ref = useRef(seta1)
    seta1ref.current = seta1

    const [m, setm] = useState({x:0, y:0})
    const mref = useRef(setm)
    mref.current = setm

    const [c1, setc1] = useState({x: 0, y: 0})
    const setc1ref = useRef(setc1)
    setc1ref.current = setc1

    const [c2, setc2] = useState({x: 0, y: 0})
    const setc2ref = useRef(setc2)
    setc2ref.current = setc2

    const [shadowMatrix, setShadowMatrix] = useState('')
    const setShadowMatrixref = useRef(setShadowMatrix)
    setShadowMatrixref.current = setShadowMatrix

    const [screen, setScreen] = useState({innerWidth: window.innerWidth, innerHeight: window.innerHeight})
    const screenRef = useRef({screen: screen, setScreen: setScreen})
    screenRef.current = {screen: screen, setScreen: setScreen}

    const dot = (u: Vector, v:Vector) => {
        return u.x * v.x + u.y * v.y
    }

    const unit = (u: Vector) => {
        const mag = Math.sqrt(u.x* u.x + u.y * u.y)
        return {x: u.x/mag, y: u.y/mag}
    }

    const sub = (u:Vector, v:Vector) => {
        return {x: u.x - v.x, y: u.y - v.y}
    }

    const add = (u: Vector, v:Vector) => {
        return {x: u.x + v.x, y: u.y + v.y}
    }

    const mouseMoveHandler = useMemo(() => throttle((e: React.MouseEvent) => {
        setMousePosition({x: e.clientX, y: e.clientY});
    }, 10), [])

    const checkAngle = (angle1:number, angle2: number) => {
        return (angle1 <= 3.14159 / 2 && angle2 > 3.14159/2) || (angle1 > 3.14159 / 2 && angle2 <= 3.14159/2)
    }

    const positionsHandler = ({a,b,c,d,e}: {a: Vector, b: Vector, c: Vector, d: Vector, e:Vector}) => {
        //c to a on a

        const corners = {a: {x:0, y:0}, b: {x:0,y:0}}
        let changeCorner = (a: Vector) => {
            setc1ref.current(a)
            corners.a = a
        }

        const changeCorner2 = (a: Vector) => {
            setc2ref.current(a)
            corners.b = a
        }

        const shadowEndPoints = {a: {x:0, y:0}, b: {x:0,y:0}}

        let setShadowEndPoints = (a: Vector) => {
            shadowEndPoints.a = a
        }

        const setShadowEndPoints2 = (a: Vector) => {
            shadowEndPoints.b = a
        }

        const m = stateRef.current
        const screen = screenRef.current.screen

        const ca = unit(sub(a,c)) //unit a-c
        const ma = unit(sub(a, stateRef.current)) // unit a - mousePosition
        const ba = unit(sub(a, b))

        const angletl = Math.acos(dot(ca, ma));
        const angletl2 = Math.acos(dot(ba, ma));

        if (checkAngle(angletl, angletl2)) {
            changeCorner(a);
            changeCorner = changeCorner2

            const [b1, b2] = [a.x, a.y]
            const [a1, a2] = [m.x, m.y]
            if (ma.y <= 0) { //vector heading towards top of screen
                const x =(b1-a1)/(b2-a2)*(-a2)+a1
                if (x< 0) {
                    setShadowEndPoints({x: 0,y: (b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: 0})
                }

                setShadowEndPoints = setShadowEndPoints2
            } else {
                const x = (b1-a1)/(b2-a2)*(screen.innerHeight) +(b1-a1)/(b2-a2)*(-a2)+a1
                if (x < 0) {
                    setShadowEndPoints({x: 0, y:(b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: screen.innerHeight})
                }
            }
            setShadowEndPoints = setShadowEndPoints2

        }


        const ab = unit(sub(b,a))
        const mb = unit(sub(b, stateRef.current))
        const db = unit(sub(b,d))

        const angletr = Math.acos(dot(ab,mb))
        const angletr2 = Math.acos(dot(db,mb))

        if (checkAngle(angletr, angletr2)) {
            changeCorner(b)
            changeCorner = changeCorner2

            const [b1, b2] = [b.x, b.y]
            const [a1, a2] = [m.x, m.y]
            if (mb.y <= 0) { //vector heading towards top of screen
                const x =(b1-a1)/(b2-a2)*(-a2)+a1
                if (x< 0) {
                    setShadowEndPoints({x: 0,y: (b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: 0})
                }

                setShadowEndPoints = setShadowEndPoints2
            } else {
                const x = (b1-a1)/(b2-a2)*(screen.innerHeight) +(b1-a1)/(b2-a2)*(-a2)+a1
                if (x < 0) {
                    setShadowEndPoints({x: 0,y: (b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: screen.innerHeight})
                }
            }
            setShadowEndPoints = setShadowEndPoints2

        }

        const ac = unit(sub(c,a))
        const mc = unit(sub(c, stateRef.current))
        const dc = unit(sub(c,d))

        const anglebl = Math.acos(dot(ac,mc))
        const anglebl2 = Math.acos(dot(dc,mc))

        if (checkAngle(anglebl, anglebl2)) {
            changeCorner(c)
            changeCorner = changeCorner2

            const [b1, b2] = [c.x, c.y]
            const [a1, a2] = [m.x, m.y]
            if (mc.y <= 0) { //vector heading towards top of screen
                const x =(b1-a1)/(b2-a2)*(-a2)+a1
                if (x< 0) {
                    setShadowEndPoints({x: 0,y: (b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: 0})
                }

                setShadowEndPoints = setShadowEndPoints2
            } else {
                const x = (b1-a1)/(b2-a2)*(screen.innerHeight) +(b1-a1)/(b2-a2)*(-a2)+a1
                if (x < 0) {
                    setShadowEndPoints({x: 0, y:(b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: screen.innerHeight})
                }

                setShadowEndPoints = setShadowEndPoints2
            }
        }

        const bd = unit(sub(d,b))
        const md = unit(sub(d, stateRef.current))
        const cd = unit(sub(d, c))

        const anglebr = Math.acos(dot(bd,md))
        const anglebr2 = Math.acos(dot(cd,md))

        if (checkAngle(anglebr, anglebr2)) {
            changeCorner(d)

            const [b1, b2] = [d.x, d.y]
            const [a1, a2] = [m.x, m.y]
            if (md.y <= 0) { //vector heading towards top of screen
                const x =(b1-a1)/(b2-a2)*(-a2)+a1
                if (x< 0) {
                    setShadowEndPoints({x: 0,y: (b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: 0})
                }

                setShadowEndPoints = setShadowEndPoints2
            } else {
                const x = (b1-a1)/(b2-a2)*(screen.innerHeight) +(b1-a1)/(b2-a2)*(-a2)+a1
                if (x < 0) {
                    setShadowEndPoints({x: 0, y:(b2-a2)/(b1-a1)*(-a1)+a2 })
                } else if (x > screen.innerWidth) {
                    setShadowEndPoints({x: screen.innerWidth, y:(b2-a2)/(b1-a1) * (screen.innerWidth-a1) + a2})
                } else {
                    setShadowEndPoints({x: x, y: screen.innerHeight})
                }

                setShadowEndPoints = setShadowEndPoints2
            }
        }
        console.log(corners.a.y)

        setShadowMatrixref.current(`${corners.a.x},${corners.a.y} ${corners.b.x},${corners.b.y} ${shadowEndPoints.b.x},${shadowEndPoints.b.y} ${shadowEndPoints.a.x},${shadowEndPoints.a.y}`)

        // const temp3 = unit(add(sub(a, b), a))  // unit a-b + a

        // seta1ref.current(add({x: ca.x * 50, y: ca.y * 50}, a))
        // mref.current(add({x: ma.x * 50, y: ma.y * 50}, a))
        // setc2ref.current(add({x: ba.x * 50, y: ba.y * 50}, a))
        // console.log(Math.acos(dot(ca, ma))*180/3.14159)

        // console.log(temp)
        // console.log(a,b,c,d)
        // console.log(stateRef.current)
    }

    useEffect(() => {
        function resize() {
            setScreen({innerWidth: window.innerWidth, innerHeight: window.innerHeight})
        }

        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    }, [])

  return (
    <div className="App" onMouseMove={mouseMoveHandler}>
        <svg viewBox={`0 0 ${screen.innerWidth} ${screen.innerHeight}`} style={{ //default 455 height
            position: "absolute",
        }}>
            <polygon points = {shadowMatrix}/>
        </svg>
        <div className="box-holder">
            <Box sendPos = {positionsHandler}/>
        </div>
        <div className="test" style={{
            top: a1.y,
            left: a1.x
        }}></div>

        <div className="test" style={{
            top: m.y,
            left: m.x
        }}>
        </div>

        <div className="corner" style={{
            top: c1.y,
            left: c1.x
        }}>
        </div>

        <div className="corner" style={{
            top: c2.y,
            left: c2.x
        }}>
        </div>


    </div>
  );
}

export default App;
