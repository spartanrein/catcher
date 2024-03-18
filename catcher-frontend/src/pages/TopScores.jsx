import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetScoresQuery } from '../services/scores';
import { Box, Stack, Typography } from '@mui/material';

function createData(rank, playerName, score) {
  return { rank, playerName, score };
}

export default function TopScores() {
    const { data, error, isLoading } = useGetScoresQuery()
    const scores = data?.map((d, index) => {return createData(index+1, d.playerName, d.score)})

    return (
        <>
            <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Stack>
                <Typography variant="h5">All Time High Scores</Typography>
                <Typography align="center">Catcher</Typography>
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width:"100%", tableLayout:"fixed" }} aria-label="Catcher Top Scores">
                <TableHead>
                    <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores?.map((row) => (
                    <TableRow
                        key={row.rank}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.rank}
                        </TableCell>
                        <TableCell align="left" sx={{overflow:'hidden', textOverflow:"ellipsis"}}>{row.playerName}</TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}