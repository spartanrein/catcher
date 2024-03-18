import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import io from 'socket.io-client'

export const scoreApi = createApi({
    reducerPath: 'scoresApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/scores'}),
    tagTypes:['Scores'],
    endpoints: (builder) => ({
        getScores: builder.query({
            query: () => '/',
            providesTags:['Scores'],
        }),
        postAddScore: builder.mutation({
            query: ({playerName, score}) => ({
                url: '/',
                method: 'POST',
                body: {
                    playerName:playerName,
                    score: score
                }
            }),
            invalidatesTags: ['Scores']
        }),
    })
})

export const { useGetScoresQuery, usePostAddScoreMutation } = scoreApi