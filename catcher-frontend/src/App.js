import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { resetScore, setPlayerName, startGame, stopGame } from './features/gameSlice';
import { usePostAddScoreMutation } from './services/scores';

function App() {
  const [counter, setCounter] = useState(60)
  const [hasScore, setHasScore] = useState(false)
  const [addScore, result] = usePostAddScoreMutation()
  const score = useSelector((state) => state.player.score)
  const playerName = useSelector((state) => state.player.playerName)
  const isStartGame = useSelector((state) => state.player.isStartGame)
  const dispatch = useDispatch()

  

    return (
      <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center', paddingTop:'12px'}}>
        <Box>
          <Typography variant={'h5'}>{`Score: ${score}`}</Typography>
        </Box>
        <Box sx={{display:'flex'}}>
          <TextField
            label={"Enter Player Name"}
            onChange={(e) => dispatch(setPlayerName(e.target.value))}
            disabled={isStartGame}
          />
          <Button 
            onClick={async () => {
              setHasScore(false)
              dispatch(resetScore())
              setCounter(60)
              dispatch(startGame())
            }}
            disabled={playerName === "" || isStartGame}
            variant={"contained"}>
              Start!
          </Button>
        </Box>
        <Box>
          <Typography variant={'h5'}>{`Timer: ${counter}`}</Typography>
        </Box>
      </Box>
  )
}

export default App;
