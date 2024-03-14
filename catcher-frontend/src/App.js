import React from 'react'
import TopScores from "./pages/TopScores";
import { Box, Container, Stack, Typography } from '@mui/material';

function App() {
  return (
    <Container sx={{paddingTop:'5%'}}>
      <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
        <Stack>
          <Typography variant="h5">All Time High Scores</Typography>
          <Typography align="center">Catcher</Typography>
        </Stack>
      </Box>
      <TopScores/>
    </Container>
  );
}

export default App;
