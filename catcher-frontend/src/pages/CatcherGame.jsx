import { React, useRef, useEffect } from 'react'
import boat from '../assets/boat.png'
import {objectProps} from '../data/data'
import BaseObject from '../objects/BaseObject'
import { renderObject } from '../utils/utils'

export const CatcherGame = () => {
    let { boatProps, itemObject } = objectProps;

    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        
        const render = () => {
            let boatImg = new Image()
            boatImg.src = boat;
            let playerBoat = new BaseObject(ctx, canvas, boatImg, boatProps.x, boatProps.y, boatProps.width)
            canvas.width = window.innerWidth
            canvas.height = 3*window.innerWidth/4
            boatProps.y = canvas.getBoundingClientRect().height-canvas.width/8
            boatProps.width = canvas.width/8
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            renderObject(ctx, canvas, boatImg, playerBoat,  boatProps)
            spawnFallingItem(ctx, canvas, itemObject, boatImg)
            // renderBoat(ctx, canvas, boatProps, boatImg)
            requestAnimationFrame(render)
            if (collision(boatProps, itemObject)){
                console.log('Collision Detected')
                resetPosition(itemObject)
            }
        }
        render()
    },[boatProps, itemObject])

    return (
        <canvas 
            ref={canvasRef} 
            className="canvas" 
            id="canvas" 
            onMouseMove={(evt) => boatProps.x = getMousePos(canvasRef.current, evt).x -50}
        />
    )
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
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
        resetPosition(itemObject)
    }
}

function resetPosition(object){
    object.x = Math.floor(Math.random() * 700)
    object.y = 0 
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
    return (
        boatProps.x + 100 >= fallingItem.x &&
        boatProps.x <= fallingItem.x + 100 &&
        boatProps.y + 100 >= fallingItem.y &&
        boatProps.y <= fallingItem.y + 100
    )
}

export default CatcherGame