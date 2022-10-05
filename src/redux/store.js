import {configureStore} from '@reduxjs/toolkit'
import pokemonReduce from "./pokemonSlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonReduce,
    },
})