import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { resetScore, setPlayerName, startGame, stopGame } from './features/gameSlice';
import { usePostAddScoreMutation } from './services/scores';
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerName = useSelector((state) => state.player.playerName)

  return (
    <Container sx={{height:'100vh'}}>
      <Box sx={{display:'flex', flexDirection:'column', height:'80%', alignContent:'center', justifyContent:'center'}}>
        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
          <Typography variant="h2">Pirate Game</Typography>
        </Box>
        <TextField
            value={playerName}
            label={"Enter Player Name to Start"}
            onChange={(e) => dispatch(setPlayerName(e.target.value))}
            />
        <Button 
          fullWidth 
          variant="contained" 
          disabled={!playerName}
          onClick={            
            () => {
              dispatch(resetScore())
              dispatch(startGame())
              navigate('/game')
            }
          }
        >Start Game
        </Button>
        <Button fullWidth onClick={() => navigate('/topscores')}>See top scores</Button>
      </Box>
    </Container>

  )
}

export default App;
