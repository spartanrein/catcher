import React from 'react'
import TopScores from "./pages/TopScores";
import { Box, Container, Stack, Typography } from '@mui/material';
import CatcherGame from './pages/CatcherGame';
import './App.css'
import { useSelector } from 'react-redux';

function App() {
  const score = useSelector((state) => state.player.score)
  return (
    <Container>
        <Stack>
          <CatcherGame/>
          {/* <Typography variant={'h2'}>{`Score: ${score}`}</Typography> */}
        </Stack>
          
        {/* <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
          <Stack>
            <Typography variant="h5">All Time High Scores</Typography>
            <Typography align="center">Catcher</Typography>
          </Stack>
        </Box>
        <TopScores/> */}
    </Container>
    
  );
}

export default App;
