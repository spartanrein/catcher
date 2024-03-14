import { React, useRef, useEffect } from 'react'
import boat from '../assets/boat.png'
import data from '../data/data'
import { ItemMovement } from '../data/ItemMovement'
import renderBoat from '../data/Boat'
import { Box } from '@mui/material'

export const CatcherGame = () => {
    let { boatObj, boatProps, itemObject } = data;

    const canvasRef = useRef(null)
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            var boatImg = new Image()
            boatImg.src = boat;
            spawnFallingItem(ctx, canvas, itemObject, boatImg)
            renderBoat(ctx, canvas, boatProps, boatImg)
            requestAnimationFrame(render)
            if (collision(boatProps, itemObject)){
                console.log('!!!boom!')
            }
        }
        render()
    },[boatProps])

    return (
        <canvas 
            ref={canvasRef} 
            className="canvas" 
            id="canvas" 
            width={800}
            height={500}
            onMouseMove={(event) => boatProps.x = event.clientX - 50}
        />
    )
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function spawnFallingItem(ctx, canvas, itemObject, image) {
    let item = new FallingItem(ctx, canvas, itemObject.x, itemObject.y, 10, image)
    item.move()
    if (itemObject.y < 500){
        itemObject.y++
    } else {
        itemObject.x = Math.floor(Math.random() * 700)
        itemObject.y = 0
    }
}

class FallingItem {
    constructor(ctx, canvas, x, y, score, image) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.image = image;
        this.score = score
    }
    move() {
        this.ctx.drawImage(this.image, this.x, this.y, 100, 100)
    }
}

function collision(boatProps, fallingItem) {
    console.log('!!!', boatProps)
    return (
        boatProps.x >= fallingItem.x &&
        fallingItem.x >= boatProps.x &&
        boatProps.y >= fallingItem.y &&
        fallingItem.y >= boatProps.y
    )
}

export default CatcherGame