import React, { useState, useEffect } from 'react'
import TopScores from "./pages/TopScores";
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import CatcherGame from './pages/CatcherGame';
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

  useEffect(() => {
    const timer = isStartGame && counter > 0 && setTimeout(() => setCounter(counter -1), 1000);
    if (counter === 0){
      dispatch(stopGame())
      setHasScore(true)
    }
    return () => clearInterval(timer)
  },[counter, isStartGame, dispatch])

  useEffect(() => {
    if (hasScore && score > 0){
      addScore({playerName:playerName, score:score})
    }
  },[hasScore, addScore, playerName, score])

  return (
    <>
        <Box>
          <CatcherGame/>
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
        </Box>
        <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
          <Stack>
            <Typography variant="h5">All Time High Scores</Typography>
            <Typography align="center">Catcher</Typography>
          </Stack>
        </Box>
        <TopScores/>
    </>
    
  );
}

export default App;
