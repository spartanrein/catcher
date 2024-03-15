import { React, useRef, useEffect } from 'react'
import boat from '../assets/boat.png'
import {objectProps} from '../data/data'
import BaseObject from '../objects/BaseObject'
import { renderObject } from '../utils/utils'
import { useDispatch } from 'react-redux'
import { addScore } from '../features/playerSlice'
import FallingObject from '../objects/FallingObject'
import { useSelector } from 'react-redux';

export const CatcherGame = () => {
    let { boatProps, itemObject } = objectProps;
    const dispatch = useDispatch()
    const score = useSelector((state) => state.player.score)
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            let boatImg = new Image()
            boatImg.src = boat;
            let playerBoat = new BaseObject(ctx, canvas, boatImg, boatProps.x, boatProps.y, boatProps.width)
            canvas.width = window.innerWidth
            canvas.height = window.innerWidth/2
            boatProps.y = canvas.getBoundingClientRect().height - canvas.getBoundingClientRect().height/3
            boatProps.width = canvas.width/8
            renderObject(ctx, canvas, boatImg, playerBoat,  boatProps)
            spawnFallingItem(ctx, canvas, itemObject, boatImg)
            requestAnimationFrame(render)
            if (collision(boatProps, canvas.width/8, itemObject, canvas.width/12, 10)){
                console.log('Collision Detected')
                dispatch(addScore(10))
                resetPosition(itemObject)
            }
        }
        render()
    },[boatProps, itemObject, dispatch])

    return (
        <canvas
            ref={canvasRef} 
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
    let item = new FallingObject(ctx, canvas, image, itemObject.x, itemObject.y,  canvas.width/12, 10)
    item.render()
    if (itemObject.y < canvas.height){
        itemObject.y++
    } else {
        resetPosition(itemObject)
    }
}

function resetPosition(object){
    object.x = Math.floor(Math.random() * 700)
    object.y = 0 
}

function collision(boatProps, boatWidth, object, objectWidth ) {
    return (
        boatProps.x + boatWidth >= object.x &&
        boatProps.x <= object.x + objectWidth &&
        boatProps.y + boatWidth >= object.y &&
        boatProps.y <= object.y + objectWidth
    )
}

export default CatcherGame