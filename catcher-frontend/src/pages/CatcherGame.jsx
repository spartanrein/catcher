import { React, useRef, useEffect, useState } from 'react'
import boat from '../assets/boat.png'
import e1 from '../assets/e1.png'
import e2 from '../assets/e2.png'
import p1 from '../assets/p1.png'
import p2 from '../assets/p3.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'
import background from '../assets/bg1.png'
import { objectProps } from '../data/data'
import BaseObject from '../objects/BaseObject'
import { renderObject } from '../utils/utils'
import { useDispatch } from 'react-redux'
import FallingObject from '../objects/FallingObject'
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material'
import { resetScore, setPlayerName, startGame, stopGame, addScore } from '../features/gameSlice';
import { usePostAddScoreMutation } from '../services/scores';
import { useNavigate } from 'react-router-dom'

export const CatcherGame = () => {
    let { boatProps, itemObject } = objectProps;
    const canvasRef = useRef(null)
    const [counter, setCounter] = useState(60)
    const [hasScore, setHasScore] = useState(false)
    const [addTotalScore, result] = usePostAddScoreMutation()
    const score = useSelector((state) => state.player.score)
    const playerName = useSelector((state) => state.player.playerName)
    const isStartGame = useSelector((state) => state.player.isStartGame)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('!!!', isStartGame)

    useEffect(() => {
        const timer = isStartGame && counter > 0 && setTimeout(() => setCounter(counter -1), 1000);
        if (counter === 50){
          dispatch(stopGame())
          setHasScore(true)
        }
        return () => clearInterval(timer)
    },[counter, isStartGame, dispatch])
    
    //   useEffect(() => {
    //     if (hasScore && score > 0){
    //       addTotalScore({score:score})
    //     }
    //   },[hasScore, addScore, playerName, score])

    useEffect(() => {
        if (!isStartGame){
            alert('Game Over!')
            navigate('/')
        }
    },[isStartGame])

    useEffect(() => {
        let canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let {backgroundImg, boatImg} = loadImages(ctx, canvas)
        const render = () => {
            let playerBoat = new BaseObject(ctx, canvas, boatImg, boatProps.x, boatProps.y, boatProps.width)
            canvas.width = window.innerWidth
            canvas.height = window.innerWidth/2
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(backgroundImg,0,0, canvas.width, canvas.height)
            boatProps.y = canvas.getBoundingClientRect().height - canvas.getBoundingClientRect().height/4
            boatProps.width = canvas.width/12
            renderObject(ctx, canvas, boatImg, playerBoat,  boatProps)
            spawnFallingItem(ctx, canvas, itemObject, boatImg)
            if (collision(boatProps, canvas.width/12, itemObject, canvas.width/14, 10)){
                console.log('Collision Detected')
                dispatch(addScore(10))
                resetPosition(itemObject, canvas)
            }      
            requestAnimationFrame(render)
        }
        render()
    },[isStartGame])

    function loadImages(ctx, canvas){
        let backgroundImg = new Image()
        backgroundImg.src = background
        backgroundImg.onload = () => {
            ctx.drawImage(backgroundImg,0,0, canvas.width, canvas.height)
        }
        let boatImg = new Image()
        boatImg.src = boat;
        return {backgroundImg, boatImg}
    }

    return (
        <>
            <canvas
                ref={canvasRef} 
                id="canvas"
                onMouseMove={ (evt) => boatProps.x = getMousePos(canvasRef.current, evt).x -50 }
            />
            <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center', paddingTop:'12px'}}>
                <Box>
                    <Typography variant={'h5'}>{`Score: ${score}`}</Typography>
                </Box>
                <Button 
                    onClick={async () => {
                    setHasScore(false)
                    dispatch(resetScore())
                    setCounter(60)
                    dispatch(startGame())
                    }}
                    disabled={isStartGame}
                    variant={"contained"}>
                    Start!
                </Button> 
                <Box>
                    <Typography variant={'h5'}>{`Timer: ${counter}`}</Typography>
                </Box>
            </Box>  
        </>
    )
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

function spawnFallingItem(ctx, canvas, itemObject, image) {
    let item = new FallingObject(ctx, canvas, image, itemObject.x, itemObject.y,  canvas.width/14, 10)
    item.render()
    if (itemObject.y < canvas.height){
        itemObject.y+= itemObject.speed
    } else {
        resetPosition(itemObject, canvas)
    }
}

function resetPosition(object, canvas){
    object.x = Math.floor(Math.random() * canvas.width)
    object.y = Math.floor(Math.random() * -1000) 
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