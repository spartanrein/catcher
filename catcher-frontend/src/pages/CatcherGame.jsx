import { React, useRef, useEffect } from 'react'
import boat from '../assets/boat.png'
import data from '../data/data'
import { ItemMovement } from '../data/ItemMovement'
import Boat, { moveBoat } from '../data/Boat'
import { Box } from '@mui/material'

export const CatcherGame = () => {
    let { boatObj, boatProps } = data;

    const canvasRef = useRef(null)
    let x = 0
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            var boatImg = new Image()
            boatImg.src = boat;
            // ItemMovement(ctx, boatObj, imgTag)
            Boat(ctx, canvas, boatProps, boatImg)
            requestAnimationFrame(render)
        }
        render()
    
    },[boatProps])

    return (
        <canvas 
            ref={canvasRef} 
            className="canvas" 
            id="canvas" 
            width={window.innerWidth}
            height={"500"}
            onMouseMove={(event) => boatProps.x = event.clientX}
        />
    )
}

export default CatcherGame