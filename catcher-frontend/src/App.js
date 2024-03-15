import React from 'react'
import TopScores from "./pages/TopScores";
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import CatcherGame from './pages/CatcherGame';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { resetScore, setPlayerName, startGame, stopGame } from './features/gameSlice';
import { sleep } from './utils/utils';

function App() {
  const score = useSelector((state) => state.player.score)
  const playerName = useSelector((state) => state.player.playerName)
  const isStartGame = useSelector((state) => state.player.isStartGame)
  const dispatch = useDispatch()

  return (
    <>
        <Box>
          <CatcherGame/>
            <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center', paddingTop:'12px'}}>
              <Typography variant={'h4'}>{`Score: ${score}`}</Typography>
              <Box sx={{display:'flex'}}>
                <TextField
                  label={"Enter Player Name"}
                  onChange={(e) => dispatch(setPlayerName(e.target.value))}
                />
                <Button 
                  onClick={async () => {
                    dispatch(resetScore())
                    dispatch(startGame())
                    await sleep(5000)
                    dispatch(stopGame())
                  }}
                  disabled={playerName === ""}
                  variant={"contained"}>
                    Start Game
                </Button>
              </Box>
              <div/>
            </Box>
        </Box>
          
        {/* <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
          <Stack>
            <Typography variant="h5">All Time High Scores</Typography>
            <Typography align="center">Catcher</Typography>
          </Stack>
        </Box>
        <TopScores/> */}
    </>
    
  );
}

export default App;
