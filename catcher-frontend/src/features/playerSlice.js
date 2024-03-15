import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playerName: '',
    score: 100
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addScore(state, action){
            state.score += action.payload
        },
        setPlayerName(state, action){
            state.playerName = action.payload
        }
    }
})

export const { addScore, setPlayerName } = playerSlice.actions
export default playerSlice.reducer