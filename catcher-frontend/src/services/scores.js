import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scoreApi = createApi({
    reducerPath: 'scoresApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/scores'}),
    tagTypes:['Scores'],
    endpoints: (builder) => ({
        getScores: builder.query({
            query: () => '/',
            providesTags:['Scores']
        }),
        postAddScore: builder.mutation({
            query: ({name, score}) => ({
                url: '/',
                method: 'POST',
                body: {
                    name:name,
                    score: score
                }
            }),
            invalidatesTags: ['Scores']
        }),
    })
})

export const { useGetScoresQuery, usePostAddAddScoreMutation } = scoreApi